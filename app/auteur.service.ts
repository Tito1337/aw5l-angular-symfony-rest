import 'rxjs/add/operator/toPromise';
import { Injectable }    from '@angular/core';
import { Headers, Http, Jsonp, URLSearchParams} from '@angular/http';

import { Auteur } from './auteur';

@Injectable()
export class AuteurService {
    // URL de l'API REST auteurs :
    private auteurs_api_url = 'http://aw5l/symfony/web/app_dev.php/api/auteur';

    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }

    /**
     * Récupère tous les auteurs via API REST
     */
    getAuteurs(): Promise<Auteur[]> {
        return this.http
            .get(this.auteurs_api_url)
            .toPromise()
            .then(response => response.json() as Auteur[])
            .catch(this.handleError);
    }

    /**
     * Récupère un auteur par ID via API REST
     */
    getAuteur(id: number): Promise<Auteur> {
        const url = `${this.auteurs_api_url}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Auteur)
            .catch(this.handleError);
    }

    /**
     * Met à jour un auteur via API REST
     */
    update(auteur: Auteur): Promise<Auteur> {
      const url = `${this.auteurs_api_url}/${auteur.id}`;
      return this.http
        .put(url, JSON.stringify(auteur), {headers: this.headers})
        .toPromise()
        .then(() => auteur)
        .catch(this.handleError);
    }

    /**
     * Crée un nouvel auteur via API REST
     */
    create(prenom: string, nom: string, email: string): Promise<Auteur> {
        return this.http
            .post(this.auteurs_api_url, JSON.stringify({prenom: prenom, nom: nom, email: email}), {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Auteur)
            .catch(this.handleError);
    }

    /**
     * Supprime un auteur via API REST
     */
    delete(id: number): Promise<void> {
        const url = `${this.auteurs_api_url}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    /**
     * Gestion des erreurs de promesse
     */
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
