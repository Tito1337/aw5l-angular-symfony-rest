import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from './article';
import { ArticleService } from './article.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  dashArticles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private router: Router) { }

  ngOnInit(): void {
    this.articleService.getArticles().then(articles => this.dashArticles = articles.slice(0, 3));
  }

  gotoArticle(article: Article): void {
        this.router.navigate(['/article', article.id]);
  }
}