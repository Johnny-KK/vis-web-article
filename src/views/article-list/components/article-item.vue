<template>
  <li class="article-item">
    <div class="article-item__head">
      <span>{{ author }}</span>
      <span>5小时前</span>
      <span>前端</span>
    </div>
    <div class="article-item__title">{{ title }}</div>
    <ul class="article-item__foot">
      <li>
        <i class="el-icon-view"></i>
        <span>18</span>
      </li>

      <li class="share-item">掘金</li>
      <li class="share-item">知乎</li>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'article-item',
  props: { title: { type: String, required: true, default: '' }, author: { type: String, required: true, default: '' } }
});
</script>

<style lang="scss" scoped>
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
