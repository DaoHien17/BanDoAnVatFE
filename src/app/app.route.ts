import { Routes } from '@angular/router';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
export const AppRoute: Routes = [
  { path: '', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)},
  { path: 'not-found', component: NotFoundComponentComponent },
  { path: '**', redirectTo:'not-found', pathMatch:'full'}
];
