import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * This is a helper class that will help you  to send Http Requests
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public accessToken: string;
  public fetchStart = new EventEmitter<any>();
  public fetchEnd = new EventEmitter<any>();
  constructor(protected _http: HttpClient, private toastr: ToastrService) { }
  public api(): IRequestBuilder {
    return new RequestBuilder(
      this._http, environment.apiEndPoint, new UserTokenProvider(this), this.fetchStart, this.fetchEnd, this.toastr
    );
  }

}

export interface IRequestBuilder {
  url(url: string): IRequestBuilder;
  header(name: string, value: string): IRequestBuilder;
  noAuth(): IRequestBuilder;
  post<T>(): Promise<T>;
  put<T>(): Promise<T>;
  patch<T>(): Promise<T>;
  delete<T>(): Promise<T>;
  needJson(): IRequestBuilder;
  needUrlencode(): IRequestBuilder;
  hasJson(): IRequestBuilder;
  hasUrlencoded(): IRequestBuilder;
  rowData(data: any): IRequestBuilder;
  json(data: any): IRequestBuilder;
  get<T>(queyParameters?: string): Promise<T>;
  sendFile(files: File, progress: any);
}

interface AuthTokenProvider {
  getTokenInfo(): { name: string, value: string };
}

export type NextCallback<T> = (value: T) => void;
export type ErrorCallback<T> = (value: T) => void;


class UserTokenProvider implements AuthTokenProvider {
  private _serviceHelper: ApiService;
  constructor(serviceHelper: ApiService) { this._serviceHelper = serviceHelper; }
  getTokenInfo(): { name: string, value: string } {
    const token = localStorage.getItem('token');
    if (token) {
      return { name: 'x-auth-token', value: token };
    }
    return null;
  }
}

export class RequestBuilder implements IRequestBuilder {

  private _helper: ApiService;
  private _request: {
    url: string, headers: Array<{ name: string, value: string }>,
    authorize: boolean, data: string
  } = { url: '', headers: [], authorize: true, data: '' };
  private _http: HttpClient;
  private _baseUrl: string;
  private _tokenProvider: AuthTokenProvider;
  private _startEvent: EventEmitter<any>;
  private _endEvent: EventEmitter<any>;

  constructor(http: HttpClient, baseUrl: string, tokenProvider: AuthTokenProvider, start: EventEmitter<any>,
              end: EventEmitter<any>, private toastr: ToastrService) {
    this._http = http;
    this._baseUrl = baseUrl;
    this._tokenProvider = tokenProvider;
    this._startEvent = start;
    this._endEvent = end;
    this._request.authorize = true;
  }

  private getRequestOptions() {
    const r = this._request;
    const requestOptions = {} as any;
    if (r.authorize) {
      const tokenInfo = this._tokenProvider.getTokenInfo();
      if (tokenInfo) {
        r.headers.push({ name: tokenInfo.name, value: tokenInfo.value });
      }
    }

    if (r.headers && r.headers.length) {
      const headers = {};
      r.headers.forEach(header => {
        headers[header.name] = header.value;
      });
      requestOptions.headers = new HttpHeaders(headers);
    }
    requestOptions.withCredentials = false;
    return requestOptions;
  }

  url(url: string): IRequestBuilder {
    this._request.url = url;
    return this;
  }

  rowData(data: any): IRequestBuilder {
    this._request.data = data;
    return this;
  }

  json(data: any): IRequestBuilder {
    this._request.data = JSON.stringify(data);
    return this.hasJson();
  }

  header(name: string, value: string): IRequestBuilder {
    this._request.headers.push({ name, value });
    return this;
  }

  noAuth(): IRequestBuilder {
    this._request.authorize = false;
    return this;
  }

  needJson(): IRequestBuilder {
    this._request.headers.push({ name: 'Accept', value: 'application/json' });
    return this;
  }

  needUrlencode(): IRequestBuilder {
    this._request.headers.push({ name: 'Accept', value: 'application/x-www-form-urlencoded' });
    return this;
  }

  hasJson(): IRequestBuilder {
    this._request.headers.push({ name: 'Content-Type', value: 'application/json' });
    return this;
  }

  hasUrlencoded(): IRequestBuilder {
    this._request.headers.push({ name: 'Content-Type', value: 'application/x-www-form-urlencoded' });
    return this;
  }

  post<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this._startEvent.emit();
      const subscription = this._http.post(this._baseUrl + this._request.url, this._request.data, this.getRequestOptions())
        .subscribe((response: any) => {
          this.toastr.success(response.message);
          this.next(resolve, response); this._endEvent.emit();
        },
          (e) => { subscription.unsubscribe(); this._endEvent.emit(e); this.error(e, reject); });
    });
  }


  put<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this._startEvent.emit();
      const subscription = this._http.put(this._baseUrl + this._request.url, this._request.data, this.getRequestOptions())
        .subscribe((response) => { this.next(resolve, response); this._endEvent.emit(); },
          (e) => { subscription.unsubscribe(); this._endEvent.emit(); this.error(e, reject); });
    });

  }

  patch<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this._startEvent.emit();
      const subscription = this._http.patch(this._baseUrl + this._request.url, this._request.data, this.getRequestOptions())
        .subscribe((response) => { this.next(resolve, response); this._endEvent.emit(); },
          (e) => { subscription.unsubscribe(); this._endEvent.emit(); this.error(e, reject); });
    });

  }

  delete<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this._startEvent.emit();
      const subscription = this._http.delete(this._baseUrl + this._request.url, this.getRequestOptions())
        .subscribe((response) => { this.next(resolve, response); this._endEvent.emit(); },
          (e) => { subscription.unsubscribe(); this._endEvent.emit(); this.error(e, reject); });
    });

  }

  get<T>(queyParameters = ''): Promise<T> {
    return new Promise((resolve, reject) => {
      this._startEvent.emit();
      const options = this.getRequestOptions();
      options.params = queyParameters;
      const subscription = this._http.get(this._baseUrl + this._request.url, options)
        .subscribe((response) => { this.next(resolve, response); this._endEvent.emit(); },
          (e) => { subscription.unsubscribe(); this._endEvent.emit(); this.error(e, reject); });
    });
  }

  sendFile(file: File, progress: any): Observable<any> {
    const url = this._baseUrl + this._request.url;
    return Observable.create(observer => {
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append('file', file, file.name);


      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        progress(Math.round(event.loaded / event.total * 100));
      };
      xhr.open('POST', url, true);

      if (this._request.authorize) {
        const tokenInfo = this._tokenProvider.getTokenInfo();
        if (tokenInfo) {
          xhr.setRequestHeader(tokenInfo.name, tokenInfo.value);
        }
      }
      const serverFileName = xhr.send(formData);
    });
  }

  private error(e, callback) {
    if (e.status === 404) {
      callback('Requested resource not found');
    } else {
      this.toastr.error(e.error.error, 'Error', {
        timeOut: 3000
      });
      callback(e);
    }
  }

  private next(n, data): any {
    try {
      const d = data;
      if (n) {
        n(d);
      }
      return d;
    } catch (e) {
      if (n) {
        n({});
      }
      return {};
    }
  }
}
