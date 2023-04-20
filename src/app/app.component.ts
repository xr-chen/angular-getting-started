import { Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  // multiple line inline template
  // template: `<h1>Hello World</h1>
  // <p>Angular is Awesome</p>`,
  styleUrls: ['./app.component.scss']
  // inline stype
  // styles: [`h1 {color: red; }`]
})
export class AppComponent implements OnInit {

  title = 'hotelinventory';
  role = 'admin';

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: Storage,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
  }
  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  @ViewChild('name', { static: true }) name!: ElementRef;

  ngOnInit(): void {
    // this.router.events.subscribe(event => console.log(event));
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(
      event => console.log('Navigation started')
    );
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      event => console.log('Navigation completed')
    );
    this.loggerService?.log("AppComponent.ngOnInit()");
    // this.name.nativeElement.innerText = "Hilton Hotel";

    this.localStorage.setItem("name", "Hilton Hotel")
  }

  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   // access properties of dynamically loaded instance.
  //   componentRef.instance.numberOfRooms = 100;
  // }

}
