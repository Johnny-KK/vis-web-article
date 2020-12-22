<template>
  <div>
    {{ title }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'article-item',
  props: { title: { type: String, required: true, default: '' } }
});
</script>
