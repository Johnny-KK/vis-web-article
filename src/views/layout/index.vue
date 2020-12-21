<template>
  <div class="layout-header">header</div>

  <div class="layout-main">
    <div>left</div>
    <article-list></article-list>
    <div>right</div>
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
}
</style>
