import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilterRCP implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { status = null, ...err } = exception.getError() as any;
    const statusCode = status || 500;
    return response.status(statusCode).json({
      status: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...err,
    });
  }
}
