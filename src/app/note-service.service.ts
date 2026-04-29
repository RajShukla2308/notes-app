import { computed, Injectable, signal } from '@angular/core';
import { Note } from './notes.model';
import { initialNotes } from './notes-data.constants';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  constructor() { }


  // signal - A reactive state container which holds the data - starts with empty array
  // and tracks the changes
  private notes = signal<Note[]>(initialNotes);

  // notes$ is readonly version of signal, notes is writable signal
  notes$ = this.notes.asReadonly();


  // search functionality
  // searchTerm = signal('');
  // filteredList = computed(()=>{
  //   let term = this.searchTerm().toLowerCase();
  //   if(!term) return this.notes();
  //   return this.notes().filter(note=> note.title.toLowerCase().includes(term));
  //   }
  // )


  // filter functionality
  // filterTerm = signal<'all' | 'pinned'>('all');
  // filteredNotes = computed(()=>{
  //   let term = this.filterTerm();
  //   if(term == 'pinned') return this.notes().filter(note=> note.isPinned === true);
  //   return this.notes();
  // })

  // combined search + filter functionality
  searchTerm = signal('');
  filterTerm = signal<'all' | 'pinned'>('all');
  filteredNotes = computed(()=>{

    let notes = this.notes();

    let searchTerm = this.searchTerm().toLowerCase();

    if(searchTerm){
      notes = [...notes.filter(note=> note?.title?.toLowerCase().includes(searchTerm))];
    }

    if(this.filterTerm() == 'pinned'){
      notes = [...notes.filter(note=> note?.isPinned == true)]
    }
    console.log('returning notes',notes)
    return notes;
  })


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

  setSearchTerm(term: string){
    this.searchTerm.set(term);
  }

  setFilterTerm(type: 'all' | 'pinned'){
    this.filterTerm.set(type);
  }

  pinNote(id: string){
    this.notes.update(previousNotes=>
      previousNotes.map(note=>{
        if(note.id === id){
          return {
            ...note, 
            isPinned: !note.isPinned
          }
        }
        return note;
      })
    )
  }


}
