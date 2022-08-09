import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Response } from "express";

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let error = {
      statusCode: 400,
      message: 'Database error.',
      error: 'Bad request'
    };
    switch (exception.code) {
      case 'P2002':
        error = {
          statusCode: 409,
          message: `${exception.meta?.target} must be unique.`,
          error: 'Conflict',
        };
        break;
      case 'P2025':
        console.log(exception);
        error = {
          statusCode: 404,
          message: `${exception.meta?.cause}`,
          error: 'Not found',
        };
        break;
    }

    response
      .status(error.statusCode)
      .json(error);
  }
}