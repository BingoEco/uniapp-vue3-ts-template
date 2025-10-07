<template>
  <view class="container">
    <view class="card">
      <text class="title">Pinia 状态管理示例</text>
      <view class="info-section">
        <text class="label">当前用户:</text>
        <text class="value">{{ memberStore.profile || '未登录' }}</text>
      </view>

      <view class="button-group">
        <button class="btn" @click="handleSetProfile">设置用户信息</button>
        <button class="btn" @click="handleClearProfile">清除用户信息</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores/modules/member';

const memberStore = useMemberStore();

const handleSetProfile = () => {
  memberStore.setProfile('uni-app 用户');
  uni.showToast({ title: '用户信息已设置', icon: 'success' });
};

const handleClearProfile = () => {
  memberStore.clearProfile();
  uni.showToast({ title: '用户信息已清除', icon: 'success' });
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding: 20rpx;
  background-color: var(--bg-color);
}

.card {
  padding: 30rpx;
  background-color: var(--bg-card);
  border-radius: 10rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.title {
  margin-bottom: 40rpx;
  font-size: 36rpx;
  font-weight: bold;
  color: var(--text-primary);
  text-align: center;
}

.info-section {
  margin-bottom: 40rpx;
}

.label {
  display: block;
  margin-bottom: 10rpx;
  font-size: 28rpx;
  color: var(--text-secondary);
}

.value {
  display: block;
  padding: 20rpx;
  font-size: 32rpx;
  color: var(--text-primary);
  background-color: var(--bg-color);
  border-radius: 8rpx;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.btn {
  padding: 20rpx;
  font-size: 32rpx;
  color: white;
  cursor: pointer;
  background-color: #007aff;
  border: none;
  border-radius: 10rpx;
}

.btn:active {
  background-color: #0062cc;
}
</style>
