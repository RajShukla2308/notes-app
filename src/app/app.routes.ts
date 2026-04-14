import { Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
    {
        path: '',
        // lazy loading
        loadComponent: () => import('../app/notes/notes.component').then(m=>m.NotesComponent),
        children:[
            {
                path:'add-note',
                loadComponent: ()=>import('./notes/add-note/add-note.component').then(m=>m.AddNoteComponent)
            }
        ]
    }
];
