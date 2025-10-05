<template>
  <view class="container">
    <view class="content">
      <wd-cell-group title="Navbar 导航栏">
        <wd-button type="primary" @click="showNavbar1">基础导航栏</wd-button>
        <wd-button type="primary" @click="showNavbar2">
          带右侧按钮导航栏
        </wd-button>
      </wd-cell-group>

      <wd-cell-group title="Swiper 轮播">
        <wd-button type="primary" @click="showSwiper1">基础轮播</wd-button>
        <wd-button type="primary" @click="showSwiper2">指示器样式</wd-button>
      </wd-cell-group>

      <wd-cell-group title="Popup 弹出层">
        <wd-button type="primary" @click="showPopup1">从下方弹出</wd-button>
        <wd-button type="primary" @click="showPopup2">从上方弹出</wd-button>
        <wd-button type="primary" @click="showPopup3">从左侧弹出</wd-button>
        <wd-button type="primary" @click="showPopup4">从右侧弹出</wd-button>
      </wd-cell-group>
    </view>

    <!-- Navbar示例 -->
    <wd-navbar
      v-if="navbar1Visible"
      title="基础导航栏"
      left-arrow
      @click-left="hideNavbar1"
    />

    <wd-navbar
      v-if="navbar2Visible"
      title="带右侧按钮"
      left-arrow
      @click-left="hideNavbar2"
    >
      <template #right>
        <wd-icon
          name="search"
          custom-class="right-icon"
          @click="handleSearch"
        />
      </template>
    </wd-navbar>

    <!-- Swiper示例 -->
    <wd-swiper
      v-if="swiper1Visible"
      :list="swiperList"
      autoplay
      indicator
      custom-class="swiper"
      @click="onSwiperClick"
    />

    <wd-swiper
      v-if="swiper2Visible"
      :list="swiperList"
      autoplay
      :indicator="{ type: 'fraction' }"
      indicatorPosition="bottom-right"
      custom-class="swiper"
      @click="onSwiperClick"
    />

    <!-- Popup示例 -->
    <wd-popup
      v-model="popup1Visible"
      position="bottom"
      custom-style="height: 200px;"
    >
      <view class="popup-content">
        <text>从下方弹出的弹出层</text>
        <wd-button type="primary" @click="closePopup1">关闭</wd-button>
      </view>
    </wd-popup>

    <wd-popup
      v-model="popup2Visible"
      position="top"
      custom-style="height: 200px;"
    >
      <view class="popup-content">
        <text>从上方弹出的弹出层</text>
        <wd-button type="primary" @click="closePopup2">关闭</wd-button>
      </view>
    </wd-popup>

    <wd-popup
      v-model="popup3Visible"
      position="left"
      custom-style="width: 200px; height: 100%;"
    >
      <view class="popup-content">
        <text>从左侧弹出的弹出层</text>
        <wd-button type="primary" @click="closePopup3">关闭</wd-button>
      </view>
    </wd-popup>

    <wd-popup
      v-model="popup4Visible"
      position="right"
      custom-style="width: 200px; height: 100%;"
    >
      <view class="popup-content">
        <text>从右侧弹出的弹出层</text>
        <wd-button type="primary" @click="closePopup4">关闭</wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Navbar控制
const navbar1Visible = ref(false);
const navbar2Visible = ref(false);

// Swiper控制
const swiper1Visible = ref(false);
const swiper2Visible = ref(false);

const swiperList = ref([
  'https://wot-ui.cn/assets/capybara.jpg',
  'https://wot-ui.cn/assets/moon.jpg',
  'https://wot-ui.cn/assets/meng.jpg',
]);

// Popup控制
const popup1Visible = ref(false);
const popup2Visible = ref(false);
const popup3Visible = ref(false);
const popup4Visible = ref(false);

// Navbar方法
function showNavbar1() {
  navbar1Visible.value = true;
}

function hideNavbar1() {
  navbar1Visible.value = false;
}

function showNavbar2() {
  navbar2Visible.value = true;
}

function hideNavbar2() {
  navbar2Visible.value = false;
}

function handleSearch() {
  console.log('点击了搜索按钮');
  uni.showToast({
    title: '点击了搜索按钮',
    icon: 'none',
  });
}

// Swiper方法
function showSwiper1() {
  swiper1Visible.value = true;
  swiper2Visible.value = false;
}

function showSwiper2() {
  swiper2Visible.value = true;
  swiper1Visible.value = false;
}

function onSwiperClick(index: number) {
  console.log('点击了第' + (index + 1) + '张图片');
  uni.showToast({
    title: '点击了第' + (index + 1) + '张图片',
    icon: 'none',
  });
}

// Popup方法
function showPopup1() {
  popup1Visible.value = true;
}

function closePopup1() {
  popup1Visible.value = false;
}

function showPopup2() {
  popup2Visible.value = true;
}

function closePopup2() {
  popup2Visible.value = false;
}

function showPopup3() {
  popup3Visible.value = true;
}

function closePopup3() {
  popup3Visible.value = false;
}

function showPopup4() {
  popup4Visible.value = true;
}

function closePopup4() {
  popup4Visible.value = false;
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 20rpx;
}

.swiper {
  margin: 20rpx 0;
  overflow: hidden;
  border-radius: 10rpx;
}

.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  text {
    margin-bottom: 20rpx;
    font-size: 32rpx;
    color: #333;
  }
}

.right-icon {
  margin-right: 20rpx;
  font-size: 36rpx;
  color: #333;
}
</style>
