import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  fetchNotes(): any{
    return this._http.get( "api/notes" );
  }

  createNote( newNote: any ): any {
    return this._http.post( "/api/notes", newNote )
  }
}
