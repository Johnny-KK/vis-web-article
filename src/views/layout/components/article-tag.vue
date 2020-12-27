<template>
  <div>
    <el-tag v-for="item in tag.list" :key="item.id" :effect="isSelected(item.name)" @click="changeSelected(item.name)">{{ item.name }}</el-tag>
    <el-input class="input-new-tag" v-if="showNewTagAdd" v-model="newTag.name" @keyup.enter="handleInputConfirm"></el-input>
    <el-button v-else class="button-new-tag" @click="showNewTagAdd = true">+ New Tag</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import { TagEntity, emptyTag } from '@/core/entities';
import { apiQueryTagList, apiAddTag } from '@/core/apis';

export default defineComponent({
  name: 'article-tag',
  setup() {
    const tag: { list: TagEntity[] } = reactive({ list: [] });
    const selectedTags: string[] = reactive([]);
    const newTag: TagEntity = reactive(emptyTag);
    const showNewTagAdd = ref(false);
    return { tag, selectedTags, newTag, showNewTagAdd };
  },
  created() {
    this.queryTagList();
  },
  methods: {
    // 条件查询标签列表
    queryTagList() {
      apiQueryTagList().then(res => {
        if (res.success) {
          this.tag.list = res.data;
        }
      });
    },
    // 切换标签是否选中
    changeSelected(name: string) {
      const index = this.selectedTags.findIndex(x => x === name);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(name);
      }
    },
    //
    isSelected(name: string) {
      return this.selectedTags.some(x => x === name) ? 'dark' : 'plain';
    },
    // 新增标签
    handleInputConfirm() {
      apiAddTag(this.newTag).then(res => {
        if (res.success) {
          this.queryTagList();
          Object.assign(this.newTag, emptyTag);
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.el-tag {
  cursor: pointer;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
