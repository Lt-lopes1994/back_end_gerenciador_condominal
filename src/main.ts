import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/allExceptionFilter';

async function bootstrap() {
  const PORT = 8000;

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Controlador condominial API')
    .setDescription(
      'API para controle de condomínios e moradores de condomínios residenciais e comerciais.',
    )
    .setVersion('0.0.1')
    .addServer(`${PORT}/api/v1`)
    .addTag('users')
    .addTag('news')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors();
  app.setGlobalPrefix('/api/v1');
  await app.listen(PORT);
  console.log('AppModule created', `Server listening on port ${PORT}`);
}
bootstrap();
