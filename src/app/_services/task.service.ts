import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(
    private http: HttpClient,
    ) {}

  protected apiUrl = "https://polar-eyrie-44848.herokuapp.com/api/";

  isLoggedIn(){
    return localStorage.getItem('loginToken') !='';
  }

  GetTasks() {
    return this.http.get<any>(
      this.apiUrl+`tasks`
    );
  }
  GetTasksComplete() {
    return this.http.get<any>(
      this.apiUrl+`completed-tasks`
    );
  }
  GetTasksIncomplete() {
    return this.http.get<any>(
      this.apiUrl+`incompleted-tasks`
    );
  }

  CreateTask(data: any){
    return this.http.post<any>(
      this.apiUrl+`tasks`,data
     );
  }

  UpdateTask(id: any, data: any){
    return this.http.put<any>(
      this.apiUrl+`tasks/`+id,data
     );
  }

  GetTaskById(id: any){
    return this.http.get<any>(
      this.apiUrl+`tasks/`+ id
    );
  }

  Login(data: any) {
    return this.http.post<any>(
       this.apiUrl+`login`,data
      );
  }

  GetToken(){
    return localStorage.getItem('loginToken') || '';
  }

  DeleteTask(id: any){
    return this.http.delete<any>(
      this.apiUrl+`tasks/`+ id
    );
  }

  UpdateStatus(id: any){
    return this.http.put<any>(
      this.apiUrl+`tasks/update-status/`+id,id
    );
  }

}


