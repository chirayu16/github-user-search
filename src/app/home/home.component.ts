import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { ProfileComponent } from '../profile/profile.component';
import { ReposComponent } from '../repos/repos.component';
import { reposDetails, userProfileDetails } from '../userProfileDetails';
import { GithubService } from '../github.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent, 
    ProfileComponent, 
    ReposComponent,
    LoadingComponent
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
      this.isLoading = true;
      this.githubService
        .searchUser(userName)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe((response)=> {
      this.user = {
        userName:response.login,
        name:response.name,
        avatarUrl:response.avatar_url,
        bio:response.bio,
        htmlUrl:response.html_url,
      };
    });
  }
}

    onSearch(username:string) {
      this.getUserDetails(username);
      this.searchQuery = username;
    }
}
