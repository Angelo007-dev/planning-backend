import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './filters/response.interceptor';
import { ExceptionFilter, Logger, ValidationPipe } from '@nestjs/common';
import { NextFunction } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req: Request, res: Response, next: NextFunction) => {
    // const origin = (req.headers as Record<string, any>).origin || req.headers;
    next();
  });

  const whitelist = [
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3010',
    'http://127.0.0.1:3021',
    'http://192.168.0.36:3021',
    'http://192.168.56.1:3001',
    'http://192.168.56.1:3001',
    'chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld'
  ]
  app.enableCors({
    /*origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',*/
    origin: function (origin, callback) {
      Logger.warn(`Request Origin: ${origin}`, 'RequestLogger');
      callback(null, true);
      /*
            if (!origin || whitelist.indexOf(origin) !== -1) {
              callback(null, true);
            } else {
              console.warn(`Blocked by CORS: ${origin}`);
      
              callback(new UnauthorizedException('Not allowed by CORS "BLOCKED"'));
            }
      */
    }
  });
  app.setGlobalPrefix('api/');

  /* app.use(bodyParser.json({
   limit: '50mb'
 }));*/
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      // whitelist: true,
      // transformOptions: {
      //     enableImplicitConversion: true,
      // },
    }
  ))
  //app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
