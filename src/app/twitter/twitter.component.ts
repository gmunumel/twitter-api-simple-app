import { Component } from '@angular/core';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './twitter.component.html'
})
export class TwitterComponent {
  title = 'app works!';
  searchquery = '';
  tweetsdata;

  constructor(private httpService: HttpService){}

  makecall() {
    // var headers = new Headers();

    // headers.append('Content-Type', 'application/X-www-form-urlencoded');

    // this.http.post('http://localhost:3000/authorize', {headers: headers}).subscribe((res) => {
    //   console.log(res);
    // })

    // this.httpService.authorize('authorize').subscribe((res) => {
    //   console.log(res);
    // });
    this.httpService.post('authorize').subscribe((res) => {
      console.log(res);
    });
  }

  searchcall(){
    // var headers = new Headers();
    var searchTerm = 'query=' + this.searchquery;

    // headers.append('Content-Type', 'application/X-www-form-urlencoded');

    // this.http.post('http://localhost:3000/search', searchterm, {headers: headers}).subscribe((res) => {
    //   this.tweetsdata = res.json().data.statuses;
    // });

    this.httpService.post('search', searchTerm).subscribe((res) => {
      this.tweetsdata = res.data.statuses;
    });
  }
}
