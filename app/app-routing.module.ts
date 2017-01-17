import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { AuteursListComponent }      from './auteurslist.component';
import { AuteurComponent }  from './auteur.component';
import { ArticlesListComponent }      from './articleslist.component';
import { ArticleComponent }      from './article.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard',  component: DashboardComponent },
    { path: 'auteur/:id', component: AuteurComponent },
    { path: 'auteurs',     component: AuteursListComponent },
    { path: 'articles',     component: ArticlesListComponent },
    { path: 'article/:id',     component: ArticleComponent },
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}