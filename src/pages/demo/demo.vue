<template>
  <view class="container">
    <view class="header">
      <text class="title">组件功能展示</text>
    </view>

    <view class="list">
      <view class="list-item" @click="goToPina">
        <view class="item-content">
          <text class="item-title">Pina</text>
          <text class="item-desc">状态管理工具，用于管理应用状态</text>
        </view>
        <view class="arrow">></view>
      </view>

      <view class="list-item" @click="goToUnocss">
        <view class="item-content">
          <text class="item-title">unocss</text>
          <text class="item-desc">即时按需CSS引擎，用于快速样式开发</text>
        </view>
        <view class="arrow">></view>
      </view>
      <view class="list-item" @click="goToDayjs">
        <view class="item-content">
          <text class="item-title">dayjs</text>
          <text class="item-desc">轻量级日期处理库，用于日期格式化等操作</text>
        </view>
        <view class="arrow">></view>
      </view>
      <view class="list-item" @click="goToZPaging">
        <view class="item-content">
          <text class="item-title">z-paging</text>
          <text class="item-desc">分页组件，用于处理列表分页加载</text>
        </view>
        <view class="arrow">></view>
      </view>
      <view class="list-item" @click="goToLodash">
        <view class="item-content">
          <text class="item-title">lodash</text>
          <text class="item-desc">JavaScript工具库，提供防抖和节流等功能</text>
        </view>
        <view class="arrow">></view>
      </view>
      <view class="list-item" @click="goToRequest">
        <view class="item-content">
          <text class="item-title">request</text>
          <text class="item-desc">网络请求库，用于处理HTTP请求</text>
        </view>
        <view class="arrow">></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash-es';

// 防抖处理导航函数，防止用户重复点击
const goToPina = debounce(() => {
  uni.navigateTo({
    url: '/pages/pinia/pinia',
  });
}, 300);

function goToUnocss() {
  uni.navigateTo({
    url: '/pages/unocss/unocss',
  });
}

function goToDayjs() {
  uni.navigateTo({
    url: '/pages/dayjs/dayjs',
  });
}

function goToZPaging() {
  uni.navigateTo({
    url: '/pages/zpaging/zpaging',
  });
}

function goToLodash() {
  uni.navigateTo({
    url: '/pages/lodash/lodash',
  });
}

function goToRequest() {
  uni.navigateTo({
    url: '/pages/request/request',
  });
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
.list {
  overflow: hidden;
  background-color: #fff;
  border-radius: 10rpx;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
}
.list-item:last-child {
  border-bottom: none;
}
.item-content {
  display: flex;
  flex-direction: column;
}
.item-title {
  margin-bottom: 10rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}
.item-desc {
  font-size: 26rpx;
  color: #999;
}
.arrow {
  font-size: 36rpx;
  color: #333;
}
</style>
