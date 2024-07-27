
// import { reposDetails } from './../userProfileDetails';
// import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { LoadingComponent } from '../loading/loading.component';
// import { GithubService } from '../github.service';
// import { finalize } from 'rxjs';

// @Component({
//   selector: 'app-repos',
//   standalone: true,
//   imports: [CommonModule,MatCardModule,LoadingComponent],
//   templateUrl: './repos.component.html',
//   styleUrl: './repos.component.scss'
// })
// export class ReposComponent implements OnChanges {
//   @Input() userName: string = '';

//   repos: reposDetails[] = [];

//   pageNumber: number = 1;

//   isLoading: boolean = false;

//   constructor(private gitHubService: GithubService) {}

//   redirectToRepo(repourl: string) {
//     window.open(repourl);
//   }

//   getUserRepos(userName: string, page: number =1, perPage: number = 20) {
//     this.isLoading = true;
//     this.gitHubService.getUserRepos(userName, page, perPage).pipe(
//       finalize(() => {
//         this.isLoading = false;
//       })
//     ).subscribe((response) => {
//       this.repos = response.map(({
//         name, size}: reposDetails) => ({
//           name,
//           size,
//         }));
//     });
//   }

//   onPrevious() {
//     this.pageNumber--;
//     this.getUserRepos(this.userName, this.pageNumber);
//   }

//   onNext() {
//     this.pageNumber++;
//     this.getUserRepos(this.userName, this.pageNumber);
//   }

//   onPageChange(event: Event) {
//     const inputElement = event.target as HTMLInputElement;
//     this.pageNumber = parseInt(inputElement.value);
//     this.getUserRepos(this.userName, this.pageNumber);
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//       if (changes['userName']?.currentValue?.length > 0) {
//         this.getUserRepos(changes['userName']?.currentValue);
//       }
//   }

// }


import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { userProfileDetails } from '../userProfileDetails';
import { reposDetails } from '../userProfileDetails';
import { finalize } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [CommonModule, MatCardModule, LoadingComponent],
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnChanges {
  @Input() userName: string = '';

  repos: reposDetails[] = [];

  pageNumber: number = 1;

  isLoading: boolean = false;

  constructor(private githubService: GithubService) {}

  redirectToRepo(repourl: string) {
    window.open(repourl);
  }

  getUserRepos(userName: string, page: number = 1, perPage: number = 20) {
    this.isLoading = true;
    this.githubService
      .getUserRepos(userName, page, perPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response) => {
        this.repos = response.map(({ name, size }: reposDetails) => ({
          name,
          size,
        }));
      });
  }

  onPrevious() {
    this.pageNumber--;
    this.getUserRepos(this.userName, this.pageNumber);
  }

  onNext() {
    this.pageNumber++;
    this.getUserRepos(this.userName, this.pageNumber);
  }

  onPageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.pageNumber = parseInt(inputElement.value);
    this.getUserRepos(this.userName, this.pageNumber);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('currentUserName: ', changes['userName']?.currentValue);
    if (changes['userName']?.currentValue?.length > 0) {
      this.getUserRepos(changes['userName']?.currentValue);
    }
  }
}
