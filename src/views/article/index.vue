<template>
  <div class="article-header">header</div>

  <div class="article-main">
    <div class="article-main__left">left</div>
    <div class="article-main__middle">
    </div>
    <div class="article-main__right">right</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'vis-article'
})
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
    // text-align: center;
  }

  &__right {
    flex: 0 0 20%;
  }
}
</style>
