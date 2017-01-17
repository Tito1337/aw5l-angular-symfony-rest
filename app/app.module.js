"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var auteur_component_1 = require("./auteur.component");
var auteurslist_component_1 = require("./auteurslist.component");
var auteur_service_1 = require("./auteur.service");
var articleslist_component_1 = require("./articleslist.component");
var article_component_1 = require("./article.component");
var article_service_1 = require("./article.service");
var dashboard_component_1 = require("./dashboard.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            dashboard_component_1.DashboardComponent,
            auteurslist_component_1.AuteursListComponent,
            auteur_component_1.AuteurComponent,
            articleslist_component_1.ArticlesListComponent,
            article_component_1.ArticleComponent,
        ],
        bootstrap: [
            app_component_1.AppComponent
        ],
        providers: [
            auteur_service_1.AuteurService,
            article_service_1.ArticleService
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map