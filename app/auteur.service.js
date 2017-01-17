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
var AuteurService = (function () {
    function AuteurService(http) {
        this.http = http;
        // URL de l'API REST auteurs :
        this.auteurs_api_url = 'http://aw5l/symfony/web/app_dev.php/api/auteur';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    /**
     * Récupère tous les auteurs via API REST
     */
    AuteurService.prototype.getAuteurs = function () {
        return this.http
            .get(this.auteurs_api_url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /**
     * Récupère un auteur par ID via API REST
     */
    AuteurService.prototype.getAuteur = function (id) {
        var url = this.auteurs_api_url + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /**
     * Met à jour un auteur via API REST
     */
    AuteurService.prototype.update = function (auteur) {
        var url = this.auteurs_api_url + "/" + auteur.id;
        return this.http
            .put(url, JSON.stringify(auteur), { headers: this.headers })
            .toPromise()
            .then(function () { return auteur; })
            .catch(this.handleError);
    };
    /**
     * Crée un nouvel auteur via API REST
     */
    AuteurService.prototype.create = function (prenom, nom, email) {
        return this.http
            .post(this.auteurs_api_url, JSON.stringify({ prenom: prenom, nom: nom, email: email }), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /**
     * Supprime un auteur via API REST
     */
    AuteurService.prototype.delete = function (id) {
        var url = this.auteurs_api_url + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    /**
     * Gestion des erreurs de promesse
     */
    AuteurService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return AuteurService;
}());
AuteurService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuteurService);
exports.AuteurService = AuteurService;
//# sourceMappingURL=auteur.service.js.map