<template>
  <div class="article-edit">
    <header class="article-header">
      <el-input class="title-input" v-model="article.title" placeholder="请输入标题"></el-input>
      <el-button class="add-btn" type="primary" @click="back">返回</el-button>
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
import { computed, defineComponent, reactive, ref } from 'vue';

import { ElMessage } from 'element-plus';

import showdown from 'showdown';
const converter = new showdown.Converter({ tables: true });

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
    // 文章
    const article: IArticle = reactive(emptyArticle);
    // 文章对应markdown渲染结果
    const contentHtml = computed(() => converter.makeHtml(article.content));
    // 是否更新
    const needUpdate = ref(false);
    const isUpdateing = ref(false);
    return { article, contentHtml, needUpdate, isUpdateing };
  },
  watch: {
    // 文章内容发生变化时 需要自动保存
    'article.content'() {
      this.needUpdate = true;
    }
  },
  created() {
    if (this.type === 'add') {
      this.article.author = loginUser.username;
    } else {
      this.getArticleById();
    }

    setInterval(() => {
      if (this.needUpdate === true) {
        Promise.resolve(this.addOrupdateArticle()).then(() => (this.needUpdate = false));
      }
    }, 5000);
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
      this.isUpdateing = true;
      if (this.type === 'add') {
        apiAddArticle(this.article)
          .then(res => {
            if (res.success) {
              this.$router.replace(`/article-edit/update/${res.data.id}`);
            }
          })
          .finally(() => {
            this.isUpdateing = false;
          });
      } else {
        apiUpdateArticle(this.article)
          .then(res => {
            if (res.success == true) {
              this.getArticleById();
            } else {
              ElMessage.error(res.msg);
            }
          })
          .finally(() => {
            this.isUpdateing = false;
          });
      }
    },
    // 返回列表
    back() {
      // TODO 返回之前检查是否有需要保存的内容
      this.$router.replace(`/layout/${this.id}`);
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

    /deep/.el-textarea__inner {
      background-color: inherit;
    }
  }
}

/deep/ textarea {
  border: none;
}
</style>
