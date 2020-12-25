<template>
  <div class="article-edit">
    <header class="article-header">
      <el-input class="title-input" v-model="article.title" placeholder="请输入标题"></el-input>
      <a class="save-btn" @click="addOrupdateArticle">保存</a>
    </header>

    <div class="article-main">
      <section class="edit">
        <el-scrollbar style="height: 100%;">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="article.content"></el-input>
        </el-scrollbar>
      </section>
      <section class="view">
        <el-scrollbar style="height: 100%;">
          <span class="markdown-body" v-html="contentHtml"></span>
        </el-scrollbar>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import { ElMessage } from 'element-plus';

import showdown from 'showdown';
const converter = new showdown.Converter();

import { IArticle, emptyArticle } from '@/core/entities';
import { apiGetArticleById, apiAddArticle, apiUpdateArticle } from '@/core/apis';

const loginUser = { username: 'Johnny' };

export default defineComponent({
  name: 'article-edit',
  props: {
    type: { type: String, default: 'add' }, // 类型: add(新增)/update(更新)
    id: { type: String, required: true, default: '' }
  },
  setup() {
    const article: IArticle = reactive(emptyArticle);
    return { article };
  },
  computed: {
    contentHtml(): string {
      return converter.makeHtml(this.article.content);
    }
  },
  created() {
    if (this.type === 'add') {
      this.article.author = loginUser.username;
    } else {
      this.getArticleById();
    }
  },
  methods: {
    // 根据ID获取文章信息
    getArticleById() {
      apiGetArticleById(this.id).then(res => {
        Object.assign(this.article, res.data);
      });
    },
    // 新增、更新文章
    addOrupdateArticle() {
      if (this.type === 'add') {
        apiAddArticle(this.article).then(res => {
          if (res.success) {
            this.$router.replace(`/article-edit/update/${res.data.id}`);
          }
        });
      } else {
        apiUpdateArticle(this.article).then(res => {
          if (res.success == true) {
            this.getArticleById();
          } else {
            ElMessage.error(res.msg);
          }
        });
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.article-edit {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .article-header {
    flex: 0 0 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    border-bottom: 1px solid #ddd;

    .title-input {
      width: 50%;
    }

    /deep/ .title-input > input {
      margin: 0;
      padding: 0;
      font-size: 2rem;
      font-weight: 700;
      color: #000;
      border: none;
      outline: none;
    }

    .save-btn {
      cursor: pointer;
      font-size: 1.334rem;
      white-space: nowrap;
      color: #007fff;
      user-select: none;
    }
  }

  .article-main {
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    .edit {
      background-color: #f8f9fa;
      border-right: 1px solid #ddd;
    }

    .view {
      background-color: #fff;
    }

    .edit,
    .view {
      height: 100%;
      flex: 0 0 50%;
      overflow: auto;
    }
  }
}

/deep/ textarea {
  border: none;
}
</style>
