import { Component } from '@angular/core';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './twitter.component.html'
})
export class TwitterComponent {
  isAuthorize = false;
  searchQuery = '';
  tweetsData;

  constructor(private httpService: HttpService){}

  authorize() {
    this.httpService.post('authorize').subscribe((res) => {
      // console.log(res);
      if (res.success) {
        this.isAuthorize = true;
      }
    });
  }

  search(){
    var searchTerm = 'query=' + this.searchQuery;

    this.httpService.post('search', searchTerm).subscribe((res) => {
      this.tweetsData = res.data.statuses;
    });
  }
}
