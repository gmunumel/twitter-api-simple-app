import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpResponse } from '@angular/common/http/src/response';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {

    static API_END_POINT = 'http://localhost:3000/';

    private params: URLSearchParams;

    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/X-www-form-urlencoded');
    }

    param(key: string, value: string): HttpService {
        this.params.append(key, value);
        return this;
    }

    // header(key: string, value: string): HttpService {
    //     this.headers.append(key, value);
    //     return this;
    // }

    // authBasic(mobile: number, password: string): HttpService {
    //     this.headers.append('Authorization', 'Basic ' + btoa(mobile + ':' + password));
    //     return this;
    // }

    // authToken(): HttpService {
    //     let tokenValue = '';
    //     if (this.token !== undefined) {
    //         tokenValue = this.token.token;
    //     }
    //     this.headers.append('Authorization', 'Basic ' + btoa(tokenValue + ':' + ''));
    //     return this;
    // }

    authorize(endpoint: string) : Observable<any> {
        return this.post(HttpService.API_END_POINT + endpoint).map(
            response => {
                return response;
            },
            error => {
                return this.handleError(error);
            });
    }

    // postWithParams(endpoint: string, params: ) : Observable<any> {
    //     this.param();
    //     this.processPost(endpoint);
    // }

    post(endpoint: string, body?: Object): Observable<any> {
        return this.http.post(HttpService.API_END_POINT + endpoint, body, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    private extractData(response: Response): any {
        const contentType = response.headers.get('content-type');
        if (contentType) {
            if (contentType.indexOf('application/json') !== -1) {
                return response.json();
            }
        } else if (response.text()) {
            return response.text();
        } else {
            return response;
        }
    }

    // private processPost(endpoint: string) : Observable<any> {
    //     return this.post(HttpService.API_END_POINT + endpoint).map(
    //         response => {
    //             return response;
    //         },
    //         error => {
    //             return this.handleError(error);
    //         });
    //     );
    // }

    private createOptions(): RequestOptions {
        const options: RequestOptions = new RequestOptions({
            headers: this.headers,
            params: this.params
        });
        return options;
    }

    private handleError(response: Response): any {
        return Observable.throw(response);
    }
}