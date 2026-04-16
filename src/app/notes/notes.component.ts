import { Component, inject, OnInit } from '@angular/core';
import { NoteServiceService } from '../note-service.service';
import { Note } from '../notes.model';

@Component({
  selector: 'app-notes',
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit{

  private notesService = inject(NoteServiceService);

  notesData = this.notesService.notes$;

  constructor(){
    const note:Note = {
      title: 'First note',
      content: 'this is content of first note',
      isPinned: false,
      id: crypto.randomUUID(),
    }
    this.notesService.addNote(note)
  }

  ngOnInit(): void {
   
  }

  addNote(){
    const note:Note = {
      id: crypto.randomUUID(),
      title: 'First note',
      content: 'this is content of first note',
      isPinned: false,
    }
    this.notesService.addNote(note);
  }


  updateNote(note:Note){
    note.content = 'content of second note';
    note.title = 'second note'
    this.notesService.updateNote(note);
  }

  deleteNote(id:string){
    this.notesService.deleteNote(id);
  }

}
