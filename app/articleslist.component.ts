import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Auteur } from './auteur';
import { Article } from './article';
import { AuteurService } from './auteur.service';
import { ArticleService } from './article.service';

@Component({
    moduleId: module.id,
    selector: 'articles-list',
    templateUrl: 'articleslist.component.html'
})

export class ArticlesListComponent implements OnInit {
    articles: Article[];
    allAuteurs: Auteur[];

    constructor(
        private router: Router,
        private auteurService: AuteurService,
        private articleService: ArticleService
    ) { }

    /**
     * Charge tous les articles dans la variable articles
     */
    getArticles(): void {
        this.articleService.getArticles().then(articles => this.articles = articles);
    }

    /**
     * Charge tous les auteurs dans la variable allAuteurs
     */
    getAuteurs(): void {
        this.auteurService.getAuteurs().then(auteurs => this.allAuteurs = auteurs);
    }

    /**
     * ngOnInit : appelé au chargement du composant
     */
    ngOnInit(): void {
        this.getArticles();
        this.getAuteurs();
    }

    /**
     * Navigue vers la page de modification d'un article
     */
    gotoArticle(article: Article): void {
        this.router.navigate(['/article', article.id]);
    }

    /**
     * Crée un nouvel article
     */
    add(title: string, content: string, auteur: number): void {
        title = title.trim();
        content = content.trim();

        if (!title || !content) { return; }
        this.articleService.create(title, content, auteur)
            .then(article => { this.articles.push(article); });
    }

    /**
     * Supprime un article
     */
    delete(article: Article): void {
        this.articleService
        .delete(article)
        .then(() => {
            this.articles = this.articles.filter(h => h !== article);
        });
    }
}