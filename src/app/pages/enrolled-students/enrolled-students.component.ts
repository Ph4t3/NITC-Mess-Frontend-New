import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Student } from 'src/app/shared/models/service-response/admin-response.model';
import { User } from 'src/app/shared/models/service-response/auth-response.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DueService } from 'src/app/shared/services/dues.service';

@Component({
  selector: 'app-enrolled-students',
  templateUrl: './enrolled-students.component.html',
  styleUrls: ['./enrolled-students.component.scss'],
})
export class EnrolledStudentsComponent implements OnInit {
  gridApi!: any;
  gridColumnApi!: any;
  user!: User;
  columnDefs = [
    {
      field: 'rollNumber',
      sortable: true,
      filter: true,
      floatingFilter: true,
      minWidth: 200,
    },
    {
      field: 'name',
      sortable: true,
      filter: true,
      floatingFilter: true,
      minWidth: 200,
    },
    {
      field: 'email',
      sortable: true,
      filter: true,
      floatingFilter: true,
      minWidth: 200,
    },
    {
      field: 'roomNumber',
      sortable: true,
      filter: true,
      floatingFilter: true,
      minWidth: 200,
    },
    {
      field: 'total',
      headerName: 'Total Dues',
      sortable: true,
      filter: true,
      floatingFilter: true,
      minWidth: 200,
    },
  ];

  rowData: Student[] = [];

  constructor(
    private authService: AuthService,
    private service: DueService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.getUsers();
    let temp = this.authService.getUserDetails();
    if (temp != null) {
      this.user = temp;
    }
  }

  ngOnInit(): void {}

  getUsers() {
    this.service.studentList().subscribe(
      (res) => {
        this.rowData = res;
      },
      (err) => {
        this.snackBar.open(err.error.errors.message, 'Error', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    );
  }

  onRowClick(e: any) {
    this.router.navigate(['/manage-student', e.data.rollNumber]);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
}
