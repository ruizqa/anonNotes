import { Component, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  note:any;
  notes: any;
  error:any;
  newError=false;

  constructor(private _httpService: HttpService,
              private _router:Router,
               private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.resetNewNote()
    this.fetchNotes()
  }

  resetNewNote(){
    this.note = { content:""}
  }

  create(event:any):void {
    event.preventDefault();
    let observable = this._httpService.createNote(this.note);
    observable.subscribe( (data: any ) => {
      this.newError=false;
      this.fetchNotes()
    },
    ( error: any ) => {
      console.log( error );
      this.newError = true;
      this.error = error.statusText;
    });
    
  }

  fetchNotes(){
    let observable = this._httpService.fetchNotes()
    observable.subscribe( (data: any ) => {
      //console.log(data);
      this.notes = data
      this.notes.map((note:any)=> {
        note['createdAt'] = (new Date (note['createdAt'])).toDateString() + ' ' +  (new Date (note['createdAt'])).toLocaleTimeString('en-US')
        return note;
      })
      console.log(this.notes);
      
    },
    ( error: any ) => {
      console.log( error );
    });


  }


}
