import { Injectable, signal } from '@angular/core';
import { Note } from './notes.model';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  constructor() { }


  // signal - A reactive state container which holds the data - starts with empty array
  // and tracks the changes
  private notes = signal<Note[]>([]);

  // notes$ is readonly version of signal, notes is writable signal
  notes$ = this.notes.asReadonly();


  addNote(note: any){
    const newNote: Note = {
      id: crypto.randomUUID(),
      ...note
    }
    this.notes.update(previousNotes=>[...previousNotes,newNote]);
  }

  updateNote(updateNote: Note){
    this.notes.update(previousNotes=>
      previousNotes.map(note=>{
        if(note.id == updateNote.id){
          return {...updateNote}
        }
        return note;
      })
    )
  }

  deleteNote(id:string){
    this.notes.update(previousNotes=>
      previousNotes.filter(note=> note.id !== id)
    )
  }



  getNote(id:string){
    return this.notes().find(note=> note.id== id)
  }



}
