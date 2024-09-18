import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/student/';

  constructor(private http: HttpClient) {}

  fetchStudents(): Observable<any> {
    return this.http.get(this.apiUrl+'fetchStudents');
  }
  addStudent(data:any): Observable<any> {
    return this.http.post(this.apiUrl+'createStudent', data);
  }
  editStudent(data:any,id:any): Observable<any> {
    return this.http.put(this.apiUrl+`editStudent/${id}`, data);
  }
  deleteStudent(id:any): Observable<any> {
    return this.http.delete(this.apiUrl+`deleteStudent/${id}`);
  }
  searchStudent(data:any): Observable<any> {
    return this.http.get(this.apiUrl+`searchStudent?name=${data}`);
  }
}
