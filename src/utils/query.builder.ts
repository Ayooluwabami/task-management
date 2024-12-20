import { logger } from './logger';

export class QueryBuilder {
  static buildTaskQuery(id: string | number) {
    const query = typeof id === 'string' ? { _id: id } : { taskId: id };
    logger.debug('Built task query', { query });
    return query;
  }

  static buildStatusQuery(status?: string) {
    const query = status ? { status } : {};
    logger.debug('Built status query', { query });
    return query;
  }
}