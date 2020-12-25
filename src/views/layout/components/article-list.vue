<template>
  <ul class="article-list">
    <li class="article-item" v-for="item in article.list" :key="item.id" @click="$emit('showDetail', item.id)">
      <div class="article-item__head">
        <span>{{ item.author }}</span>
        <span>{{ item.modifyTime }}</span>
        <span>前端</span>
      </div>
      <div class="article-item__title">{{ item.title }}</div>
      <ul class="article-item__foot">
        <li>
          <i class="el-icon-view"></i>
          <span>18</span>
        </li>

        <li class="share-item">掘金</li>
        <li class="share-item">知乎</li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import { IArticle } from '@/core/entities';
import { apiGetArticleList } from '@/core/apis';

export default defineComponent({
  name: 'article-list',
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
    }
  }
});
</script>

<style lang="scss" scoped>
.article-list {
  padding: 20px 0;
}

.article-item {
  background-color: white;
  padding: 1.5rem 2rem;
  cursor: pointer;
  border-bottom: 1px solid rgba(178, 186, 194, 0.15);
  list-style-type: none;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #fbfbfb;
  }

  &__head {
    font-size: 1rem;
    color: #b2bac2;

    & > span::after {
      content: '·';
      margin: 0 0.4em;
      color: #b2bac2;
    }

    & > span:last-child::after {
      display: none;
    }
  }

  &__title {
    margin: 0.5rem 0 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__title:hover {
    text-decoration: underline;
  }

  &__foot {
    padding: 0;
    display: inline-flex;
    white-space: nowrap;

    li {
      list-style-type: none;

      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0 0.8rem;
      height: 2rem;
      font-size: 1rem;
      line-height: 1;
      white-space: nowrap;
      color: #b2bac2;
      border-radius: 1px;
      border: 1px solid #edeeef;
    }

    .share-item {
      margin-left: -1px;
    }
  }
}
</style>
