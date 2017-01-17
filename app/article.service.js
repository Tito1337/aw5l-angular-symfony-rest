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
require("rxjs/add/operator/toPromise");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ArticleService = (function () {
    function ArticleService(http) {
        this.http = http;
        // URL de l'API REST articles :
        this.articles_api_url = 'http://aw5l/symfony/web/app_dev.php/api/article'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    /**
     * Récupère tous les articles via API REST
     */
    ArticleService.prototype.getArticles = function () {
        return this.http
            .get(this.articles_api_url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /**
     * Récupère un article par ID via API REST
     */
    ArticleService.prototype.getArticle = function (id) {
        var url = this.articles_api_url + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /**
     * Met à jour un article via API REST
     */
    ArticleService.prototype.update = function (article) {
        var url = this.articles_api_url + "/" + article.id;
        return this.http
            .put(url, JSON.stringify(article), { headers: this.headers })
            .toPromise()
            .then(function () { return article; })
            .catch(this.handleError);
    };
    /**
     * Crée un nouvel article via API REST
     */
    ArticleService.prototype.create = function (title, content, auteur) {
        return this.http
            .post(this.articles_api_url, JSON.stringify({ title: title, content: content, auteur: auteur }), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /**
     * Supprime un article via API REST
     */
    ArticleService.prototype.delete = function (article) {
        var url = this.articles_api_url + "/" + article.id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    /**
     * Gestion des erreurs de promesse
     */
    ArticleService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return ArticleService;
}());
ArticleService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map