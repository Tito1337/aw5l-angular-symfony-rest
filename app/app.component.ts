import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" routerLink="/dashboard">{{title}}</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li routerLinkActive="active"><a routerLink="/dashboard">Accueil</a></li>
            <li routerLinkActive="active"><a routerLink="/auteurs">Auteurs</a></li>
            <li routerLinkActive="active"><a routerLink="/articles">Articles</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Toute l\'actualité';
}