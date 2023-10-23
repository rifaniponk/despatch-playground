import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-hasura-admin-secret':
            'QG5eK8heNXvKxrqx6nsMFRxMBTMp3Q60inTO9XJO2sr885wwE0Ojq2jjIxXV81Hd',
        },
      })
    );
  }
}
