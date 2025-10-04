<template>
  <view class="container">
    <view class="header">
      <text class="title">Pinia 测试</text>
    </view>

    <view class="content">
      <view class="info-section">
        <text class="section-title">当前用户信息：</text>
        <view class="info-item">
          <text>用户信息: {{ memberStore.profile || '未登录' }}</text>
        </view>
      </view>

      <view class="button-group">
        <view class="btn" @click="setUserProfile"> 设置用户信息 </view>
        <view class="btn" @click="clearUserProfile"> 清除用户信息 </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useMemberStore } from '@/stores/modules/member';

const memberStore = useMemberStore();

function setUserProfile() {
  memberStore.setProfile({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
  });
}

function clearUserProfile() {
  memberStore.clearProfile();
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  padding: 20rpx;
  background-color: #f5f5f5;
}
.header {
  padding: 30rpx 0;
  margin-bottom: 20rpx;
  text-align: center;
}
.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}
.content {
  padding: 30rpx;
  background-color: #fff;
  border-radius: 10rpx;
}
.section-title {
  display: block;
  margin-bottom: 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}
.info-item {
  padding: 20rpx;
  margin-bottom: 20rpx;
  background-color: #f9f9f9;
  border-radius: 8rpx;
}
.btn {
  padding: 20rpx;
  margin-bottom: 20rpx;
  font-size: 32rpx;
  color: white;
  text-align: center;
  background-color: #28b389;
  border-radius: 10rpx;
}
.btn:last-child {
  margin-bottom: 0;
}
</style>
