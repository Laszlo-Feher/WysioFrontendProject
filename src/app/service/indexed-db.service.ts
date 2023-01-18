import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { ITask } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private db: any;
  tasks: ITask[];

  constructor() {
    this.start();
  }
  async start(){
    await this.connect();
    this.tasks = await this.getAll();
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      openDB('myDatabase', 1, {
        upgrade(db) {
          db.createObjectStore('tasks', { keyPath: 'id' });
        }
      }).then(db => {
        this.db = db;
        resolve();
      }).catch(error => {
        console.log(`Error connecting to IndexedDB: ${error}`);
        reject(error);
      });
    });
  }

  async add(data: ITask) {
    return this.db.add('tasks', data);
  }

  getAll(): Promise<ITask[]> {
    return new Promise((resolve, reject) => {
      const taskStore = this.db.transaction('tasks').objectStore('tasks');
      taskStore.getAll().then((data: ITask[] | PromiseLike<ITask[]>) => {
        console.log(data);
        resolve(data);
      }).catch((error: any) => {
        console.log(`Error getting all tasks from IndexedDB: ${error}`);
        reject(error);
      });
    });
  }

}
