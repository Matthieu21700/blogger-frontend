import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UserService{
    private UserUrl = 'http://localhost:8080/api/users';
     private MailUrl = 'http://localhost:8080/api/users/mail';
    constructor(private http : HttpClient){}
    registerUser(user: any): Observable<any> {
    return this.http.post(`${this.UserUrl}`, user);
  }
  getIdByemail(email: string):Observable<any>{
    return this.http.get(`${this.MailUrl}`,{
      params: { email }
    });
}
}