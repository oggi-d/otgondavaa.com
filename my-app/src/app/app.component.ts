import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutmeComponent } from './aboutme/aboutme.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  Menus = [{
    routerLink: 'aboutme',
    icon: 'sentiment_satisfied_alt',
    text: 'About Me'
  }, {
    routerLink: 'works',
    icon: 'dashboard',
    text: 'Works'
  }, {
    routerLink: 'skills',
    icon: 'school',
    text: 'What I can do'
  }, {
    routerLink: 'contacts',
    icon: 'email',
    text: 'Contacts'
  }];
}