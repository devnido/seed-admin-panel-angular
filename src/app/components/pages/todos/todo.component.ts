import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { TodoApiService } from 'src/app/services/api/todo-api.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styles: []
})
export class TodoComponent implements OnInit, OnDestroy {

    todo: Todo = new Todo();
    modo: string = '';
    loading: boolean = false;
    subscriptions: Subscription[] = [];

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

    ngOnDestroy(): void {

        this.subscriptions.map(s => s.unsubscribe());
    }

    getTodo(id: string) {
        this.loading = true;
        const subscription = this.todoApiService.getTodo(id)
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

        this.subscriptions.push(subscription);
    }

    saveTodo(f: NgForm) {

        if (f.invalid) {
            return;
        }

        if (this.modo === 'add') {

            this.loading = true;
            const subscription = this.todoApiService.addTodo(this.todo)
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
            this.subscriptions.push(subscription);

        } else {
            this.loading = true;
            const subscription = this.todoApiService.updateTodo(this.todo)
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

            this.subscriptions.push(subscription);
        }

    }


    changeStatus(status: string) {
        this.todo.status = status;
    }

}
