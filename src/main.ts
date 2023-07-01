import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone';
import { AllExceptionFilter } from './common/filters/allExceptionFilter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  const PORT = 8000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Controlador condominial API')
    .setDescription(
      'API para controle de condomínios e moradores de condomínios residenciais e comerciais.',
    )
    .setVersion('0.0.1')
    .addServer(`http://localhost:${PORT}/api/v1`)
    .addTag('users')
    .addTag('news')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(8000);
  console.log('AppModule created', `Server listening on port ${PORT}`);
}
bootstrap();
