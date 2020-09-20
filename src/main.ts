import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:9000',
    credentials: true
  })
  app.use(cookieParser('wtf'))
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
