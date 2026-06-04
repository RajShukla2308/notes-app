import { Component, computed, effect, inject, input, NgZone, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Note } from '../../notes.model';
import { NoteServiceService } from '../../note-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-note',
  imports: [ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent implements OnInit{

  fb = inject(FormBuilder);
  notesService = inject(NoteServiceService)
  notesForm!: FormGroup;
  router = inject(Router);

  // name = input.required<string>();

  showIfDirective = false;

  private zone = inject(NgZone);

  


  // inject the activated route
  activatedRoute = inject(ActivatedRoute);
  // convert paramMap into signal - it is like using map/tap etc inside a subscriber.
  activatedRouteSignal = toSignal(this.activatedRoute.paramMap);
  // computed - Create a reactive value called noteId that always
  // reflects the current route id parameter
  currentNoteId = computed(()=>this.activatedRouteSignal()?.get('id'));
    

  ngOnInit(): void {
    this.notesForm = this.fb.group({
      title: ['',Validators.required],
      content: ['',Validators.required]
    })

    let id = this.currentNoteId()
    if(id){
      let currentNote = this.notesService.getNote(id);
      this.notesForm.patchValue({
        title: currentNote?.title,
        content: currentNote?.content
      })
    }

    this.zone.runOutsideAngular(()=>{
      // these changes wont get detected.
    })
  }

  onAddNote(){
    let id = this.currentNoteId();
    if(id){
       const note: Note = {
        id: id,
        title: this.notesForm?.value?.title,
        content: this.notesForm?.value?.content,
        isPinned: false
      }
      this.notesService.updateNote(note);
    }else{
      const note = {
        title: this.notesForm?.value?.title,
        content: this.notesForm?.value?.content,
        isPinned: false
      }
      this.notesService.addNote(note);
    }
    
    this.router.navigate([''])
  }
  

}
