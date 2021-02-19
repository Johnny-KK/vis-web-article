<template>
  <div>
    <el-tag v-for="item in tag.list" :key="item.id" :effect="isSelected(item.name)" @click="changeSelected(item.name)">{{ item.name }}</el-tag>

    <el-tag @click="showNewTagAdd = true">New Tag</el-tag>

    <el-dialog title="新增TAG" v-model="showNewTagAdd" width="30%" :destroy-on-close="true">
      <el-form label-width="80px" :model="newTag" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="newTag.name"></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-color-picker v-model="newTag.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="排序" prop="ord">
          <el-input v-model="newTag.ord" type="number"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button type="primary" @click="handleInputConfirm">立即创建</el-button>
          <el-button @click="showNewTagAdd = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import { TagVo, emptyTag } from '@/core/entities';
import { apiQueryTagList, apiAddTag } from '@/core/apis';

export default defineComponent({
  name: 'article-tag',
  setup() {
    const tag: { list: TagVo[] } = reactive({ list: [] });
    const selectedTags: string[] = reactive([]);
    const newTag: TagVo = reactive(emptyTag);
    const showNewTagAdd = ref(false);

    const rules = reactive({
      name: [{ required: true }]
    });

    return { tag, selectedTags, newTag, showNewTagAdd, rules };
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
          this.showNewTagAdd = false;
        } else {
          console.log(res.msg);
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
</style>
