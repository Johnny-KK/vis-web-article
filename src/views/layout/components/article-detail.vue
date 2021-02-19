<template>
  <div class="article-detail">
    <a class="article-author">{{ article.author }}</a>
    <div class="article-meta-box">
      <span>{{ article.modifyTime }}</span>
      <span class="dot">·</span>
      <span class="edit-btn" @click="edit(article.id)">编辑</span>

      <span class="tag">前端</span>
      <i class="el-icon-plus"></i>

      <el-tag :key="tag" v-for="tag in article.tagList" closable :disable-transitions="false"> {{ tag }} </el-tag>
      <el-input class="input-new-tag" v-if="false" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm"> </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
    <div class="article-title">{{ article.title }}</div>
    <div class="markdown-body" v-html="contentHtml"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';

import showdown from 'showdown';
const converter = new showdown.Converter({ tables: true });

import { ArticleVo, emptyArticle } from '@/core/entities';
import { apigetArticleVoById } from '@/core/apis';

export default defineComponent({
  name: 'article-detail',
  props: { id: { type: String, required: true } },
  setup() {
    const article: ArticleVo = reactive(emptyArticle); // 文章
    const contentHtml = computed(() => converter.makeHtml(article.content)); // 转化后的HTML

    return { article, contentHtml };
  },
  mounted() {
    this.getArticleById();
  },
  methods: {
    // 根据ID获取文章信息
    getArticleById() {
      apigetArticleVoById(this.id).then(res => {
        Object.assign(this.article, res.data);
        // 传递标题
        this.$nextTick(() => {
          // const nodeList = this.$el.querySelectorAll('h2');
          // console.log(nodeList);
          this.$emit(
            'loaded',
            [...document.querySelectorAll('h3')].map(x => x.textContent)
          );
        });
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
.article-detail {
  margin: 2rem 0;
  background-color: #fff;
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

    .tag {
      margin-left: 2rem;
    }
  }

  .article-title {
    margin: 0.67em 0;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.5;
  }
}
</style>
