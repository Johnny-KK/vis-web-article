import { ApiResponse, IArticle } from '@/core/entities';
import http from './axios';

/**
 * 条件获取文章列表
 *
 * @param page 页数
 * @param rows 行数
 */
export function apiGetArticleList<T>(page: number, rows: number): Promise<ApiResponse<T[]>> {
  return http.get<T[]>('/article/getArticleList', { params: { page, rows } });
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
