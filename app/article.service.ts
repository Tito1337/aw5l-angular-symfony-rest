import 'rxjs/add/operator/toPromise';
import { Injectable }    from '@angular/core';
import { Headers, Http, Jsonp, URLSearchParams} from '@angular/http';

import { Auteur } from './auteur';
import { Article } from './article';

@Injectable()
export class ArticleService {
    // URL de l'API REST articles :
    private articles_api_url = 'http://aw5l/symfony/web/app_dev.php/api/article';  // URL to web api

    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }

    /**
     * Récupère tous les articles via API REST
     */
    getArticles(): Promise<Article[]> {
        return this.http
            .get(this.articles_api_url)
            .toPromise()
            .then(response => response.json() as Article[])
            .catch(this.handleError);
    }

    /**
     * Récupère un article par ID via API REST
     */
    getArticle(id: number): Promise<Article> {
        const url = `${this.articles_api_url}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Article)
            .catch(this.handleError);
    }

    /**
     * Met à jour un article via API REST
     */
    update(article: Article): Promise<Article> {
      const url = `${this.articles_api_url}/${article.id}`;
      return this.http
        .put(url, JSON.stringify(article), {headers: this.headers})
        .toPromise()
        .then(() => article)
        .catch(this.handleError);
    }

    /**
     * Crée un nouvel article via API REST
     */
    create(title: string, content: string, auteur: number): Promise<Article> {
        return this.http
            .post(this.articles_api_url, JSON.stringify({title: title, content: content, auteur: auteur}), {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Article)
            .catch(this.handleError);
    }

    /**
     * Supprime un article via API REST
     */
    delete(article: Article): Promise<void> {
        const url = `${this.articles_api_url}/${article.id}`;
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
