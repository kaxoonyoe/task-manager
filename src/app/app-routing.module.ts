import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { CreateTaskComponent } from './task-setup/create-task/create-task.component';
import { TaskSetupComponent } from './task-setup/task-setup.component';

const routes: Routes = [
  { path:'login',component:LoginComponent},
  { path:'task',component:TaskSetupComponent , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
