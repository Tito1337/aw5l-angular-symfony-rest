import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Auteur } from './auteur';
import { AuteurService } from './auteur.service';
import { Article } from './article';
import { ArticleService } from './article.service';

@Component({
    moduleId: module.id,
    selector: 'auteur-details',
    templateUrl: 'article.component.html'
})
export class ArticleComponent {
    @Input()
    article: Article;
    allAuteurs: Auteur[];

    constructor(
        private auteurService: AuteurService,
        private articleService: ArticleService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    /**
     * Charge tous les auteurs dans la variable allAuteurs
     */
    getAuteurs(): void {
        this.auteurService.getAuteurs()
            .then(auteurs => this.allAuteurs = auteurs);
    }

    /**
     * ngOnInit : appelé au chargement du composant
     */
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.articleService.getArticle(+params['id']))
            .subscribe(article => this.article = article);
        this.getAuteurs();
    }

    /**
     * Navigue vers la liste des articles
     */
    goBack(): void {
        this.router.navigate(['/articles']);
    }

    /**
     * Enregistre les modifications
     */
    save(): void {
        this.articleService.update(this.article)
            .then(() => this.router.navigate(['/articles']));
    }

    /**
     * Supprime l'article
     */
    delete(): void {
        this.articleService.delete(this.article)
            .then(() => this.router.navigate(['/articles']));
    }
}