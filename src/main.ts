import { app } from './app.module';
import { logger } from './utils/logger';

const port = process.env.PORT || '';

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});