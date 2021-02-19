import { ApiResponse, ArticleTagVo, ArticleVo, TagVo } from '@/core/entities';
import http from './axios';

/**
 * 条件获取文章列表
 *
 * @param fuzzy 模糊搜索
 * @param page 页数
 * @param rows 行数
 */
export function apiGetArticleList(fuzzy: string, page: number, rows: number): Promise<ApiResponse<ArticleVo[]>> {
  return http.get<ArticleVo[]>('/article/getArticleList', { params: { fuzzy, page, rows } });
}

/**
 * 根据ID获取文章信息
 *
 * @param id ID
 */
export function apiGetArticleById(id: string): Promise<ApiResponse<ArticleVo>> {
  return http.get<ArticleVo>('/article/getArticleById', { params: { id } });
}

/**
 * 根据ID获取文章--vo
 */
export function apigetArticleVoById(id: string): Promise<ApiResponse<ArticleVo>> {
  return http.get('article/getArticleVoById', { params: { id } });
}

/**
 * 新增文章
 */
export function apiAddArticle(form: ArticleVo): Promise<ApiResponse<ArticleVo>> {
  return http.post<ArticleVo>('/article/addArticle', form);
}

/**
 * 更新文章
 */
export function apiUpdateArticle(form: ArticleVo): Promise<ApiResponse<ArticleVo>> {
  return http.post<ArticleVo>('/article/updateArticle', form);
}

/** ========================================== */

/**
 * 条件查询标签列表
 */
export function apiQueryTagList(): Promise<ApiResponse<TagVo[]>> {
  return http.get('/tag/queryTagList');
}

/**
 * 新增标签
 */
export function apiAddTag(form: TagVo): Promise<ApiResponse<TagVo>> {
  return http.post('/tag/addTag', form);
}

/** ========================================== */

/**
 * 指定文章新增标签
 */
export function apiAddArticleTag(form: ArticleTagVo): Promise<ApiResponse<ArticleTagVo>> {
  return http.post('ArticleTag/addArticleTag', form);
}
