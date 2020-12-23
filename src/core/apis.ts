import { ApiResponse } from '@/core/entities';
import http from './axios';

/**
 * 条件获取文章列表
 *
 * @param page 页数
 * @param rows 行数
 */
export function apiGetArticleList<T>(page: number, rows: number): Promise<ApiResponse<T[]>> {
  return http.get<T[]>('/aricle/getArticleList', { params: { page, rows } });
}

/**
 * 根据ID获取文章内容
 *
 * @param id ID
 */
export function apiGetArticleById<T>(id: number): Promise<ApiResponse<T>> {
  return http.get('/article/getArticleById', { params: { id } });
}
