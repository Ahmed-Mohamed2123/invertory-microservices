import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { RmqContext, RpcException } from "@nestjs/microservices";

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        const ctx = context.switchToRpc().getContext<RmqContext>();

        if (!ctx) {
          return next.handle();
        }

        const channel = ctx.getChannelRef();
        const originalMessage = ctx.getMessage();

        if (!channel || !originalMessage) {
          return next.handle();
        }

        if (error instanceof HttpException) {
          channel.ack(originalMessage);
          return throwError(() => new RpcException(error));
        }

        if (error?.name === "MongoServerError") {
          channel.nack(originalMessage);
          return throwError(() => new RpcException(error));
        }

        channel.ack(originalMessage);
        return throwError(() => error);
      })
    );
  }
}