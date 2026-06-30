import { Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('../app/notes/notes.component').then(m=>m.NotesComponent)
    },
    {
        path: 'add-note',
        loadComponent: ()=> import('../app/notes/add-note/add-note.component').then(m=>m.AddNoteComponent),
        //canActivate: authGuard
    },
    {
        path: 'update-note/:id', 
        loadComponent : () => import('../app/notes/add-note/add-note.component').then(m=>m.AddNoteComponent)
    },
    {
        path: 'search',
        loadComponent : () => import('./search-impl/search-impl.component').then(m=>m.SearchImplComponent)
    },
    {
        path:'userForm',
        loadComponent : () => import('./form-impl/form-impl.component').then(m=>m.FormImplComponent)
    },
    {
        path: 'hooks',
        loadComponent : () => import('./hooks/parent/parent.component').then(m=>m.ParentComponent)
    },
    {
        path:'product-operations',
        loadComponent : () => import('./practice-pages/get-search-products/get-search-products.component').then(m=>m.GetSearchProductsComponent)
    }
];
