import { Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
    {
        path: '',
        // lazy loading
        loadComponent: () => import('../app/notes/notes.component').then(m=>m.NotesComponent)
    }
];
