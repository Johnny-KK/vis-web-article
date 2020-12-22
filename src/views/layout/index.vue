<template>
  <div class="layout-header">header</div>

  <div class="layout-main">
    <div class="layout-main__left">left</div>
    <article-list class="layout-main__middle"></article-list>
    <div class="layout-main__right">right</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ArticleList from '@/views/article-list/index.vue';

export default defineComponent({
  name: 'layout',
  components: { [ArticleList.name]: ArticleList }
});
</script>

<style lang="scss" scoped>
.layout-header {
  background-color: aquamarine;
}

.layout-main {
  display: flex;
  flex-direction: row;
  justify-content: center;

  background-color: #f4f5f5;

  &__left {
    flex: 0 0 20%;
  }

  &__middle {
    flex: 0 0 60%;
    // text-align: center;
  }

  &__right {
    flex: 0 0 20%;
  }
}
</style>
