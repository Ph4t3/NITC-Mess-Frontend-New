import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DueStudent } from 'src/app/shared/models/service-response/dues-response.model';
import { DueService } from 'src/app/shared/services/dues.service';

@Component({
  selector: 'app-add-due',
  templateUrl: './add-due.component.html',
  styleUrls: ['./add-due.component.scss'],
})
export class AddDueComponent implements OnInit {
  addDueForm: FormGroup = new FormGroup({
    rollNumber: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    message: new FormControl(),
    date: new FormControl(new Date()),
  });
  students: DueStudent[] = [];
  filteredStudents: Observable<DueStudent[]>;
  today = new Date();

  constructor(private dueService: DueService, private snackBar: MatSnackBar) {
    this.getUsers();
    this.filteredStudents = this.addDueForm
      .get('rollNumber')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterStudents(value))
      );
  }

  ngOnInit(): void {}

  onSubmit() {
    let data = this.addDueForm.value;
    data.date = new Date(data.date).getTime();
    if(data.message === null) 
        data.message = 'NIL';
    if (this.checkRollNo(data.rollNumber)) {
      if (this.addDueForm.valid) {
        this.dueService.add(data).subscribe(
          (res) => {
            console.log(res);
            this.snackBar.open('Due Added', 'Success', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          },
          (err) => {
            this.snackBar.open('Could not add due', 'Error', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
        );
      }
    } else {
      this.snackBar.open('User not present in mess', 'Error', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
  }

  checkRollNo(roll: string) {
    let data = this.students.find((item) => item.rollNumber === roll);
    return !!data;
  }

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

  private _filterStudents(value: string): DueStudent[] {
    const filterValue = value.toLowerCase();

    return this.students.filter((option) =>
      option.rollNumber.toLowerCase().includes(filterValue)
    );
  }
}
