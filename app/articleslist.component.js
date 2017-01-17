"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auteur_service_1 = require("./auteur.service");
var article_service_1 = require("./article.service");
var ArticlesListComponent = (function () {
    function ArticlesListComponent(router, auteurService, articleService) {
        this.router = router;
        this.auteurService = auteurService;
        this.articleService = articleService;
    }
    /**
     * Charge tous les articles dans la variable articles
     */
    ArticlesListComponent.prototype.getArticles = function () {
        var _this = this;
        this.articleService.getArticles().then(function (articles) { return _this.articles = articles; });
    };
    /**
     * Charge tous les auteurs dans la variable allAuteurs
     */
    ArticlesListComponent.prototype.getAuteurs = function () {
        var _this = this;
        this.auteurService.getAuteurs().then(function (auteurs) { return _this.allAuteurs = auteurs; });
    };
    /**
     * ngOnInit : appelé au chargement du composant
     */
    ArticlesListComponent.prototype.ngOnInit = function () {
        this.getArticles();
        this.getAuteurs();
    };
    /**
     * Navigue vers la page de modification d'un article
     */
    ArticlesListComponent.prototype.gotoArticle = function (article) {
        this.router.navigate(['/article', article.id]);
    };
    /**
     * Crée un nouvel article
     */
    ArticlesListComponent.prototype.add = function (title, content, auteur) {
        var _this = this;
        title = title.trim();
        content = content.trim();
        if (!title || !content) {
            return;
        }
        this.articleService.create(title, content, auteur)
            .then(function (article) { _this.articles.push(article); });
    };
    /**
     * Supprime un article
     */
    ArticlesListComponent.prototype.delete = function (article) {
        var _this = this;
        this.articleService
            .delete(article)
            .then(function () {
            _this.articles = _this.articles.filter(function (h) { return h !== article; });
        });
    };
    return ArticlesListComponent;
}());
ArticlesListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'articles-list',
        templateUrl: 'articleslist.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        auteur_service_1.AuteurService,
        article_service_1.ArticleService])
], ArticlesListComponent);
exports.ArticlesListComponent = ArticlesListComponent;
//# sourceMappingURL=articleslist.component.js.map