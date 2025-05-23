import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UserService{
    private UserUrl = 'http://localhost:8080/api/users';
    private MailUrl = 'http://localhost:8080/api/usersmail';
    constructor(private http : HttpClient){}
    registerUser(user: any): Observable<any> {
    return this.http.post(`${this.UserUrl}`, user);
  }
  getIdByemail(id: any):Observable<any>{
    return this.http.get(`${this.UserUrl}`,id);
}
}