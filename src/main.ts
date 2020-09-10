import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(cookieParser('wtf'))
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
