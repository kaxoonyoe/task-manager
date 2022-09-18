import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TaskService } from 'src/app/_services/task.service';
import { TaskSetupComponent } from '../task-setup.component';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {

  

  public form: FormGroup;
  today = new Date();
  scheduledDate: any;
  completionDate: any;

  taskId: any;
  task: any;

  completeStatus: any;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateStatusComponent>,
    public taskService: TaskService,
    public fb: FormBuilder,
  ) { 
    this.form = this.fb.group(
      {
        completed_status:['no'],
      }
    );
  }

  ngOnInit(): void {

    this.scheduledDate = this.today;
    this.completionDate = this.today;
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if(this.completeStatus == 'yes'){
      this.taskService.UpdateStatus(this.taskId).subscribe( x => {
        if (x.success == true) {
          alertify.success("Save Successfully");
          this.dialogRef.close()
        } else {
          alertify.error("Save Unsuccessfully");
        }
      });
    }else{
      this.dialogRef.close();
    }
  }

  getTaskById(){
    this.taskService.GetTaskById(this.taskId).subscribe(x => {
      if(x){
        this.task = x.data;
      }
    });
  }

}


