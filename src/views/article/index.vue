<template>
  <header class="article-header">header</header>

  <div class="article-main">
    <div class="article-main__left">left</div>

    <div class="article-main__middle">
      <a class="article-author">{{ article.author }}</a>
      <div class="article-meta-box">
        <span>{{ article.modifyTime }}</span>
        <span class="dot">·</span>
        <span class="edit-btn" @click="edit(article.id)">编辑</span>
      </div>
      <div class="article-title">{{ article.title }}</div>
      <div class="markdown-body" v-html="contentHtml"></div>
    </div>

    <div class="article-main__right">right</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import showdown from 'showdown';
const converter = new showdown.Converter();

import { IArticle, emptyArticle } from '@/core/entities';
import { apiGetArticleById } from '@/core/apis';

export default defineComponent({
  name: 'vis-article',
  props: { id: { type: String, required: true } },
  setup() {
    const article: IArticle = reactive(emptyArticle);
    return { article };
  },
  computed: {
    contentHtml(): string {
      return converter.makeHtml(this.article.content);
    }
  },
  mounted() {
    this.getArticleById();
  },
  methods: {
    // 根据ID获取文章信息
    getArticleById() {
      apiGetArticleById(this.id).then(res => {
        Object.assign(this.article, res.data);
      });
    },
    // 编辑
    edit(id: string) {
      this.$router.push(`/article-edit/update/${id}`);
    }
  }
});
</script>

<style lang="scss" scoped>
.article-header {
  background-color: aquamarine;
}

.article-main {
  display: flex;
  flex-direction: row;
  justify-content: center;

  background-color: #f4f5f5;

  &__left {
    flex: 0 0 20%;
  }

  &__middle {
    flex: 0 0 60%;
    background-color: white;
    padding: 2rem;

    .article-author {
      display: inline-block;
      width: 100%;
      font-size: 1.3rem;
      font-weight: 700;
      color: #333;
      cursor: pointer;
    }

    .article-meta-box {
      font-size: 1.1rem;
      color: #909090;

      .dot {
        font-size: 1.1rem;
        color: #909090;
        margin: 0 0.5em;
      }

      .edit-btn {
        color: #1264b6;
        cursor: pointer;
      }
    }

    .article-title {
      margin: 0.67em 0;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.5;
    }
  }

  &__right {
    flex: 0 0 20%;
  }
}
</style>
