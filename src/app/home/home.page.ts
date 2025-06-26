import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data = {
    name: '',
    age: null
  };

  storedData: any[] = [];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    this.loadData();
  }

  async saveData() {
    // Pega o array atual do storage
    const existingData = (await this.storage.get('users')) || [];

    // Adiciona novo dado
    existingData.push({ ...this.data });

    // Salva de volta
    await this.storage.set('users', existingData);

    // Atualiza a lista mostrada no app
    this.storedData = existingData;

    // Limpa os inputs
    this.data.name = '';
    this.data.age = null;
  }

  async loadData() {
    const data = await this.storage.get('users');
    if (data) {
      this.storedData = data;
    }
  }
}
