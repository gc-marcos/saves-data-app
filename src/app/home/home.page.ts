import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
data = {
name: '',
age: null
};

storedData: any[] = [];

constructor(private storage: Storage) {}
async ngOnInit() {
  await this.storage.create();
  await this.loadData();
}

async saveData() {
  const saveData = await this.storage.get('userData') || [];
  saveData.push(this.data);
  await this.storage.set('userData', saveData);
  console.log('Dados salvos:', this.data);
  this.loadData();
  this.data = { name: '', age: null };
}

async loadData() {
  const saveData = await this.storage.get('userData');
  if (saveData) {
  this.storedData = saveData;
} else {
  this.storedData = [];
}
console.log("Dados carregaods", this.storedData)
}
}
