import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { from, map, Observable } from 'rxjs';

interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const response = next.handle();
    // status code 200 is the default status code for a successful request in HTTP
    // if you want to change the status code, you can do it here
    // return bool true or false based on the response status code
    const statusCode = context.switchToHttp().getResponse().statusCode;

    console.log('statusCode', statusCode);
    var responsJson = null;
    if (statusCode !== 200) {
      responsJson = from(response).pipe(
        map(() => ({
          success: false,
          message: 'Request was not successful',
        })),
      );
    }

    responsJson = from(response).pipe(
      map(data => ({
        success: true,
        message: 'Request was successful',
        data,
      })),
    );

    return responsJson;
  }
}
