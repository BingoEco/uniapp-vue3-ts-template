<template>
  <view class="container">
    <view class="header">
      <text class="title">UnoCSS 测试</text>
    </view>

    <view class="content">
      <view class="info-section">
        <text class="section-title">UnoCSS 样式测试：</text>
        <view class="info-item">
          <text>文本颜色测试: </text>
          <text class="text-red-500 font-bold bg-white px-2 py-1 rounded shadow"
            >红色文本</text
          >
          <text
            class="text-blue-500 ml-2 font-bold bg-white px-2 py-1 rounded shadow"
            >蓝色文本</text
          >
          <text
            class="text-green-500 ml-2 font-bold bg-white px-2 py-1 rounded shadow"
            >绿色文本</text
          >
        </view>

        <view class="info-item">
          <text>背景颜色测试: </text>
          <view
            class="inline-block w-20 h-10 bg-red-500 ml-2 rounded shadow-lg"
          ></view>
          <view
            class="inline-block w-20 h-10 bg-blue-500 ml-2 rounded shadow-lg"
          ></view>
          <view
            class="inline-block w-20 h-10 bg-green-500 ml-2 rounded shadow-lg"
          ></view>
        </view>

        <view class="info-item">
          <text>边框测试: </text>
          <view
            class="inline-block w-20 h-10 border-4 border-red-500 ml-2 rounded-lg shadow"
          ></view>
          <view
            class="inline-block w-20 h-10 border-4 border-dashed border-blue-500 ml-2 rounded-lg shadow"
          ></view>
          <view
            class="inline-block w-20 h-10 border-4 border-double border-green-500 ml-2 rounded-lg shadow"
          ></view>
        </view>

        <view class="info-item">
          <text>圆角测试: </text>
          <view
            class="inline-block w-12 h-10 bg-purple-500 rounded-none ml-2 shadow"
          ></view>
          <view
            class="inline-block w-12 h-10 bg-purple-500 rounded-lg ml-2 shadow"
          ></view>
          <view
            class="inline-block w-12 h-10 bg-purple-500 rounded-full ml-2 shadow"
          ></view>
        </view>

        <view class="info-item">
          <text>字体大小测试: </text>
          <text class="text-xs">超小字</text>
          <text class="text-sm ml-2">小字</text>
          <text class="text-base ml-2">正常</text>
          <text class="text-lg ml-2">大字</text>
          <text class="text-xl ml-2">超大</text>
        </view>

        <view class="info-item">
          <text>间距测试: </text>
          <view class="flex items-center">
            <view class="w-10 h-6 bg-yellow-500 p-1"></view>
            <view class="w-10 h-6 bg-yellow-500 p-2 ml-2"></view>
            <view class="w-10 h-6 bg-yellow-500 p-3 ml-4"></view>
            <view class="w-10 h-6 bg-yellow-500 p-4 ml-8"></view>
          </view>
        </view>

        <!-- 新增图标测试部分 -->
        <view class="info-item">
          <text class="section-title">图标测试：</text>

          <view class="mt-4">
            <text class="block mb-2">基础图标:</text>
            <view class="flex items-center flex-wrap gap-4">
              <view class="flex flex-col items-center">
                <view class="i-carbon-home text-2xl"></view>
                <text class="text-xs mt-1">home</text>
              </view>
              <view class="flex flex-col items-center">
                <view class="i-carbon-user text-2xl"></view>
                <text class="text-xs mt-1">user</text>
              </view>
              <view class="flex flex-col items-center">
                <view class="i-carbon-settings text-2xl"></view>
                <text class="text-xs mt-1">settings</text>
              </view>
              <view class="flex flex-col items-center">
                <view class="i-carbon-search text-2xl"></view>
                <text class="text-xs mt-1">search</text>
              </view>
            </view>
          </view>

          <view class="mt-4">
            <text class="block mb-2">不同颜色的图标:</text>
            <view class="flex items-center gap-4">
              <view
                class="i-carbon-asleep-filled text-2xl text-yellow-500"
              ></view>
              <view class="i-carbon-heart text-2xl text-red-500"></view>
              <view class="i-carbon-star text-2xl text-yellow-500"></view>
              <view class="i-carbon-thumbs-up text-2xl text-blue-500"></view>
              <view class="i-carbon-chat text-2xl text-green-500"></view>
            </view>
          </view>

          <view class="mt-4">
            <text class="block mb-2">不同尺寸的图标:</text>
            <view class="flex items-end gap-4">
              <view class="flex flex-col items-center">
                <view class="i-carbon-logo-vue text-xs"></view>
                <text class="text-xs mt-1">xs</text>
              </view>
              <view class="flex flex-col items-center">
                <view class="i-carbon-logo-vue text-sm"></view>
                <text class="text-xs mt-1">sm</text>
              </view>
              <view class="flex flex-col items-center">
                <view class="i-carbon-logo-vue text-base"></view>
                <text class="text-xs mt-1">base</text>
              </view>
              <view class="flex flex-col items-center">
                <view class="i-carbon-logo-vue text-lg"></view>
                <text class="text-xs mt-1">lg</text>
              </view>
              <view class="flex flex-col items-center">
                <view class="i-carbon-logo-vue text-xl"></view>
                <text class="text-xs mt-1">xl</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="button-group">
        <view
          class="bg-green-500 text-white py-3 px-4 rounded"
          @click="navigateToIndex"
        >
          返回首页
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
function navigateToIndex() {
  uni.switchTab({ url: '/pages/index/index' });
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
</style>
