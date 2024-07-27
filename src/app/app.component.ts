import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { GithubService } from './github.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent,HttpClientModule],
  providers:[GithubService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'github-user-search';
}
