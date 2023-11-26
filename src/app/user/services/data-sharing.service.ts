import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {

  private data = new BehaviorSubject<string[]>([])

  getData = this.data.asObservable()

  constructor() { }

  setData(data: any) {
    this.data.next(data)
  }
}
