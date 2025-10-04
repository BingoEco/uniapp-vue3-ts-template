<template>
  <view class="request">
    <view class="container">
      <view
        >提示：有些测试没有效果，因为后端接口没有该功能，如分页，无需认证功能等，具体使用看源码</view
      >
      <button @click="testGet">测试 GET 请求</button>
      <button @click="testPost">测试 POST 请求</button>
      <button @click="testPut">测试 PUT 请求</button>
      <button @click="testDelete">测试 DELETE 请求</button>
      <button @click="testPagination">测试分页查询</button>
      <button @click="testDownload" :loading="downloading">
        测试下载（仅小程序、APP）
      </button>
      <button @click="testNoAuth">测试无需认证功能</button>
      <button @click="testCustomHeader">测试自定义请求头功能</button>
      <view class="result">
        <text>请求结果:</text>
        <text>{{ result }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import http from '@/utils/http';

// 请求结果
const result = ref('');
const downloading = ref(false);

// 测试 GET 请求
const testGet = async () => {
  try {
    const res = await http.get('/posts/1');
    result.value = res;
    console.log('GET 请求结果:', res);
  } catch (error: any) {
    result.value = 'GET 请求失败: ' + error.message;
    console.error('GET 请求失败:', error);
  }
};

// 测试 POST 请求
const testPost = async () => {
  try {
    const data = {
      title: '测试标题',
      body: '测试内容',
      userId: 1,
    };
    const res = await http.post('/posts', data);
    result.value = res;
    console.log('POST 请求结果:', res);
  } catch (error: any) {
    result.value = 'POST 请求失败: ' + error.message;
    console.error('POST 请求失败:', error);
  }
};

// 测试 PUT 请求
const testPut = async () => {
  try {
    const data = {
      id: 1,
      title: '更新标题',
      body: '更新内容',
      userId: 1,
    };
    const res = await http.put('/posts/1', data);
    result.value = res;
    console.log('PUT 请求结果:', res);
  } catch (error: any) {
    result.value = 'PUT 请求失败: ' + error.message;
    console.error('PUT 请求失败:', error);
  }
};

// 测试 DELETE 请求
const testDelete = async () => {
  try {
    const res = await http.delete('/posts/1');
    result.value = res;
    console.log('DELETE 请求结果:', res);
  } catch (error: any) {
    result.value = 'DELETE 请求失败: ' + error.message;
    console.error('DELETE 请求失败:', error);
  }
};

// 测试分页查询 (带查询参数)
const testPagination = async () => {
  try {
    // 查询第一页，每页5条数据
    const res = await http.get('/posts', {
      // 只是演示分页url参数，实际开发中请自行处理，测试的接口并没有分页功能
      data: {
        pageNum: 1,
        pageSize: 5,
        query: '查询参数',
      },
    });
    result.value = res;
    console.log('分页查询结果:', res);
  } catch (error: any) {
    result.value = '分页查询失败: ' + error.message;
    console.error('分页查询失败:', error);
  }
};

// 测试无需要认证功能
const testNoAuth = async () => {
  try {
    const res = await http.get('/posts/1', {
      requireAuth: false, // 无需认证，默认都要认证
    });
    result.value = '这里只是演示无需要认证功能，具体请看demo源码';
    console.log('无需认证请求结果:', res);
  } catch (error: any) {
    result.value = '无需认证请求失败: ' + error.message;
    console.error('无需认证请求失败:', error);
  }
};

// 测试自定义请求头功能
const testCustomHeader = async () => {
  try {
    const res = await http.get('/posts/1', {
      header: {
        'Custom-Header': 'CustomValue',
        'X-Request-From': 'UniApp',
      },
    });
    result.value = '这里只是测试自定义请求头功能，请忽略，具体看demo源码';
    console.log('自定义请求头请求结果:', res);
  } catch (error: any) {
    result.value = '自定义请求头请求失败: ' + error.message;
    console.error('自定义请求头请求失败:', error);
  }
};

// 测试下载功能
const testDownload = async () => {
  try {
    downloading.value = true;
    // 使用我们新添加的 download 方法下载文件
    const res = await http.download({
      url: 'https://picsum.photos/800/600',
      showLoading: true,
      loadingText: '下载中...',
      requireAuth: false,
    });

    console.log('文件下载成功，临时路径：', res.tempFilePath);

    // 保存到相册
    result.value = '文件下载成功，准备保存到相册...';
    uni.saveImageToPhotosAlbum({
      filePath: res.tempFilePath,
      success: () => {
        result.value = '文件已成功保存到相册';
        console.log('文件已保存到相册');
        uni.showToast({
          title: '文件已保存到相册',
          icon: 'success',
          duration: 2000,
        });
      },
      fail: err => {
        console.error('保存到相册失败:', err);
        result.value = '保存到相册失败: ' + JSON.stringify(err);
        uni.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  } catch (error: any) {
    result.value = '下载失败: ' + error.message;
    console.error('下载失败:', error);
    uni.showToast({
      title: '下载失败',
      icon: 'none',
      duration: 2000,
    });
  } finally {
    downloading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.request {
  padding: 20rpx;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

button {
  height: 80rpx;
  font-size: 30rpx;
  line-height: 80rpx;
  color: white;
  background-color: #007aff;
  border-radius: 10rpx;
}

.result {
  min-height: 200rpx;
  padding: 20rpx;
  margin-top: 30rpx;
  background-color: #f5f5f5;
  border-radius: 10rpx;
}

.result text {
  display: block;
  font-size: 28rpx;
  line-height: 1.5;
  overflow-wrap: break-word;
}
</style>
