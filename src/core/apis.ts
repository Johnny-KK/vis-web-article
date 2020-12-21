import { ApiResponse } from '@/core/entities';

export function apiGetArticleList<T>(): Promise<ApiResponse<T>> {
  return Promise.resolve({ data: {} as T, success: true, msg: '' });
}
