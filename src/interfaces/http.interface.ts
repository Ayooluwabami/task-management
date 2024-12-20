export interface IHttpResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: string[];
}

export interface IPaginatedResponse<T> extends IHttpResponse {
  data: T[];
  total: number;
  page: number;
  limit: number;
}