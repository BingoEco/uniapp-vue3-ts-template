<template>
  <view class="container">
    <view class="title">Uni UI 组件测试</view>

    <!-- 测试 uni-badge 组件 -->
    <view class="card">
      <text class="card-title">Badge 组件</text>
      <view class="badge-container">
        <uni-badge text="1" type="primary"></uni-badge>
        <uni-badge text="2" type="success"></uni-badge>
        <uni-badge text="3" type="warning"></uni-badge>
        <uni-badge text="4" type="error"></uni-badge>
      </view>
    </view>

    <!-- 测试 uni-card 组件 -->
    <view class="card">
      <text class="card-title">Card 组件</text>
      <uni-card title="卡片标题" note="小Tips" extra="额外信息">
        这是一个卡片内容区域，可以放置一些相关信息。
      </uni-card>
    </view>

    <!-- 测试 uni-collapse 组件 -->
    <view class="card">
      <text class="card-title">Collapse 组件</text>
      <uni-collapse>
        <uni-collapse-item title="默认开启" :open="true">
          <text>折叠内容主体，可放置一些具体内容</text>
        </uni-collapse-item>
        <uni-collapse-item title="折叠内容">
          <text>折叠内容主体，这是一段比较长的内容</text>
        </uni-collapse-item>
      </uni-collapse>
    </view>

    <!-- 测试 uni-grid 组件 -->
    <view class="card">
      <text class="card-title">Grid 组件</text>
      <uni-grid :column="3" :highlight="true">
        <uni-grid-item>
          <view class="grid-item">
            <text>宫格1</text>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="grid-item">
            <text>宫格2</text>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="grid-item">
            <text>宫格3</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <!-- 测试 uni-list 组件 -->
    <view class="card">
      <text class="card-title">List 组件</text>
      <uni-list>
        <uni-list-item title="列表项1" note="列表项描述信息"></uni-list-item>
        <uni-list-item title="列表项2" note="列表项描述信息"></uni-list-item>
        <uni-list-item
          title="列表项3"
          note="列表项描述信息"
          link="navigateTo"
        ></uni-list-item>
      </uni-list>
    </view>

    <!-- 测试 uni-section 组件 -->
    <view class="card">
      <text class="card-title">Section 组件</text>
      <uni-section title="章节标题" subTitle="章节副标题" type="line">
        <view class="section-content">
          这是章节内容区域，可以放置一些相关信息。
        </view>
      </uni-section>
    </view>

    <!-- 测试 uni-popup 组件 -->
    <view class="card">
      <text class="card-title">Popup 弹出层组件</text>
      <button @click="openPopup">打开弹出层</button>
      <uni-popup ref="popup" type="center">
        <view class="popup-content">
          <text>这是一个弹出层</text>
          <button @click="closePopup">关闭</button>
        </view>
      </uni-popup>
    </view>

    <!-- 测试 uni-notice-bar 组件 -->
    <view class="card">
      <text class="card-title">Notice Bar 通告栏组件</text>
      <uni-notice-bar
        text="这是一条通告消息，会自动滚动播放。"
        :show-icon="true"
        :scrollable="true"
      >
      </uni-notice-bar>
    </view>

    <!-- 测试 uni-fav 组件 -->
    <view class="card">
      <text class="card-title">Fav 收藏组件</text>
      <view class="fav-container">
        <uni-fav :checked="favChecked" @click="toggleFav"></uni-fav>
        <text>{{ favChecked ? '已收藏' : '未收藏' }}</text>
      </view>
    </view>

    <!-- 测试 uni-goods-nav 组件 -->
    <view class="card">
      <text class="card-title">Goods Nav 商品导航组件</text>
      <uni-goods-nav
        :fill="true"
        :options="goodsNavOptions"
        :button-group="goodsNavButtonGroup"
        @click="onGoodsNavClick"
        @buttonClick="onGoodsNavButtonClick"
      >
      </uni-goods-nav>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Popup 弹出层相关
const popup = ref<any>(null);
const openPopup = () => {
  popup.value?.open();
};
const closePopup = () => {
  popup.value?.close();
};

// Fav 收藏相关
const favChecked = ref(false);
const toggleFav = () => {
  favChecked.value = !favChecked.value;
};

// Goods Nav 商品导航相关
const goodsNavOptions = ref([
  { icon: 'chat' as any, text: '客服' },
  { icon: 'shop' as any, text: '店铺' },
  { icon: 'cart' as any, text: '购物车', info: 2 },
]);

const goodsNavButtonGroup = ref([
  { text: '加入购物车', backgroundColor: '#ff0000', color: '#fff' },
  { text: '立即购买', backgroundColor: '#ffa200', color: '#fff' },
]);

const onGoodsNavClick = (e: any) => {
  console.log('GoodsNav Click', e);
  uni.showToast({
    title: `点击了第${e.index}个选项`,
    icon: 'none',
  });
};

const onGoodsNavButtonClick = (e: any) => {
  console.log('GoodsNav ButtonClick', e);
  uni.showToast({
    title: `点击了第${e.index}个按钮`,
    icon: 'none',
  });
};
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.title {
  margin-bottom: 40rpx;
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
}

.card {
  padding: 20rpx;
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.card-title {
  display: block;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  font-weight: bold;
}

.badge-container {
  display: flex;
  gap: 20rpx;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100rpx;
}

.section-content {
  padding: 20rpx 0;
}

.popup-content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  align-items: center;
  justify-content: center;
  width: 500rpx;
  height: 300rpx;
  background-color: #fff;
  border-radius: 10rpx;
}

.fav-container {
  display: flex;
  gap: 20rpx;
  align-items: center;
}
</style>
