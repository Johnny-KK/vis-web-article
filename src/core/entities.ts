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

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IArticle {
  id: string;
  title: string;
  author: string;
  modifyTime: string;
  content: string;
}

// 空的文章实体
export const emptyArticle: IArticle = { id: '', title: '', author: '', modifyTime: '', content: '' };

// 标签实体
export interface TagEntity {
  id: string;
  code: string;
  name: string;
  color: string;
  ord: number | '';
}

// 空的标签实体
export const emptyTag: TagEntity = { id: '', code: '', name: '', color: '', ord: '' };
