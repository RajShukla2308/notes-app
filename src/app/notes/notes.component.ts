import { Component, inject, OnInit } from '@angular/core';
import { NoteServiceService } from '../note-service.service';
import { Note } from '../notes.model';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomDirective } from '../custom.directive';
import { IfDirective } from "../if.directive";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
  imports: [FormsModule, CustomDirective, IfDirective],
  
})
export class NotesComponent implements OnInit{

  private notesService = inject(NoteServiceService);
  private router = inject(Router)

  notesData = this.notesService.filteredList;

  searchTerm = '';



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

  searchNotes(){
    this.notesService.setSearchTerm(this.searchTerm)
  }

  pinNote(id: string){
    this.notesService.pinNote(id);
  }

  filterList(type: string){
    this.notesService.filterList(type);
  }

}
