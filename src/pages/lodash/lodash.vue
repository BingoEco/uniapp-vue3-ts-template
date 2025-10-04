<template>
  <view class="container">
    <view class="header">
      <text class="title">Lodash 防抖和节流测试</text>
    </view>

    <view class="section">
      <view class="section-title">防抖测试 (Debounce)</view>
      <view class="description"
        >输入内容，只有在停止输入500ms后才会更新结果</view
      >
      <input
        class="input"
        placeholder="输入内容测试防抖"
        @input="debounceInput"
      />
      <view class="result">
        <text class="label">防抖结果: </text>
        <text class="value">{{ debounceResult || '暂无' }}</text>
      </view>
      <view class="result">
        <text class="label">触发次数: </text>
        <text class="value">{{ debounceCount }}</text>
      </view>

      <view class="divider"></view>

      <view class="section-title">对比测试</view>
      <view class="description">普通输入 (无防抖)</view>
      <input
        class="input"
        placeholder="输入内容查看实时更新"
        @input="normalInput"
      />
      <view class="result">
        <text class="label">普通输入结果: </text>
        <text class="value">{{ normalResult || '暂无' }}</text>
      </view>
      <view class="result">
        <text class="label">触发次数: </text>
        <text class="value">{{ normalCount }}</text>
      </view>
    </view>

    <view class="section">
      <view class="section-title">节流测试 (Throttle)</view>
      <view class="description">点击按钮，每1000ms内最多只会执行一次</view>
      <button class="button" @click="throttleClick">点击测试节流</button>
      <view class="result">
        <text class="label">节流计数: </text>
        <text class="value">{{ throttleCount }}</text>
      </view>
      <view class="result">
        <text class="label">实际点击次数: </text>
        <text class="value">{{ clickCount }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { debounce, throttle } from 'lodash-es';

const debounceResult = ref('');
const debounceCount = ref(0);
const throttleCount = ref(0);
const clickCount = ref(0);
const normalResult = ref('');
const normalCount = ref(0);

// 创建防抖函数
const debounceFn = debounce((value: string) => {
  debounceResult.value = value;
  debounceCount.value++;
}, 500);

// 输入处理函数 (防抖)
const debounceInput = (e: any) => {
  const value = e.detail.value;
  debounceFn(value);
};

// 创建节流函数
const throttleFn = throttle(() => {
  throttleCount.value++;
}, 1000);

// 点击处理函数 (节流)
const throttleClick = () => {
  clickCount.value++;
  throttleFn();
};

// 普通输入处理函数 (无防抖)
const normalInput = (e: any) => {
  const value = e.detail.value;
  normalResult.value = value;
  normalCount.value++;
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding: 20rpx;
  background-color: #f5f5f5;
}

.header {
  padding: 30rpx 0;
  margin-bottom: 20rpx;
  text-align: center;
  background-color: #fff;
  border-radius: 10rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.section {
  padding: 30rpx;
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
}

.section-title {
  margin-bottom: 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.description {
  margin-bottom: 20rpx;
  font-size: 26rpx;
  color: #666;
}

.input {
  padding: 20rpx;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  border: 1rpx solid #ddd;
  border-radius: 10rpx;
}

.button {
  padding: 20rpx;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: white;
  background-color: #007aff;
  border: none;
  border-radius: 10rpx;
}

.result {
  display: flex;
  margin-bottom: 10rpx;
}

.label {
  font-size: 28rpx;
  color: #666;
}

.value {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.divider {
  height: 1rpx;
  margin: 30rpx 0;
  background-color: #eee;
}
</style>
