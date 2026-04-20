import { Component, inject, OnInit } from '@angular/core';
import { NoteServiceService } from '../note-service.service';
import { Note } from '../notes.model';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit{

  private notesService = inject(NoteServiceService);
  private router = inject(Router)

  notesData = this.notesService.notes$;

  constructor(){
    // const note:Note = {
    //   title: 'First note',
    //   content: 'this is content of first note',
    //   isPinned: false,
    //   id: crypto.randomUUID(),
    // }
    // this.notesService.addNote(note)
  }

  ngOnInit(): void {
   
  }

  addNote(){
    this.router.navigate(['add-note'])
    // const note:Note = {
    //   id: crypto.randomUUID(),
    //   title: 'First note',
    //   content: 'this is content of first note',
    //   isPinned: false,
    // }
    // this.notesService.addNote(note);
  }


  updateNote(note:Note){
    this.router.navigate(['update-note/',note.id])
  }

  deleteNote(id:string){
    this.notesService.deleteNote(id);
  }

}
