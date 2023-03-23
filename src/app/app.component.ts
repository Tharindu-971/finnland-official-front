import { Component } from '@angular/core';
import { LoadingService } from './services/loading/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private loadingSerivce:LoadingService) {}

  ngOnInit(): void {
   
  }

  logout(): void {
    
  }
}
 