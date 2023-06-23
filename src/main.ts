import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone';
import { AllExceptionFilter } from './common/filters/allExceptionFilter';

async function bootstrap() {
  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  const PORT = 8000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(8000);
  console.log('AppModule created', `Server listening on port ${PORT}`);
}
bootstrap();
