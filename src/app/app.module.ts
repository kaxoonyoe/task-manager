import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { TaskSetupComponent } from './task-setup/task-setup.component';
import { SharedModule } from './shared/shared.module';
import { CreateTaskComponent } from './task-setup/create-task/create-task.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { EditTaskComponent } from './task-setup/edit-task/edit-task.component';
import { UpdateStatusComponent } from './task-setup/update-status/update-status.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskSetupComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
