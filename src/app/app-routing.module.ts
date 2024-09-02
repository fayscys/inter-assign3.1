import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'blog-form',
    loadChildren: () => import('./blog-form/blog-form.module').then( m => m.BlogFormPageModule)
  },
  {
    path: 'blog-list',
    loadChildren: () => import('./blog-list/blog-list.module').then( m => m.BlogListPageModule)
  },
  {
    path: 'blog-detail/:id',
    loadChildren: () => import('./blog-detail/blog-detail.module').then( m => m.BlogDetailPageModule)
  },
  {
    path: 'edit-post/:id',
    loadChildren: () => import('./edit-post/edit-post.module').then( m => m.EditPostPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
