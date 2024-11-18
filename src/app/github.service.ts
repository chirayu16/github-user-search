import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private baseUrl: string = 'https://api.github.com/users';

  constructor(private http: HttpClient) { }

  searchUser(userName: string): Observable<any> {
    const headers = new HttpHeaders({
      'User-Agent': 'github-user-search'
    });

    return this.http.get<any>(`${this.baseUrl}/${userName}`);
  }

  getUserRepos(
    username: string,
  ): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${username}/repos`);
  }
  

}
