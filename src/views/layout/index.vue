<template>
  <header class="layout-header">
    <div class="header-empty"></div>
    <img src="@/assets/logo.png" alt="icon" class="logo" @click="goHome" />
    <el-input v-model="fuzzy" class="search-box" placeholder="搜索文章" clearable></el-input>
    <el-button class="add-btn" type="primary" @click="add">新增</el-button>
    <article-tag class="tag-list"></article-tag>
    <!-- <div class="header-empty"></div> -->
  </header>

  <div class="layout-main">
    <div class="layout-main__left">left</div>

    <section class="layout-main__middle">
      <article-list v-if="type === 'list'" @show-detail="showArticleDetail" :fuzzy="fuzzy"></article-list>
      <article-detail v-else :id="type" :fuzzy="fuzzy" @loaded="initTitle"></article-detail>
    </section>

    <section class="layout-main__right">
      <ul class="title-list">
        <li v-for="title in titleList" :key="title">{{ title }}</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import ArticleTag from './components/article-tag.vue';
import ArticleList from './components/article-list.vue';
import ArticleDetail from './components/article-detail.vue';

export default defineComponent({
  name: 'layout',
  components: { [ArticleTag.name]: ArticleTag, [ArticleList.name]: ArticleList, [ArticleDetail.name]: ArticleDetail },
  props: { type: { type: String, default: 'list' } },
  setup() {
    const fuzzy = ref('');
    const titleList: string[] = reactive([]);
    return { fuzzy, titleList };
  },
  mounted() {
    //
  },
  methods: {
    // 回到首页
    goHome() {
      this.$router.push('/');
    },
    // 显示文章详情
    showArticleDetail(id: string) {
      window.open(`/#/layout/${id}`, '_blank');
    },
    // 新增文章
    add(): void {
      window.open(`/#/article-edit/add/null`, '_blank');
    },
    // 初始化标题列表
    initTitle(titleList: string[]) {
      this.titleList.push(...titleList);
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

  .logo {
    height: 32px;
    width: 32px;
    border-radius: 16px;
    cursor: pointer;
  }

  .search-box {
    transition: all 0.5s;
    width: 15rem;
    margin-left: 3rem;

    i {
      cursor: pointer;
    }
  }

  .add-btn {
    margin-left: 3rem;
  }

  .tag-list {
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

.title-list {
  margin: 2rem;
  padding: 0 2rem;

  top: 2rem;
  position: sticky;

  li {
    margin: 0;
    padding: 0;
    font-size: 1.167rem;
    font-weight: 400;
    line-height: 1.3;
    color: #333;
    line-height: 2rem;
    cursor: pointer;
  }

  li:hover {
    background-color: #cacece;
  }
}
</style>
