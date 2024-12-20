
export class ResponseFormatter {
  public static success(data: any, message?: string) {
    return {
      success: true,
      message: message || 'Request successful',
      data,
    };
  }

  public static error(message: string, data?: any) {
    return {
      success: false,
      message,
      data,
    };
  }

  public static paginated(data: any, total: number, page: number, limit: number) {
    return {
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
      },
    };
  }

  public static validationErrors(errors: any) {
    return {
      success: false,
      message: 'Validation errors',
      errors,
    };
  }
}