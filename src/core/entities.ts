/** 标准后台请求返回接口 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  msg: string;
}

/** 分页后台请求返回接口 */
export interface ApiPageResponse<T> extends ApiResponse<T> {
  page: number;
  rows: number;
}

/** 文章vo */
export interface ArticleVo {
  id: string; // 文章主键
  title: string; // 文章标题
  author: string; // 文章作者
  content: string; // 文章内容
  modifyTime: string; // 上次修改时间
  tagList?: string[]; // 文章标签名列表
}

// 空的文章vo
export const emptyArticle: ArticleVo = { id: '', title: '', author: '', modifyTime: '', content: '' };

// 标签vo
export interface TagVo {
  id: string; // TAG主键
  code: string; // TAG编码
  name: string; // TAG名称
  color: string; // TAG颜色
  ord: number | ''; // TAG排序
}

// 空的标签vo
export const emptyTag: TagVo = { id: '', code: '', name: '', color: '', ord: '' };

// 文章标签对应vo
export interface ArticleTagVo {
  id: string; // 主键
  articleId: string; // 文章ID
  tagId: string; // TAG ID
  tagName: string; // TAG名称
}
