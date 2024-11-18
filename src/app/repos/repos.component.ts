import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { reposDetails } from '../userProfileDetails';
import { finalize } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { GithubService } from '../github.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [CommonModule, MatCardModule, LoadingComponent, FormsModule],
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnChanges {
  @Input() userName: string = '';

  repos: reposDetails[] = [];
  pageNumber: number = 1;
  totalPages: number = 1;
  isLoading: boolean = false;
  hasNextPage: boolean = true;
  private debounceTimeout : any;

  constructor(private githubService: GithubService) {}

  redirectToRepo(repourl: string) {
    window.open(repourl, '_blank');
  }  

  getUserRepos(userName: string, page: number = 1, perPage: number = 20) {
    this.isLoading = true; 
    this.githubService
      .getUserRepos(userName)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response) => { //Process each item in the response array
        this.repos = response.map(({ name, size, html_url }: reposDetails) => ({
          name,
          size,
          html_url
        }));
        this.hasNextPage = this.repos.length === perPage;
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

  onPageInput() {
    // Clear any existing timeout to prevent multiple requests
    clearTimeout(this.debounceTimeout);
    
    // Set a delay before loading the page
    this.debounceTimeout = setTimeout(() => {
      this.loadPageWithDelay(this.pageNumber);
    }, 500); // 500ms delay, adjust as needed
  }

  loadPageWithDelay(page: number) {
    this.getUserRepos(this.userName, page);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userName']?.currentValue?.length > 0) {
      this.getUserRepos(changes['userName']?.currentValue);
    }
  }
}
