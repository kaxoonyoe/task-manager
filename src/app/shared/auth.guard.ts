import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskService } from '../_services/task.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(
    private taskService: TaskService,
    public router: Router,
  ) {}


  canActivate(){
    if(this.taskService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(["login"]);
      return false;
    }
  }
  
}
