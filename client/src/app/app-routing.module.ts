import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path : ''  , component: TodoComponent },   // The component which has an Empty path is going to be loaded first in the <router-outlet>
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
