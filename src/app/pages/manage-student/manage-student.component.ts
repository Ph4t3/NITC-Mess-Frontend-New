import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DueStudent } from 'src/app/shared/models/service-response/dues-response.model';
import { DueService } from 'src/app/shared/services/dues.service';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss'],
})
export class ManageStudentComponent implements OnInit {
  students: DueStudent[] = [];

  constructor(
    private dueService: DueService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.getUsers();
    this.route.params.subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit(): void {}

  getUsers() {
    this.dueService.studentList().subscribe(
      (res) => {
        this.students = res;
      },
      (err) => {
        this.snackBar.open('Could not get student list', 'Error', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    );
  }
}
