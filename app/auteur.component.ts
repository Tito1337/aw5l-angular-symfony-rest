import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Auteur } from './auteur';
import { AuteurService } from './auteur.service';

@Component({
    moduleId: module.id,
    selector: 'auteur-details',
    templateUrl: 'auteur.component.html'
})
export class AuteurComponent {
    @Input()
    auteur : Auteur;

    constructor(
        private auteurService: AuteurService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    /**
     * ngOnInit : appelé au chargement du composant
     */
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.auteurService.getAuteur(+params['id']))
            .subscribe(auteur => this.auteur = auteur);
    }

    /**
     * Navigue vers la liste des auteurs
     */
    goBack(): void {
        this.router.navigate(['/auteurs']);
    }

    /**
     * Enregistre les modifications
     */
    save(): void {
        this.auteurService.update(this.auteur)
            .then(() => this.goBack());
    }

    /**
     * Supprime l'article
     */
    delete(): void {
        this.auteurService.delete(this.auteur.id)
        .then(() => this.router.navigate(['/auteurs']));
    }
}