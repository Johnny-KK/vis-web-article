<template>
  <div class="article-edit">
    <header class="article-header">
      <el-input v-model="article.title" placeholder="请输入标题" style="width: auto;"></el-input>
      <a class="save-btn" @click="addOrupdateArticle">保存</a>
    </header>

    <div class="article-main">
      <section class="edit">
        <el-input type="textarea" autosize placeholder="请输入内容" v-model="article.content"></el-input>
      </section>
      <section class="view"><span v-html="contentHtml"></span></section>
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
.article-header {
  background-color: aquamarine;

  .save-btn {
    cursor: pointer;
  }
}

.article-main {
  display: flex;
  flex-direction: row;

  .edit,
  .view {
    flex: 0 0 50%;
    border: 1px solid gainsboro;
    padding: 2rem;
  }
}
</style>
