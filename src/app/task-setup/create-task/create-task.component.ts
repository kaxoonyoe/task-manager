import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TaskService } from 'src/app/_services/task.service';
import { TaskSetupComponent } from '../task-setup.component';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  

  public form: FormGroup;
  today = new Date();
  scheduled_date: any;
  completionDate: any;

  taskId: any;
  task: any;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    public taskService: TaskService,
    public fb: FormBuilder,
  ) { 
    this.form = this.fb.group(
      {
        title: ['',Validators.required],
        priority: ['',Validators.required],
        scheduled_date: [null],
      }
    );
  }

  ngOnInit(): void {
    this.scheduled_date = this.today;
    this.completionDate = this.today;
  }
  cancel() {
    this.dialogRef.close();
  }
  save() {
  
    this.taskService.CreateTask(this.form.value).subscribe( x => {
      if (x.success == true) {
        alertify.success("Save Successfully");
        this.dialogRef.close()
      } else {
        alertify.error("Save Unsuccessfully");
      }

    });
  }

  getTaskById(){
    this.taskService.GetTaskById(this.taskId).subscribe(x => {
      if(x){
        this.task = x.data;
      }
    });
  }

}


