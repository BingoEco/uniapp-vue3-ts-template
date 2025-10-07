<template>
  <div class="test">test</div>
</template>

<script lang="ts" setup>
import { un } from '@uni-helper/uni-network';

un.get('https://jsonplaceholder.typicode.com/posts')
  .then(res => {
    console.log(res.data);
  })
  .catch(error => {
    // 处理错误
    console.log('error', error);
  })
  .finally(() => {
    // 总是会执行
  });

un.post('https://jsonplaceholder.typicode.com/posts', {
  title: 'foo',
  body: 'bar',
  userId: 1,
})
  .then(res => {
    console.log(res.data);
  })
  .catch(error => {
    // 处理错误
    console.log('error', error);
  })
  .finally(() => {
    // 总是会执行
  });
async function test() {
  try {
    const res = await un.get('https://jsonplaceholder.typicode.com/posts');
    console.log(res.data);
  } catch (error) {
    // 处理错误
    console.log('error', error);
  } finally {
    // 总是会执行
  }
}
test();
</script>

<style lang="scss" scoped></style>
