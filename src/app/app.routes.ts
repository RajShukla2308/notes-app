import { Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('../app/notes/notes.component').then(m=>m.NotesComponent)
    },
    {
        path: 'add-note',
        loadComponent: ()=> import('../app/notes/add-note/add-note.component').then(m=>m.AddNoteComponent)
    },
    {
        path: 'update-note/:id',
        loadComponent : () => import('../app/notes/add-note/add-note.component').then(m=>m.AddNoteComponent)
    }
];
