import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

interface PostgresDriverError {
  code?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { statusCode, message, error } = this.resolveException(exception);

    if (Number(statusCode) >= 500) {
      this.logger.error(
        exception instanceof Error ? exception.message : 'Unknown error',
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error,
    });
  }

  private resolveException(exception: unknown): {
    statusCode: number;
    message: string | string[];
    error: string;
  } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        return {
          statusCode: status,
          message: exceptionResponse,
          error: HttpStatus[status] ?? 'Error',
        };
      }

      const body = exceptionResponse as {
        message?: string | string[];
        error?: string;
      };

      return {
        statusCode: status,
        message: body.message ?? exception.message,
        error: body.error ?? HttpStatus[status] ?? 'Error',
      };
    }

    if (exception instanceof QueryFailedError) {
      const driverError = exception.driverError as PostgresDriverError;

      if (driverError.code === '23505') {
        return {
          statusCode: HttpStatus.CONFLICT,
          message: 'Dữ liệu đã tồn tại trong hệ thống',
          error: 'Conflict',
        };
      }
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Lỗi hệ thống nội bộ',
      error: 'Internal Server Error',
    };
  }
}
