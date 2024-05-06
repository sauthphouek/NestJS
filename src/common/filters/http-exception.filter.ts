// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
// } from '@nestjs/common';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     const status = exception.getStatus();

//     return response.status(status).json({
//       success: false,
//       message: exception.message,
//       data: null,
//     });
//   }
// }
import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { BaseExceptionFilter } from '@nestjs/core';

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  private logger = new MyLoggerService(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const myResponse: MyResponseObj = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      myResponse.statusCode = exception.getStatus();
      myResponse.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myResponse.statusCode = HttpStatus.BAD_REQUEST;
      myResponse.response = exception.message;
    } else {
      this.logger.error(exception.message, exception.stack);
    }

    response.status(myResponse.statusCode).json(myResponse);
    this.logger.error(HttpExceptionFilter.name, JSON.stringify(myResponse));

    super.catch(exception, host);
  }
}
