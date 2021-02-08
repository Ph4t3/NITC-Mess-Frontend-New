import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DueStudent } from 'src/app/shared/models/service-response/dues-response.model';
import { DueService } from 'src/app/shared/services/dues.service';

declare interface DailyDue {
  date: string;
  dailyCharge: number;
  extra: number;
}

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss'],
})
export class ManageStudentComponent implements OnInit {
  students: DueStudent[] = [];
  filteredStudents!: Observable<DueStudent[]>;
  rowData: DailyDue[] = [];

  gridApi!: any;
  gridColumnApi!: any;
  columnDefs = [
    {
      field: 'date',
      sortable: true,
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'dailyCharge',
      sortable: true,
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'extra',
      sortable: true,
      minWidth: 200,
      flex: 1,
    },
  ];

  studentDetails: FormGroup = new FormGroup({
    rollNumber: new FormControl(),
    name: new FormControl(),
    hostelName: new FormControl(),
    roomNumber: new FormControl(),
    extra: new FormControl(),
    total: new FormControl(),
  });

  messCutForm: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private dueService: DueService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.getUsers();
  }

  ngOnInit(): void {
    this.filteredStudents = this.studentDetails
      .get('rollNumber')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterStudents(value))
      );
  }

  changeStudent(rollNumber: any) {
    this.students.forEach((student) => {
      if (student.rollNumber === rollNumber) {
        this.studentDetails.patchValue(student);
        this.getDues();
      }
    });
  }

  private _filterStudents(value: string): DueStudent[] {
    const filterValue = value.toLowerCase();

    return this.students.filter((option) =>
      option.rollNumber.toLowerCase().includes(filterValue)
    );
  }

  getUsers() {
    this.dueService.studentList().subscribe(
      (res) => {
        this.students = res;
        this.route.params.subscribe((res) => {
          if (res.hasOwnProperty('id')) {
            this.changeStudent(res.id);
          }
        });
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

  getDues() {
    let rollNumber = this.studentDetails.get('rollNumber')!.value;
    if (!rollNumber || rollNumber === '') {
      this.rowData = [];
      this.gridApi.setRowData(this.rowData);
    } else {
      this.dueService.getDues({ rollNumber }).subscribe(
        (res) => {
          let dues: {
            [key: number]: { dailyCharge: number; extra: number };
          } = {};
          let extra = 0;

          res.forEach((item) => {
            let date = new Date(item.date).setHours(0, 0, 0, 0);
            if (!dues.hasOwnProperty(date))
              dues[date] = { dailyCharge: 0, extra: 0 };

            if (item.message === 'DailyCharge') {
              dues[date].dailyCharge += item.amount;
            } else {
              dues[date].extra += item.amount;
              extra += item.amount;
            }
          });

          this.studentDetails.patchValue({ extra });

          Object.entries(dues).forEach((item) => {
            this.rowData.push({
              date: new Date(parseInt(item[0])).toLocaleDateString('en-IN'),
              ...item[1],
            });
          });
          this.gridApi.setRowData(this.rowData);
        },
        (err) => {
          this.snackBar.open('Could not get student dues', 'Error', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //params.api.sizeColumnsToFit();
    //params.api.autoSizeColumns();
  }
}
