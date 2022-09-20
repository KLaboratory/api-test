import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerResponse } from 'http';
import { ResponseDto } from '../dtos/response.dto';

/**
 * Interceptor to response object
 *
 * @author bcueva
 * @version 1.0.0
 */
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T> | T>
{
  /**
   * Intercep response
   *
   * @param context Context execution
   * @param next Middleware
   * @returns Response
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T> | T> {
    return next.handle().pipe(
      map((data: T) => {
        const response = context.switchToHttp().getResponse<ServerResponse>();
        if (
          response.hasHeader('Content-Type') &&
          response.getHeader('Content-Type') !== 'application/json'
        ) {
          return data;
        }
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: null,
          data,
        } as ResponseDto<T>;
      }),
    );
  }
}
