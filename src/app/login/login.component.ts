import { Component, OnInit } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  token: any;
  public form: FormGroup;
  toast: any;
  
  constructor(
    public formBuilder: FormBuilder,
    public taskService: TaskService,
    public router: Router,
  ) { 
    this.form = this.formBuilder.group(
      {
        email : ['', [Validators.required]],
        password : ['', [Validators.required]],
      });
  }

  ngOnInit(): void {
    
  }
  login(){
    this.taskService.Login(this.form.value).subscribe( (x)=> {
      if(x.api_token){
        this.token = x.api_token;
        localStorage.setItem('loginToken',this.token);
        alertify.success('Login Successfully!')
        this.router.navigate(["/task"]);
      }
  }, async (error) => {
      const message = error.error.message;
      alertify.error(message) 
    }
    );
    
  }

  

}
