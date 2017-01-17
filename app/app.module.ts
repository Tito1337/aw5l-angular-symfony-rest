import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { AuteurComponent } from './auteur.component';
import { AuteursListComponent } from './auteurslist.component';
import { AuteurService } from './auteur.service';

import { ArticlesListComponent } from './articleslist.component';
import { ArticleComponent } from './article.component';
import { ArticleService } from './article.service';

import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        AuteursListComponent,
        AuteurComponent,
        ArticlesListComponent,
        ArticleComponent,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        AuteurService,
        ArticleService
    ],
})
export class AppModule { }