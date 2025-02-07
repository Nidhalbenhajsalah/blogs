import { NgFor, NgStyle, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { Blog } from '../Blog';

@Component({
  selector: 'app-list',
  imports: [NgStyle, SlicePipe, NgFor, RouterOutlet, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  constructor(private blogsService: BlogsService) {}

  blogs: Blog[] = [];
  isEmptyList: boolean = false;
  ngOnInit(): void {
    // get blogs list
    this.blogsService.getBlogs().subscribe({
      next: (data: any) => {
        if (data.message === 'No blogs added yet!') {
          alert('No blogs added yet!');
          this.isEmptyList = true;
        } else {
          this.blogs = data;
        }
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);

        alert('Error fetching blogs. Please try again later.');
      },
    });
  }
  getBorderStyle(upvotes: number, downvotes: number): string {
    return upvotes >= downvotes ? '2px solid green' : '2px solid red';
  }

  updateVote(blog: Blog, type: 'up' | 'down'): void {
    if (type === 'up') {
      this.blogsService.upvoteBlog(blog._id).subscribe({
        next: (data) => {
          console.log(data);
          blog.upvotes += 1;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.blogsService.downvoteBlog(blog._id).subscribe({
        next: (data) => {
          console.log(data);
          blog.downvotes += 1;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  trackById(index: number, blog: Blog): string {
    return blog._id;
  }
}
