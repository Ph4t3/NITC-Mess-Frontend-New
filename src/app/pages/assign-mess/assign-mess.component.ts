import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonRendererComponent } from 'src/app/shared/components/ButtonRenderer.component';
import { Student } from 'src/app/shared/models/service-response/admin-response.model';
import { User } from 'src/app/shared/models/service-response/auth-response.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-assign-mess',
  templateUrl: './assign-mess.component.html',
  styleUrls: ['./assign-mess.component.scss'],
})
export class AssignMessComponent implements OnInit {
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
    { field: 'action', cellRenderer: 'buttonRenderer', colId: 'action' },
  ];

  context = { componentParent: this };

  frameworkComponents = {
    buttonRenderer: ButtonRendererComponent,
  };

  rowData: Student[] = [];

  constructor(
    private authService: AuthService,
    private service: AdminService,
    private snackBar: MatSnackBar
  ) {
    this.getUsers();
    let temp = this.authService.getUserDetails();
    if (temp != null) {
      this.user = temp;
    }
  }

  ngOnInit(): void {}

  getUsers() {
    this.service.getUsersWithoutMess().subscribe(
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

  assignMess(rollNumber: string) {
    this.service.assignMess({ rollNumber, mess: this.user.mess }).subscribe(
      (res) => {
        this.snackBar.open('Student Added', 'Success', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.getUsers();
      },
      (err) => {
        this.snackBar.open('Could not add Student to Mess', 'Error', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    );
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
}
