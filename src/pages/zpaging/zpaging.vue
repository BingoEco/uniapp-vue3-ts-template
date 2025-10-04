<template>
  <view class="content">
    <z-paging ref="paging" v-model="dataList" @query="queryList" :auto="true">
      <view class="list-container">
        <view class="item" v-for="(item, index) in dataList" :key="item.id">
          <view class="item-header">
            <text class="item-title">{{ item.name }}</text>
            <text class="item-email">{{ item.email }}</text>
          </view>
          <text class="item-body">{{ item.body }}</text>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface CommentItem {
  id: number;
  name: string;
  email: string;
  body: string;
}

const paging = ref<any>(null);
const dataList = ref<CommentItem[]>([]);

onMounted(() => {
  // 页面加载时自动触发首次数据加载
  if (paging.value) {
    paging.value.reload();
  }
});

const queryList = (pageNo: number, pageSize: number) => {
  getDataList(pageNo, pageSize)
    .then(res => {
      paging.value?.complete(res);
    })
    .catch(err => {
      console.error('请求失败', err);
      paging.value?.complete(false);
    });
};

const getDataList = (pageNo: number, pageSize: number) => {
  return new Promise<CommentItem[]>((resolve, reject) => {
    uni.request({
      url: 'https://jsonplaceholder.typicode.com/comments',
      method: 'GET',
      data: {
        _page: pageNo,
        _limit: pageSize,
      },
      success: res => {
        resolve(res.data as CommentItem[]);
      },
      fail: err => {
        reject(err);
      },
    });
  });
};
</script>

<style>
.content {
  min-height: 100vh;
  padding: 0 20rpx;
  background-color: #f5f5f5;
}

.list-container {
  padding: 20rpx;
}

.item {
  padding: 20rpx;
  margin-bottom: 20rpx;
  background-color: white;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.item-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 15rpx;
}

.item-title {
  margin-bottom: 10rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.item-email {
  font-size: 26rpx;
  color: #007aff;
}

.item-body {
  font-size: 28rpx;
  line-height: 1.5;
  color: #666;
}
</style>
