import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private baseUrl: string = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  searchUser(userName: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userName}`);
  }

  getUserRepos(username: string, page:number, perPage: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${username}/repos?page=${page}&per_page=${perPage}`);
  }
}
