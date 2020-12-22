<template>
  <div>
    <article-item v-for="item in article.list" :key="item.id" :title="item.title"></article-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import ArticleItem from './components/article-item.vue';

import { IArticle } from '@/core/entities';

import { apiGetArticleList } from '@/core/apis';

export default defineComponent({
  name: 'article-list',
  components: { [ArticleItem.name]: ArticleItem },
  setup() {
    const article: { list: IArticle[]; page: number; rows: number } = reactive({
      list: [],
      page: 0,
      rows: 20
    });
    return { article };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      apiGetArticleList<IArticle>(this.article.page, this.article.rows)
        .then(res => {
          this.article.list = res.data;

          console.info(this.article);
        })
        .catch();
    }
  }
});
</script>
