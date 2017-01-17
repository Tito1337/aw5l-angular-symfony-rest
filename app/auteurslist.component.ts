import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Auteur } from './auteur';
import { AuteurService } from './auteur.service';

@Component({
    moduleId: module.id,
    selector: 'auteurs-list',
    templateUrl: 'auteurslist.component.html'
})
export class AuteursListComponent implements OnInit {
    auteurs: Auteur[];

    constructor(
        private router: Router,
        private auteurService: AuteurService) { }

    /**
     * Charge tous les auteurs dans la variable auteurs
     */
    getAuteurs(): void {
        this.auteurService.getAuteurs()
            .then(auteurs => this.auteurs = auteurs);
    }

    /**
     * ngOnInit : appelé au chargement du composant
     */
    ngOnInit(): void {
        this.getAuteurs();
    }

    /**
     * Navigue vers la page de modification d'un auteur
     */
    gotoAuteur(auteur: Auteur): void {
        this.router.navigate(['/auteur', auteur.id]);
    }

    /**
     * Crée un nouvel auteur
     */
    add(prenom: string, nom: string, email: string): void {
        prenom = prenom.trim();
        nom = nom.trim();
        email = email.trim();

        if (!prenom || !nom || !email) { return; }
        this.auteurService.create(prenom, nom, email)
            .then(auteur => { this.auteurs.push(auteur); });
    }

    /**
     * Supprime un auteur
     */
    delete(auteur: Auteur): void {
        this.auteurService
        .delete(auteur.id)
        .then(() => { this.auteurs = this.auteurs.filter(a => a !== auteur); });
    }
}