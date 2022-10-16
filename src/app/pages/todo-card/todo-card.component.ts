import { Component, OnInit,} from '@angular/core';
import {TasksAPIService} from "./tasks-api.service";
import {Task} from "./interfaces";


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

  constructor(private TasksApi: TasksAPIService) {

  }

  async ngOnInit(): Promise<void> {

    this.tasks = await this.TasksApi.getTasks()

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
