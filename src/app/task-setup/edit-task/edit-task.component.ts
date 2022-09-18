import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TaskService } from 'src/app/_services/task.service';
import { TaskSetupComponent } from '../task-setup.component';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  

  public form: FormGroup;
  today = new Date();
  scheduled_date: any;
  completionDate: any;

  taskId: any;
  task: any;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    public taskService: TaskService,
    public fb: FormBuilder,
  ) { 
    this.form = this.fb.group(
      {
        title: ['',Validators.required],
        priority: ['',Validators.required],
        scheduled_date: [''],
      }
    );
  }

  ngOnInit(): void {
    if(this.data != ''){
      this.taskId = this.data;
      this.getTaskById();
    }
    // this.scheduled_date = this.today;
  }
  cancel() {
    this.dialogRef.close();
  }
  save() {
  
    this.taskService.UpdateTask(this.taskId ,this.form.value).subscribe( x => {
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
        this.form.controls['title'].setValue(x.data.title);
        this.form.controls['priority'].setValue(x.data.priority);
        this.form.controls['scheduled_date'].setValue(x.data.scheduled_date);
        this.scheduled_date = x.data.scheduled_date;
      }
    });
  }

}


