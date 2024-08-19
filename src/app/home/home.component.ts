import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { ProfileComponent } from '../profile/profile.component';
import { ReposComponent } from '../repos/repos.component';
import { reposDetails, userProfileDetails } from '../userProfileDetails';
import { GithubService } from '../github.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent, 
    ProfileComponent, 
    ReposComponent,
    LoadingComponent,
    LogoComponent
  ],
  providers: [GithubService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user: userProfileDetails | null = null;
  repos: reposDetails | null = null;
  searchQuery: string = '';
  isLoading: boolean = false;

  constructor(private githubService: GithubService) {}

  getUserDetails(userName: string) {
    if (!!userName) {       
      this.isLoading = true; //sets loading state to true before starting API call
      this.githubService
        .searchUser(userName)  //calls the service method to fetch user details
        .pipe(
          finalize(() => {    //uses finalize to ensure isLoading is set to false after the API call completes
            this.isLoading = false;
          })
        ).subscribe((response)=> {  //processes the response from API, updating user property with user's details 
          console.log('response:', response.followers);
          this.user = {
            userName:response.login,
            name:response.name,
            avatarUrl:response.avatar_url,
            bio:response.bio,
            htmlUrl:response.html_url,
            followers: response.followers,
            following: response.following,
          };
        }
      );
    }
  }

  onSearch(username:string) {  //fn handles the search action triggered by the user
    this.getUserDetails(username);
    this.searchQuery = username; 
  }
}
