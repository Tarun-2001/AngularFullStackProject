import { Component } from '@angular/core';
import { StudentService } from './student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  student: any[] = [];
  firstName = '';
  lastName = '';
  email = '';
  gender = '';
  contact = '';
  id: any;
  searchName:any;

  constructor(private studentService: StudentService, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.studentService.fetchStudents().subscribe({
      next: (data) => {
        this.student = data.students,
        this.showSuccess(data.Message);
      },
      error: (err) => {
        this.showFailure('Failed to fetch data');
      },
    });
  }
  openForm(data: any = null) {
    if (data) {
      this.firstName = data.FirstName;
      this.lastName = data.LastName;
      this.email = data.Email;
      this.contact = data.Contact;
      this.gender = data.Gender;
      this.id = data._id;
    } else {
      this.onClose();
      this.id = null;
    }
    console.log("Hii");
    
  }

  onClose() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.contact = '';
    this.gender = '';
    this.id = null;
  }

  saveForm() {
    const data = {
      FirstName: this.firstName,
      LastName: this.lastName,
      Email: this.email,
      Contact: this.contact,
      Gender: this.gender,
    };
    if (this.id) {
      this.studentService.editStudent(data, this.id).subscribe({
        next: (data) => {
          this.getStudentData();
          this.showSuccess(data.Message);
        },
        error: (err) => this.showFailure('Failed to edit student'),
      });
    } else {
      this.studentService.addStudent(data).subscribe({
        next: (data) => {
          this.getStudentData();
          this.showSuccess(data.Message);
        },
        error: (err) => this.showFailure('Failed to Add student'),
      });
    }
  }
  deleteForm(id: any) {
    this.studentService.deleteStudent(id).subscribe({
      next: (data) => {
        this.getStudentData();
        this.showSuccess(data.Message);
      },
      error: (err) => this.showFailure('Failed to delete student'),
    });
  }
  getStudentData() {
    this.studentService.fetchStudents().subscribe({
      next: (data) => (this.student = data.students),
      error: (err) => {
        this.showFailure('Failed to fetch data');
      },
    });
  }
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showFailure(message: string) {
    this.toastr.error(message);
  }
  searchStudent(data:any) {
   if(data){
    this.studentService.searchStudent(data).subscribe({
      next: (data) => {
        this.student = data.students;
        this.showSuccess(data.Message);
      },
      error: (err) => {
        this.showFailure('Failed to fetch data');
      },
    });
   }
   else this.getStudentData();
  }
}
