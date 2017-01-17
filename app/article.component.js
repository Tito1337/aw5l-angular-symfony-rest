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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var auteur_service_1 = require("./auteur.service");
var article_1 = require("./article");
var article_service_1 = require("./article.service");
var ArticleComponent = (function () {
    function ArticleComponent(auteurService, articleService, route, router, location) {
        this.auteurService = auteurService;
        this.articleService = articleService;
        this.route = route;
        this.router = router;
        this.location = location;
    }
    /**
     * Charge tous les auteurs dans la variable allAuteurs
     */
    ArticleComponent.prototype.getAuteurs = function () {
        var _this = this;
        this.auteurService.getAuteurs()
            .then(function (auteurs) { return _this.allAuteurs = auteurs; });
    };
    /**
     * ngOnInit : appelé au chargement du composant
     */
    ArticleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.articleService.getArticle(+params['id']); })
            .subscribe(function (article) { return _this.article = article; });
        this.getAuteurs();
    };
    /**
     * Navigue vers la liste des articles
     */
    ArticleComponent.prototype.goBack = function () {
        this.router.navigate(['/articles']);
    };
    /**
     * Enregistre les modifications
     */
    ArticleComponent.prototype.save = function () {
        var _this = this;
        this.articleService.update(this.article)
            .then(function () { return _this.router.navigate(['/articles']); });
    };
    /**
     * Supprime l'article
     */
    ArticleComponent.prototype.delete = function () {
        var _this = this;
        this.articleService.delete(this.article)
            .then(function () { return _this.router.navigate(['/articles']); });
    };
    return ArticleComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", article_1.Article)
], ArticleComponent.prototype, "article", void 0);
ArticleComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'auteur-details',
        templateUrl: 'article.component.html'
    }),
    __metadata("design:paramtypes", [auteur_service_1.AuteurService,
        article_service_1.ArticleService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location])
], ArticleComponent);
exports.ArticleComponent = ArticleComponent;
//# sourceMappingURL=article.component.js.map