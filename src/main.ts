import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { envs } from './config';
import { ExceptionFilterRCP } from './common';

async function bootstrap() {
  const logger = new Logger('Main-Gateway')
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new ExceptionFilterRCP());
  await app.listen(envs.port);
  logger.log(`Gateway listen in port ${envs.port}`);
}
bootstrap().catch((err) => {
    console.error('Error starting the app:', err);
    process.exit(1);
});
