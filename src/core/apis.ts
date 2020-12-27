import { ApiResponse, IArticle, TagEntity } from '@/core/entities';
import http from './axios';

/**
 * 条件获取文章列表
 *
 * @param fuzzy 模糊搜索
 * @param page 页数
 * @param rows 行数
 */
export function apiGetArticleList(fuzzy: string, page: number, rows: number): Promise<ApiResponse<IArticle[]>> {
  return http.get<IArticle[]>('/article/getArticleList', { params: { fuzzy, page, rows } });
}

/**
 * 根据ID获取文章信息
 *
 * @param id ID
 */
export function apiGetArticleById(id: string): Promise<ApiResponse<IArticle>> {
  return http.get<IArticle>('/article/getArticleById', { params: { id } });
}

/**
 * 新增文章
 */
export function apiAddArticle(form: IArticle): Promise<ApiResponse<IArticle>> {
  return http.post<IArticle>('/article/addArticle', form);
}

/**
 * 更新文章
 */
export function apiUpdateArticle(form: IArticle): Promise<ApiResponse<IArticle>> {
  return http.post<IArticle>('/article/updateArticle', form);
}

// ==========================================

/**
 * 条件查询标签列表
 */
export function apiQueryTagList(): Promise<ApiResponse<TagEntity[]>> {
  return http.get<TagEntity[]>('/tag/queryTagList');
}

/**
 * 新增标签
 */
export function apiAddTag(form: TagEntity): Promise<ApiResponse<TagEntity>> {
  return http.post<TagEntity>('/tag/addTag', form);
}
