import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoApiService } from '../../services/api/todo-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styles: []
})
export class TodoComponent implements OnInit {

    todo: Todo = new Todo();
    modo: string = '';
    loading: boolean = false;

    constructor(private todoApiService: TodoApiService, private router: Router, private activatedRoute: ActivatedRoute) {

        this.activatedRoute.params.subscribe(params => {
            const id = this.modo = params.id;

            if (this.modo !== 'add') {
                this.getTodo(id);
            }
        });
    }

    ngOnInit(): void {

    }

    getTodo(id: string) {
        this.loading = true;
        this.todoApiService.getTodo(id)
            .subscribe(resp => {

                this.loading = false;
                this.todo = resp.todo;

            }, error => {
                this.loading = false;
                if (error.status === 422) {
                    Swal.fire('Ha ocurrido un error', error.error.content.error.errors[0].msg, 'error');
                } else {
                    Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                }

            });
    }

    saveTodo(f: NgForm) {

        if (f.invalid) {
            return;
        }

        if (this.modo === 'add') {

            this.loading = true;
            this.todoApiService.addTodo(this.todo)
                .subscribe((resp) => {


                    this.loading = false;
                    this.todo = resp.todo;

                    Swal.fire('Tarea agregada', this.todo.name, 'success');

                    this.router.navigate(['/tarea', this.todo._id]);

                }, error => {
                    this.loading = false;
                    if (error.status === 422) {
                        Swal.fire('Ha ocurrido un error', error.error.content.error.errors[0].msg, 'error');
                    } else {
                        Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                    }

                });

        } else {
            this.loading = true;
            this.todoApiService.updateTodo(this.todo)
                .subscribe((resp: any) => {

                    this.todo = resp.todo;
                    this.loading = false;

                    Swal.fire('Tarea actualizada', this.todo.name, 'success');

                    this.router.navigate(['/tareas']);

                }, error => {
                    this.loading = false;
                    if (error.status === 422) {
                        Swal.fire('Ha ocurrido un error', error.error.content.error.errors[0].msg, 'error');
                    } else {
                        Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                    }

                });
        }

    }


    changeStatus(status: string) {
        this.todo.status = status;
    }

}
