import { Component, OnInit, OnDestroy } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  closed$ = new Subject<any>();
  showTabs = true;

  constructor(private router: Router) { }

  ngOnInit() {


    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.closed$)
    ).subscribe((event: any) => {
      if (event.url === '/login') {
        this.showTabs = false;
      }
      if(event.url === '/signup'){
        this.showTabs = false;
      }
      else{
        console.log('no selection');
      }
    });
  }

  ngOnDestroy() {
    this.closed$.next();
  }

}
