<template>
  <header class="layout-header">
    <div class="header-empty"></div>
    <el-input v-model="article.fuzzy" class="search-box" placeholder="搜索文章" clearable></el-input>
    <el-button class="add-btn" type="primary" @click="add">新增</el-button>
    <div class="header-empty"></div>
  </header>

  <div class="layout-main">
    <div class="layout-main__left">left</div>
    <article-list class="layout-main__middle" :list="article.list"></article-list>
    <div class="layout-main__right">right</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import ArticleList from '@/views/article-list/index.vue';

import { IArticle } from '@/core/entities';
import { apiGetArticleList } from '@/core/apis';

export default defineComponent({
  name: 'layout',
  components: { [ArticleList.name]: ArticleList },
  setup() {
    const article: { list: IArticle[]; fuzzy: string; page: number; rows: number } = reactive({ list: [], fuzzy: '', page: 1, rows: 20 });
    return { article };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    // 条件查询文章列表
    getArticleList() {
      apiGetArticleList(this.article.fuzzy, this.article.page, this.article.rows)
        .then(res => {
          this.article.list = res.data;
        })
        .catch();
    },
    // 新增文章
    add(): void {
      this.$router.push('/article-edit/add/null');
    }
  }
});
</script>

<style lang="scss" scoped>
.layout-header {
  background-color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;

  .header-empty {
    flex: 0 0 20%;
  }

  .search-box {
    transition: all 0.5s;
    width: 15rem;

    i {
      cursor: pointer;
    }
  }

  .add-btn {
    margin-left: 3rem;
  }
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
  }

  &__right {
    flex: 0 0 20%;
  }
}
</style>
