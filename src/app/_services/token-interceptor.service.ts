import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let taskService = this.injector.get(TaskService)
    let token = req.clone({
      setHeaders:{
        Authorization: 'Bearer ' + taskService.GetToken()
      }
    })
    return next.handle(token);
  }
  
  constructor(
    private injector: Injector,
  ) { }
}
