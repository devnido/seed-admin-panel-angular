import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoApiService } from '../../services/api/todo-api.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styles: []
})
export class TodosComponent implements OnInit {

    todos: Todo[] = [];
    totalTodos: number = 0;
    page: number = 1;
    nextPage: number = 1;
    loading: boolean = true;
    loadingById: string = '';

    constructor(private todoApiService: TodoApiService) { }

    ngOnInit(): void {
        this.loadTodos();
    }

    searchTodos(q: string) {
        if (q.length === 0) {
            this.loadTodos();
            return;
        }

        this.loading = true;

        this.todoApiService.searchTodos(q)
            .subscribe((resp: any) => {
                this.todos = resp.todos;
                this.totalTodos = resp.total;
                this.loading = false;
            }, error => {
                this.loading = false;
                if (error.status === 422) {
                    Swal.fire('Ha ocurrido un error', error.error.content.error.errors[0].msg, 'error');
                } else {
                    Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                }

            });
    }

    loadTodos() {

        this.loading = true;

        this.todoApiService.getTodos(this.page)
            .subscribe((resp: any) => {

                console.log(resp);


                this.todos = resp.todos;
                this.totalTodos = resp.total;
                this.nextPage = resp.nextPage;
                this.loading = false;

            }, error => {
                this.loading = false;
                if (error.status === 422) {
                    Swal.fire('Ha ocurrido un error', error.error.content.error.errors[0].msg, 'error');
                } else {
                    Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                }

            });
    }

    deleteTodo(todo: Todo) {

        Swal.fire({
            title: '¿Está seguro?',
            text: 'Está a punto de borrar la tarea ' + todo.name,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No',
        }).then((result) => {

            if (result.value) {

                this.todoApiService.deleteTodo(todo._id)
                    .subscribe((resp: any) => {

                        this.page = 1;
                        this.loadTodos();

                        Swal.fire(
                            'Eliminado!',
                            'La tarea se ha eliminado exitosamente.',
                            'success'
                        );

                    }, error => {

                        if (error.status === 422) {
                            Swal.fire('Ha ocurrido un error', error.error.content.error.errors[0].msg, 'error');
                        } else {
                            Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                        }

                    });
            }
        });

    }

    changeSwitch(todo: Todo) {

        if (todo.status === 'pendiente') {
            todo.status = 'realizado';
        } else {
            todo.status = 'pendiente';
        }

        this.loadingById = todo._id;
        this.todoApiService.updateTodo(todo)
            .subscribe((resp: any) => {

                const indexCurrentTodo = this.todos.findIndex(t => t._id === resp.todo._id);

                this.todos[indexCurrentTodo] = resp.todo;

                // Swal.fire('Tarea actualizada', todo.name, 'success');

                this.loadingById = '';

            }, error => {

                this.loadingById = '';
                if (error.status === 422) {
                    Swal.fire('Ha ocurrido un error', error.error.content.error.errors[0].msg, 'error');
                } else {
                    Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                }

            });

    }

    getPrevPage() {
        if (this.page > 1) {
            this.page--;
            this.loadTodos();
        }
        return;
    }


    getNextPage() {
        if (this.nextPage > this.page) {
            this.page++;
            this.loadTodos();
        }
        return;
    }

}
