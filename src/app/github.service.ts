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

    const options = {
      headers: headers
    };

    return this.http.get<any>(`${this.baseUrl}/${userName}`, options);
  }

  getUserRepos(
    username: string,
    page: number,
    perPage: number
  ): Observable<any> {
    const params = {
      page: page,
      per_page: perPage,
    };
  
    // Add the User-Agent header
    const headers = new HttpHeaders({
      'User-Agent': 'github-user-search',
    });
  
    // Pass the headers in the options object
    const options = {
      params: params,
      headers: headers,
    };
  
    return this.http.get<any>(`${this.baseUrl}/${username}/repos`, options);
  }
  

}
