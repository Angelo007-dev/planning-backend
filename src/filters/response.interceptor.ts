import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from "class-transformer";
import * as process from "process";
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const path = request.path;

        /* return next.handle().pipe(
             map((data) => ({
                 success: true,
                 data: instanceToPlain(data) ,
                 timestamp: new Date().toISOString(),
                 path: process.env.BASE_URL+path
             })),
         );
     }*/
        return next.handle().pipe(
            map((data) => ({
                success: true,
                data: {
                    data: instanceToPlain(data),
                },
                timestamp: new Date().toISOString(),
                path: process.env.BASE_URL + path
            })),
        );
    }

}
