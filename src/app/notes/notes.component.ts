import { Component, inject, OnInit } from '@angular/core';
import { NoteServiceService } from '../note-service.service';
import { Note } from '../notes.model';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomDirective } from '../custom.directive';
import { IfDirective } from "../if.directive";
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
  imports: [FormsModule, CustomDirective, IfDirective],
  
})
export class NotesComponent implements OnInit{

  private notesService = inject(NoteServiceService);
  private router = inject(Router)

  notesData = this.notesService.filteredNotes;

  searchTerm = '';


  // adding sbuject for debouncing - 
  private searchSubject = new Subject<string>();



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

    this.searchSubject.pipe(debounceTime(300)).subscribe(data=>{
      this.notesService.setSearchTerm(data);
    })
   
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
   // this.notesService.setSearchTerm(this.searchTerm)

   // debouncing with subject
   this.searchSubject.next(this.searchTerm);
  }

  pinNote(id: string){
    this.notesService.pinNote(id);
  }

  filterList(type: 'all' | 'pinned'){
    this.notesService.setFilterTerm(type)
  }

}
