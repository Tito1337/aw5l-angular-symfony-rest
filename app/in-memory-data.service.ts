import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let auteurs = [
      { id: 1, nom: 'Dupont1', prenom: 'John1', email: 'john1@Dupont1.com' },
      { id: 2, nom: 'Dupont2', prenom: 'John2', email: 'john2@Dupont2.com' },
      { id: 3, nom: 'Dupont3', prenom: 'John3', email: 'john3@Dupont3.com' },
      { id: 4, nom: 'Dupont4', prenom: 'John4', email: 'john4@Dupont4.com' },
    ];
    return {auteurs};
  }
}