// https://eslint.nodejs.cn/docs/latest/use/configure/configuration-files

import globals from 'globals';
import pluginJs from '@eslint/js'; // JavaScript 规则
import pluginVue from 'eslint-plugin-vue'; // Vue 规则
import pluginTypeScript from '@typescript-eslint/eslint-plugin'; // TypeScript 规则

import parserVue from 'vue-eslint-parser'; // Vue 解析器
import parserTypeScript from '@typescript-eslint/parser'; // TypeScript 解析器

import configPrettier from 'eslint-config-prettier'; // 禁用与 Prettier 冲突的规则
import pluginPrettier from 'eslint-plugin-prettier'; // 运行 Prettier 规则

// 解析自动导入配置
import fs from 'fs';
const autoImportConfig = JSON.parse(
  fs.readFileSync('.eslintrc-auto-import.json', 'utf-8')
);

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 忽略指定文件
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'unpackage/**',
      'public/**',
      'static/**',
      'components/**',
      'src/utils/**',
      'src/stores/**',
      '.prettierrc',
    ],
  },
  // 检查文件的配置
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    ignores: ['**/*.d.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,

        ...autoImportConfig.globals, // 自动导入的全局变量

        ...{
          // 这些是 uni-app 和微信小程序提供的全局 API，不应被覆盖
          uni: 'readonly', // uni-app 核心对象
          wx: 'readonly', // 微信小程序 API
          WechatMiniprogram: 'readonly', // 微信小程序增强 API 命名空间
          getCurrentPages: 'readonly', // 获取当前页面栈
          getApp: 'readonly', // 获取 App 实例
          UniApp: 'readonly', // uni-app 类型命名空间（常用于 TS）
          UniHelper: 'readonly', // 可能是你项目自定义的全局工具
          App: 'readonly', // App 构造器（小程序/uni-app）
          Page: 'readonly', // Page 构造器
          Component: 'readonly', // Component 构造器
          AnyObject: 'readonly', // 常用于类型别名（如 Record<string, any>）
        },
      },
    },
    plugins: { prettier: pluginPrettier },
    rules: {
      ...configPrettier.rules, // 关闭与 Prettier 冲突的规则
      ...pluginPrettier.configs.recommended.rules, // 启用 Prettier 规则
      'prettier/prettier': 'error', // 强制 Prettier 格式化
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // 忽略参数名以 _ 开头的参数未使用警告
          varsIgnorePattern: '^[A-Z0-9_]+$', // 忽略变量名为大写字母、数字或下划线组合的未使用警告（枚举定义未使用场景）
          ignoreRestSiblings: true, // 忽略解构赋值中同级未使用变量的警告
        },
      ],
      'no-prototype-builtins': 'off', // 允许直接调用Object.prototype方法
      'no-constant-binary-expression': 'warn', // 将常量二元表达式警告降为警告级别
    },
  },
  // JavaScript 配置
  pluginJs.configs.recommended,

  // TypeScript 配置
  {
    files: ['**/*.ts'],
    ignores: ['**/*.d.ts'], // 排除d.ts文件
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: { '@typescript-eslint': pluginTypeScript },
    rules: {
      ...pluginTypeScript.configs.strict.rules, // TypeScript 严格规则
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any
      '@typescript-eslint/no-empty-function': 'off', // 允许空函数
      '@typescript-eslint/no-empty-object-type': 'off', // 允许空对象类型
    },
  },

  // Vue 配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript,
        sourceType: 'module',
      },
    },
    plugins: { vue: pluginVue, '@typescript-eslint': pluginTypeScript },
    processor: pluginVue.processors['.vue'],
    rules: {
      // 使用 Vue 3 的 Flat Config 推荐规则（注意：不是 vue3-recommended！）
      ...pluginVue.configs['flat/recommended'].rules,
      'vue/no-v-html': 'off', // 允许 v-html
      'vue/multi-word-component-names': 'off', // 允许单个单词组件名
    },
  },
];
