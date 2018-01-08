import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) {}

  ngOnInit() :void {
    const source$ = Observable.from(['Adam', 'Bill', 'Cow'])
                      .map(v => v.toUpperCase())
                      .map(v => 'I am' + v);
    source$.subscribe(
      v => console.log(v),
      err => console.error(err),
      () => console.log('completed')
    );

  }

  // getUser(username) {
  //   return this.http.get('https://api.github.com/users/' + username);
  // }



}
