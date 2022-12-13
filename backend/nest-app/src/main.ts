import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { JwtMiddlewareFn } from './jwt/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(JwtMiddlewareFn);
  await app.listen(4000);
}
bootstrap();
