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
var auteur_1 = require("./auteur");
var auteur_service_1 = require("./auteur.service");
var AuteurComponent = (function () {
    function AuteurComponent(auteurService, route, router, location) {
        this.auteurService = auteurService;
        this.route = route;
        this.router = router;
        this.location = location;
    }
    /**
     * ngOnInit : appelé au chargement du composant
     */
    AuteurComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.auteurService.getAuteur(+params['id']); })
            .subscribe(function (auteur) { return _this.auteur = auteur; });
    };
    /**
     * Navigue vers la liste des auteurs
     */
    AuteurComponent.prototype.goBack = function () {
        this.router.navigate(['/auteurs']);
    };
    /**
     * Enregistre les modifications
     */
    AuteurComponent.prototype.save = function () {
        var _this = this;
        this.auteurService.update(this.auteur)
            .then(function () { return _this.goBack(); });
    };
    /**
     * Supprime l'article
     */
    AuteurComponent.prototype.delete = function () {
        var _this = this;
        this.auteurService.delete(this.auteur.id)
            .then(function () { return _this.router.navigate(['/auteurs']); });
    };
    return AuteurComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", auteur_1.Auteur)
], AuteurComponent.prototype, "auteur", void 0);
AuteurComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'auteur-details',
        templateUrl: 'auteur.component.html'
    }),
    __metadata("design:paramtypes", [auteur_service_1.AuteurService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location])
], AuteurComponent);
exports.AuteurComponent = AuteurComponent;
//# sourceMappingURL=auteur.component.js.map