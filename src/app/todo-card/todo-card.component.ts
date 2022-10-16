import { Component, OnInit,} from '@angular/core';
import {HttpClient} from "@angular/common/http";



interface Task{
  done: boolean,
  tittle: string
}

  export interface Fields {
    Status: string;
    Name: string;
  }

  export interface Record {
    id: string;
    createdTime: Date;
    fields: Fields;
  }

  export interface TasksResponse {
    records: Record[];
  }



@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {

  title = 'Mis tareas';

  tasks: Array<Task> = [];

  inputTask = 'Nueva tarea';

  editing:boolean=false;

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    const response = this.httpClient.get<TasksResponse>('https://api.airtable.com/v0/appjGyT6sO9DnARrP/Tasks?maxRecords=100&view=Grid%20view',{
        headers: {
          Authorization: 'Bearer keygsp15imhWlB0TT'
        }
      })

    response.subscribe((it)=> {
      this.tasks = it.records.map((it)=>{
        return {tittle: it.fields.Name, done: it.fields.Status === 'Done'}
      });
      console.log(this.tasks);
    })

    //this.tasks.push({tittle: "Tarea predeterminado no hecha", done: false});
    //this.tasks.push({tittle: "Tarea predeterminado hecha", done: true});

  }

  ngOnDestroy() {


  }

  addTask() {
    this.tasks.push({tittle: this.inputTask, done: false});

  }

  deleteTask(task: Task) {
    const index: number = this.tasks.indexOf(task);
    if(index !== -1){
      this.tasks.splice(index, 1);
    }
  }






}
