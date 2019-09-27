import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode'
import { AuthLoginInfo } from '../models/login-info';
import { SignUpInfo } from '../models/signup-info';
import { JwtResponse } from '../models/jwt-response';
import { User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';
import { SignUpFb } from '../models/sign-up-fb';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  
  private loginUrl = 'http://localhost:8080/api/auth/sign-in';
  private signupUrl = 'http://localhost:8080/api/auth/sign-up';
  private userUrl = 'http://localhost:8080/user';
  private editUrl = 'http://localhost:8080/user/edit-account/change-password'
  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  // getToken() {
    
  //   let currentUser = this.token.getToken();
    
  //   if (currentUser === null) return null;
  //   if (currentUser.accessToken === undefined) return null;
  //   return currentUser.accessToken;
  // }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.token.getToken();
    if (!token) return true;
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
  checked: true;
  isLoggedIn(): boolean {
    // alert(this.isTokenExpired())
    return !this.isTokenExpired();
  }

  getUser(): Observable<User> {
    const decoded = jwt_decode(this.token.getToken());
    const id = decoded.sub;
    return this.http.get<User>(`${this.userUrl}/${id}`, httpOptions);     
  }
   getUserByName(userName: string): Observable<User>{
    
    return this.http.get<User>(`${this.userUrl}/name/${userName}`, httpOptions);
  }

  updatePassword(id: number, newPass: string, oldPass: string) {
    return this.http.put(`${this.editUrl}/${id}`, {newPass: newPass, oldPass: oldPass});
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
  attemptAuthSocial(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.signupUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  signUpFb(info: SignUpFb): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
}
