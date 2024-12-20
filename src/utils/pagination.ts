export interface IPaginationOptions {
  page?: number;
  limit?: number;
}

export class PaginationHelper {
  static getOptions(options?: IPaginationOptions) {
    const page = Math.max(1, options?.page || 1);
    const limit = Math.min(100, Math.max(1, options?.limit || 10));
    const skip = (page - 1) * limit;

    return { page, limit, skip };
  }
}