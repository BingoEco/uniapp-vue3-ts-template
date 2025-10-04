<template>
  <view class="content">
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="container">
      <view class="section">
        <text class="section-title">当前时间:</text>
        <text class="result">{{ currentTime }}</text>
      </view>

      <view class="section">
        <text class="section-title">格式化时间:</text>
        <text class="result">{{ formattedTime }}</text>
      </view>

      <view class="section">
        <text class="section-title">相对时间:</text>
        <text class="result">{{ relativeTime }}</text>
      </view>

      <view class="section">
        <text class="section-title">自定义相对时间:</text>
        <text class="result">{{ customRelativeTime }}</text>
      </view>

      <view class="section">
        <button @click="updateTime" class="button">更新时间</button>
        <button @click="testVariousDates" class="button">测试不同日期</button>
      </view>

      <view class="section" v-if="testDates.length > 0">
        <text class="section-title">测试日期列表:</text>
        <view v-for="(date, index) in testDates" :key="index" class="date-item">
          <text>{{ date.label }}: {{ date.value }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import dayjs, { formatRelativeTime } from '@/utils/dayjs';

// 页面数据
const title = ref('dayjs 功能测试');
const currentTime = ref('');
const formattedTime = ref('');
const relativeTime = ref('');
const customRelativeTime = ref('');
const testDates = ref<Array<{ label: string; value: string }>>([]);

// 更新时间函数
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toString();
  formattedTime.value = dayjs(now).format('YYYY-MM-DD HH:mm:ss');
  relativeTime.value = dayjs(now).fromNow();
  customRelativeTime.value = formatRelativeTime(now);
};

// 测试不同日期
const testVariousDates = () => {
  const now = new Date();
  const tests = [
    { label: '现在', date: now },
    { label: '1小时前', date: dayjs(now).subtract(1, 'hour').toDate() },
    { label: '3小时前', date: dayjs(now).subtract(3, 'hour').toDate() },
    { label: '昨天', date: dayjs(now).subtract(1, 'day').toDate() },
    { label: '3天前', date: dayjs(now).subtract(3, 'day').toDate() },
    { label: '一周前', date: dayjs(now).subtract(1, 'week').toDate() },
    { label: '一个月前', date: dayjs(now).subtract(1, 'month').toDate() },
  ];

  testDates.value = tests.map(test => ({
    label: test.label,
    value: formatRelativeTime(test.date),
  }));
};

// 组件挂载时初始化
onMounted(() => {
  updateTime();
});
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
}

.text-area {
  margin-bottom: 40rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.container {
  width: 100%;
}

.section {
  padding: 20rpx;
  margin-bottom: 30rpx;
  background-color: #f5f5f5;
  border-radius: 10rpx;
}

.section-title {
  display: block;
  margin-bottom: 10rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.result {
  display: block;
  font-size: 24rpx;
  color: #666;
}

.button {
  display: block;
  width: 100%;
  padding: 20rpx;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: white;
  background-color: #007aff;
  border: none;
  border-radius: 10rpx;
}

.date-item {
  padding: 10rpx 0;
  font-size: 24rpx;
  color: #666;
  border-bottom: 1rpx solid #eee;
}

.date-item:last-child {
  border-bottom: none;
}
</style>
