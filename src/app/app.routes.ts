import { Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { AddBlogComponent } from './shared/Blog/add-blog/add-blog.component';
import { GetBlogByMemberIdComponent } from './shared/Blog/get-blog/get-blog-by-member-id/get-blog-by-member-id.component';
import { ReadBlogComponent } from './shared/Blog/read-blog/read-blog/read-blog.component';
import { ProfileDetailsComponent } from './features/profile/profile-details/profile-details.component';
import { UpdateBlogComponent } from './features/profile/update-blog/update-blog.component';

export const routes: Routes = [
{ path: '', redirectTo: 'homepage', pathMatch: 'full' },
{ path: 'homepage', component:HomepageComponent},   
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'addblog',component:AddBlogComponent},
{path:'read/:id',component:ReadBlogComponent},
{path:'updateBlog/:id',component:UpdateBlogComponent},
{path:'getBlogs',component:GetBlogByMemberIdComponent},
{path:'profileDetails',component:ProfileDetailsComponent}



];
