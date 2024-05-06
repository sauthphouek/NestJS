import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  /// cors => Cross-Origin Resource Sharing is a security feature that allows us to make requests from one domain to another domain.
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
