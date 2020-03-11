import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Todo } from '../../models/todo.model';

@Injectable({
    providedIn: 'root'
})
export class TodoApiService {

    baseUrlResources = environment.baseUrlResourcesApi;

    constructor(private http: HttpClient, private router: Router) { }

    getAll() {

        const url = this.baseUrlResources + '/todo/all';

        return this.http.get(url)
            .pipe(
                map((resp: any) => {

                    return resp.content;
                })
            );
    }

    getTodos(page: number = 1) {

        const url = this.baseUrlResources + '/todo?page=' + page;

        return this.http.get(url)
            .pipe(
                map((resp: any) => {

                    return resp.content;
                })
            );
    }

    getTodo(id: string) {
        const url = this.baseUrlResources + '/todo/' + id;

        return this.http.get(url)
            .pipe(
                map((resp: any) => {

                    return resp.content;
                })
            );
    }

    addTodo(todo: Todo) {

        const url = this.baseUrlResources + '/todo';

        return this.http.post(url, todo)
            .pipe(
                map((resp: any) => {

                    return resp.content;
                })
            );
    }

    updateTodo(todo: Todo) {

        const url = this.baseUrlResources + '/todo/' + todo._id;

        return this.http.put(url, todo)
            .pipe(
                map((resp: any) => {

                    return resp.content;
                })
            );
    }

    deleteTodo(id: string) {

        const url = this.baseUrlResources + '/todo/' + id;

        return this.http.delete(url)
            .pipe(
                map((resp: any) => {

                    return resp.content;
                })
            );
    }

    searchTodos(term: string) {

        const url = this.baseUrlResources + '/todo/' + term + '/search';

        return this.http.get(url)
            .pipe(
                map((resp: any) => {

                    return resp.content;
                })
            );

    }
}
