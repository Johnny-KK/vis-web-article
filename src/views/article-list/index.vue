<template>
  <ul class="article-list">
    <article-item
      class="article-item"
      v-for="item in list"
      :key="item.id"
      :title="item.title"
      :author="item.author"
      :modifyTime="item.modifyTime"
      @click="showPage(item)"
    ></article-item>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ArticleItem from './components/article-item.vue';

import { IArticle } from '@/core/entities';

export default defineComponent({
  name: 'article-list',
  components: { [ArticleItem.name]: ArticleItem },
  props: { list: { type: Array } },
  methods: {
    // 跳转到详情页面
    showPage(item: IArticle) {
      this.$router.push(`/article/${item.id}`);
    }
  }
});
</script>

<style lang="scss" scoped>
.article-list {
  padding: 20px 0;
}
</style>
