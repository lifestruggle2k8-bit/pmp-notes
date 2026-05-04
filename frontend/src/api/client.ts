import axios, { AxiosInstance } from 'axios';
import { Card, ReviewInput } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const client: AxiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 添加認證 token 到請求頭
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 處理響應錯誤
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 清除 token，重定向到登錄
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const cardAPI = {
  /**
   * 取得所有卡片
   */
  getAll: async () => {
    const response = await client.get<Card[]>('/cards');
    return response.data;
  },

  /**
   * 取得今日待複習卡片
   */
  getToday: async () => {
    const response = await client.get<Card[]>('/cards/today');
    return response.data;
  },

  /**
   * 創建新卡片
   */
  create: async (data: Partial<Card>) => {
    const response = await client.post<Card>('/cards', data);
    return response.data;
  },

  /**
   * 更新卡片
   */
  update: async (id: string, data: Partial<Card>) => {
    const response = await client.put<Card>(`/cards/${id}`, data);
    return response.data;
  },

  /**
   * 刪除卡片
   */
  delete: async (id: string) => {
    await client.delete(`/cards/${id}`);
    return { success: true };
  }
};

export const reviewAPI = {
  /**
   * 提交複習結果
   */
  submit: async (data: ReviewInput) => {
    const response = await client.post<{
      review: any;
      card: Card;
    }>('/review/submit', data);
    return response.data;
  },

  /**
   * 取得卡片的複習歷史
   */
  getHistory: async (cardId: string) => {
    const response = await client.get(`/review/history/${cardId}`);
    return response.data;
  },

  /**
   * 取得複習統計
   */
  getStats: async () => {
    const response = await client.get<{
      todayReviews: number;
      totalReviews: number;
      correctReviews: number;
      accuracy: number;
    }>('/review/stats');
    return response.data;
  }
};

export default client;
