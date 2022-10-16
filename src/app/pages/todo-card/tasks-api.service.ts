import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, map, Observable} from "rxjs";
import {Task, TasksResponse} from "./interfaces";



@Injectable({
  providedIn: 'root'
})
export class TasksAPIService {

  constructor(private httpClient: HttpClient) {

  }


  async getTasks(): Promise<Task[]> {
    const response = await firstValueFrom(this.httpClient.get<TasksResponse>('https://api.airtable.com/v0/appjGyT6sO9DnARrP/Tasks?maxRecords=100&view=Grid%20view', {
      headers: {
        Authorization: 'Bearer keygsp15imhWlB0TT'
      }
    }))
    return response.records.map((it) => {
      return {tittle: it.fields.Name, done: it.fields.Status === 'Done'}
    })
  }

  /*
 getTasks(): Observable<Array<Task>> {
   const response = this.httpClient.get<TasksResponse>('https://api.airtable.com/v0/appjGyT6sO9DnARrP/Tasks?maxRecords=100&view=Grid%20view', {
     headers: {
       Authorization: 'Bearer keygsp15imhWlB0TT'
     }
   })

   return response.pipe(map((it)=>{
     return it.records.map((it) => {
       return {tittle: it.fields.Name, done: it.fields.Status === 'Done'}
     })
   }))
 }
 */
}




