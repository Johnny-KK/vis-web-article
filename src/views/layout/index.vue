<template>
  <header class="layout-header">
    <div class="header-empty"></div>
    <el-input v-model="fuzzy" class="search-box" placeholder="搜索文章" clearable></el-input>
    <el-button class="add-btn" type="primary" @click="add">新增</el-button>
    <div class="header-empty"></div>
  </header>

  <div class="layout-main">
    <div class="layout-main__left">left</div>

    <section class="layout-main__middle">
      <article-list v-if="type === 'list'" @show-detail="showArticleDetail" :fuzzy="fuzzy"></article-list>
      <article-detail v-else :id="type" :fuzzy="fuzzy"></article-detail>
    </section>

    <div class="layout-main__right">right</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import ArticleList from './components/article-list.vue';
import ArticleDetail from './components/article-detail.vue';

export default defineComponent({
  name: 'layout',
  components: { [ArticleList.name]: ArticleList, [ArticleDetail.name]: ArticleDetail },
  props: { type: { type: String, default: 'list' } },
  setup() {
    const fuzzy = ref('');
    return { fuzzy };
  },
  methods: {
    // 显示文章详情
    showArticleDetail(id: string) {
      window.open(`/#/layout/${id}`, '_blank');
    },
    // 新增文章
    add(): void {
      window.open(`/#/article-edit/add/null`, '_blank');
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
