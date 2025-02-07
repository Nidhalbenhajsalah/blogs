import {
  provideRouter,
  RouterModule,
  Routes,
  withComponentInputBinding,
} from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddBlogComponent } from './add-blog/add-blog.component';

import { SideBarComponent } from './side-bar/side-bar.component';
import { BlogViewComponent } from './blog-view/blog-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: '',
    component: SideBarComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      { path: 'add-blog', component: AddBlogComponent },
      { path: ':id', component: BlogViewComponent },
    ],
  },
];
export const appConfig = [provideRouter(routes, withComponentInputBinding())];
