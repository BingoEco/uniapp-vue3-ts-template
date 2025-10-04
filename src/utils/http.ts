// src/utils/http.ts
// 统一HTTP请求工具，基于uni.request封装，支持拦截器、错误处理等功能

/**
 * HTTP请求方法类型
 */
type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
  | 'TRACE'
  | 'CONNECT';

/**
 * HTTP请求配置选项
 */
interface RequestOptions {
  /** 请求地址 */
  url: string;
  /** 请求方法，默认为GET */
  method?: HttpMethod;
  /** 请求数据 */
  data?: any;
  /** 请求头 */
  header?: Record<string, string>;
  /** 是否显示loading，默认为true */
  showLoading?: boolean;
  /** loading文本 */
  loadingText?: string;
  /** 是否静默模式（不显示错误提示），默认为false */
  silent?: boolean;
  /** 是否需要认证，默认为true */
  requireAuth?: boolean;
}

/**
 * 文件下载选项
 */
interface DownloadOptions {
  /** 下载地址 */
  url: string;
  /** 请求头 */
  header?: Record<string, string>;
  /** 是否显示loading，默认为true */
  showLoading?: boolean;
  /** loading文本 */
  loadingText?: string;
  /** 是否静默模式（不显示错误提示），默认为false */
  silent?: boolean;
  /** 是否需要认证，默认为true */
  requireAuth?: boolean;
}

/**
 * HTTP响应结构
 */
interface HttpResponse<T = any> {
  /** 响应数据 */
  data: T;
  /** 状态码 */
  statusCode: number;
  /** 响应头 */
  header: Record<string, string>;
}

/**
 * 文件下载响应结构
 */
interface DownloadResponse {
  /** 临时文件路径 */
  tempFilePath: string;
  /** 状态码 */
  statusCode: number;
}

/**
 * 自定义HTTP错误类型
 */
class HttpError extends Error {
  constructor(
    /** 错误信息 */
    public message: string,
    /** 状态码 */
    public statusCode?: number,
    /** 响应数据 */
    public response?: any
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

/**
 * 默认请求配置
 */
const DEFAULT_OPTIONS: Partial<RequestOptions> = {
  method: 'GET',
  header: {
    'Content-Type': 'application/json',
  },
  // 显示加载中, 默认关闭
  showLoading: false,
  // 加载提示文案
  loadingText: '请求中...',
  // 是否显示加载提示, 默认开启
  silent: false,
  // 是否需要授权
  requireAuth: true,
};

/**
 * 默认下载配置
 */
const DEFAULT_DOWNLOAD_OPTIONS: Partial<DownloadOptions> = {
  header: {
    'Content-Type': 'application/json',
  },
  showLoading: true,
  loadingText: '下载中...',
  silent: false,
  requireAuth: true,
};

/**
 * 拦截器接口
 */
interface Interceptor<T> {
  /**
   * 添加拦截器处理函数
   * @param fn 拦截器处理函数
   */
  use(fn: (config: T) => T | Promise<T>): void;
}

/**
 * 拦截器管理器
 */
class InterceptorManager<T> {
  /** 拦截器处理函数数组 */
  private handlers: Array<(config: T) => T | Promise<T>> = [];

  /**
   * 添加拦截器处理函数
   * @param fn 拦截器处理函数
   */
  use(fn: (config: T) => T | Promise<T>): void {
    this.handlers.push(fn);
  }

  /**
   * 执行所有拦截器处理函数
   * @param config 配置信息
   * @returns 处理后的配置信息
   */
  async execute(config: T): Promise<T> {
    for (const handler of this.handlers) {
      config = await handler(config);
    }
    return config;
  }
}

/**
 * HTTP请求类
 */
export class Http {
  /** 拦截器 */
  public interceptors = {
    /** 请求拦截器 */
    request: new InterceptorManager<RequestOptions>(),
    /** 响应拦截器 */
    response: new InterceptorManager<HttpResponse>(),
  };

  /**
   * 构造函数
   * @param baseUrl 基础URL
   */
  constructor(private baseUrl: string = '') {
    // 默认请求拦截器：显示loading
    this.interceptors.request.use(config => {
      if (config.showLoading) {
        uni.showLoading({
          title: config.loadingText || '请求中...',
          mask: true,
        });
      }
      return config;
    });

    // 默认请求拦截器：添加baseUrl和认证token
    this.interceptors.request.use(config => {
      // 拼接完整URL
      if (!config.url.startsWith('http')) {
        config.url = this.baseUrl + config.url;
      }

      return config;
    });

    // 默认响应拦截器：隐藏loading
    this.interceptors.response.use(response => {
      uni.hideLoading();
      return response;
    });
  }

  /**
   * 发起HTTP请求
   * @param options 请求配置
   * @returns Promise
   */
  async request<T = any>(options: RequestOptions): Promise<T> {
    // 合并默认配置
    const config = {
      ...DEFAULT_OPTIONS,
      ...options,
    } as Required<RequestOptions>;

    // 执行请求拦截器
    const finalConfig = await this.interceptors.request.execute(config);

    return new Promise<T>((resolve, reject) => {
      uni.request({
        url: finalConfig.url,
        method: finalConfig.method,
        data: finalConfig.data,
        header: finalConfig.header,
        success: async (res: UniApp.RequestSuccessCallbackResult) => {
          // 构造响应对象
          const response: HttpResponse = {
            data: res.data,
            statusCode: res.statusCode,
            header: res.header || {},
          };

          // 执行响应拦截器
          const processedResponse =
            await this.interceptors.response.execute(response);

          // 根据状态码判断请求是否成功
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(processedResponse.data as T);
          } else {
            // 构造错误对象
            const error = new HttpError(
              `HTTP Error: ${res.statusCode}`,
              res.statusCode,
              res.data
            );
            // 显示错误提示
            if (!finalConfig.silent) {
              uni.showToast({
                title: `请求失败: ${res.statusCode}`,
                icon: 'none',
                duration: 2000,
              });
            }
            reject(error);
          }
        },
        fail: (err: UniApp.GeneralCallbackResult) => {
          // 隐藏loading
          uni.hideLoading();
          // 构造错误对象
          const error = new HttpError(err.errMsg || '网络请求失败', 0);
          // 显示错误提示
          if (!finalConfig.silent) {
            uni.showToast({
              title: '网络错误',
              icon: 'none',
              duration: 2000,
            });
          }
          reject(error);
        },
      });
    });
  }

  /**
   * 发起GET请求
   * @param url 请求地址
   * @param options 请求配置
   * @returns Promise
   */
  get<T = any>(
    url: string,
    options: Omit<RequestOptions, 'url' | 'method'> = {}
  ): Promise<T> {
    return this.request<T>({ ...options, url, method: 'GET' });
  }

  /**
   * 发起POST请求
   * @param url 请求地址
   * @param data 请求数据
   * @param options 请求配置
   * @returns Promise
   */
  post<T = any>(
    url: string,
    data?: any,
    options: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}
  ): Promise<T> {
    return this.request<T>({ ...options, url, method: 'POST', data });
  }

  /**
   * 发起PUT请求
   * @param url 请求地址
   * @param data 请求数据
   * @param options 请求配置
   * @returns Promise
   */
  put<T = any>(
    url: string,
    data?: any,
    options: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}
  ): Promise<T> {
    return this.request<T>({ ...options, url, method: 'PUT', data });
  }

  /**
   * 发起DELETE请求
   * @param url 请求地址
   * @param options 请求配置
   * @returns Promise
   */
  delete<T = any>(
    url: string,
    options: Omit<RequestOptions, 'url' | 'method'> = {}
  ): Promise<T> {
    return this.request<T>({ ...options, url, method: 'DELETE' });
  }

  /**
   * 发起HTTP下载请求
   * @param options 下载配置
   * @returns Promise
   */
  async download(options: DownloadOptions): Promise<DownloadResponse> {
    // 合并默认配置
    const config = {
      ...DEFAULT_DOWNLOAD_OPTIONS,
      ...options,
    } as Required<DownloadOptions>;

    // 执行请求拦截器
    const finalConfig = await this.interceptors.request.execute(config);

    return new Promise<DownloadResponse>((resolve, reject) => {
      // 显示loading
      if (finalConfig.showLoading) {
        uni.showLoading({
          title: finalConfig.loadingText || '下载中...',
          mask: true,
        });
      }

      uni.downloadFile({
        url: finalConfig.url,
        header: finalConfig.header,
        success: (res: UniApp.DownloadSuccessData) => {
          // 隐藏loading
          uni.hideLoading();

          // 构造响应对象
          const response: DownloadResponse = {
            tempFilePath: res.tempFilePath,
            statusCode: res.statusCode,
          };

          // 根据状态码判断下载是否成功
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response);
          } else {
            // 构造错误对象
            const error = new HttpError(
              `Download Error: ${res.statusCode}`,
              res.statusCode
            );
            // 显示错误提示
            if (!finalConfig.silent) {
              uni.showToast({
                title: `下载失败: ${res.statusCode}`,
                icon: 'none',
                duration: 2000,
              });
            }
            reject(error);
          }
        },
        fail: (err: UniApp.GeneralCallbackResult) => {
          // 隐藏loading
          uni.hideLoading();
          // 构造错误对象
          const error = new HttpError(err.errMsg || '下载失败', 0);
          // 显示错误提示
          if (!finalConfig.silent) {
            uni.showToast({
              title: '网络错误',
              icon: 'none',
              duration: 2000,
            });
          }
          reject(error);
        },
      });
    });
  }
}

// 创建默认实例
const BaseURL = 'https://jsonplaceholder.typicode.com';

const http = new Http(BaseURL);

// 示例：从 Pinia store 添加 token 拦截器
// 如果需要登录请求，请将 token 添加到请求头中

// import { useMemberStore } from '@/stores';
// http.interceptors.request.use(config => {
//   const memberStore = useMemberStore();
//   const token = memberStore.profile?.token;
//   // 只有在需要认证且存在 token 的情况下才添加 Authorization 头
//   if (config.requireAuth !== false && token) {
//     config.header = config.header || {};
//     config.header['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });

export default http;
