import { Injectable } from '@angular/core';
import { Key, NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { ITask } from '../model/task';

@Injectable({
  providedIn: 'root'
})

export class IndexedDBService {

  constructor(private dbService: NgxIndexedDBService) { }

  addTask(task: ITask){
    this.dbService
    .add('Tasks', task)
    .subscribe((key) => {
      console.log('key: ', key);
    });
  }

  updateTask(task: ITask){
    this.dbService
    .update('Tasks', task)
    .subscribe((storeData) => {
      console.log('storeData: ', storeData);
    });
  }

  getAllTasks(): Observable<ITask[]>{
    return this.dbService.getAll('Tasks');
  }

  getByKey(key: IDBValidKey): Observable<ITask>{
    return this.dbService.getByKey('Tasks', key);
  }

  deleteTask(key: Key){
    this.dbService.delete('Tasks', key).subscribe((tasks) => {
      console.log('all tasks:', tasks);
    });
  }
  
}
