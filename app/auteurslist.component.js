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
var AuteursListComponent = (function () {
    function AuteursListComponent(router, auteurService) {
        this.router = router;
        this.auteurService = auteurService;
    }
    /**
     * Charge tous les auteurs dans la variable auteurs
     */
    AuteursListComponent.prototype.getAuteurs = function () {
        var _this = this;
        this.auteurService.getAuteurs()
            .then(function (auteurs) { return _this.auteurs = auteurs; });
    };
    /**
     * ngOnInit : appelé au chargement du composant
     */
    AuteursListComponent.prototype.ngOnInit = function () {
        this.getAuteurs();
    };
    /**
     * Navigue vers la page de modification d'un auteur
     */
    AuteursListComponent.prototype.gotoAuteur = function (auteur) {
        this.router.navigate(['/auteur', auteur.id]);
    };
    /**
     * Crée un nouvel auteur
     */
    AuteursListComponent.prototype.add = function (prenom, nom, email) {
        var _this = this;
        prenom = prenom.trim();
        nom = nom.trim();
        email = email.trim();
        if (!prenom || !nom || !email) {
            return;
        }
        this.auteurService.create(prenom, nom, email)
            .then(function (auteur) { _this.auteurs.push(auteur); });
    };
    /**
     * Supprime un auteur
     */
    AuteursListComponent.prototype.delete = function (auteur) {
        var _this = this;
        this.auteurService
            .delete(auteur.id)
            .then(function () { _this.auteurs = _this.auteurs.filter(function (a) { return a !== auteur; }); });
    };
    return AuteursListComponent;
}());
AuteursListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'auteurs-list',
        templateUrl: 'auteurslist.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        auteur_service_1.AuteurService])
], AuteursListComponent);
exports.AuteursListComponent = AuteursListComponent;
//# sourceMappingURL=auteurslist.component.js.map