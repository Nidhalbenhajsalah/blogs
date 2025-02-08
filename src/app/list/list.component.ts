import { NgFor, NgStyle, SlicePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { Blog } from '../Blog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [NgStyle, SlicePipe, NgFor, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  constructor(private blogsService: BlogsService) {}

  blogs: Blog[] = [];
  isEmptyList: boolean = false;
  currentPage: number = 1;
  limit: number = 3;
  totalPages: number = 0;
  searchTerm: string = '';

  ngOnInit(): void {
    this.loadBlogs(this.currentPage);
  }
  getBorderStyle(upvotes: number, downvotes: number): string {
    return upvotes >= downvotes ? '2px solid green' : '2px solid red';
  }

  updateVote(blog: Blog, type: 'up' | 'down'): void {
    if (type === 'up') {
      this.blogsService.upvoteBlog(blog._id).subscribe({
        next: () => {
          blog.upvotes += 1;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.blogsService.downvoteBlog(blog._id).subscribe({
        next: () => {
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

  loadBlogs(currentPage: number): void {
    this.blogsService
      .getPartialLoadBlogs(currentPage, this.limit, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          console.log(response);

          if (response.blogs.length === 0) {
            this.isEmptyList = true;
          } else {
            this.blogs = [...this.blogs, ...response.blogs];
            this.totalPages = response.totalPages;
            this.isEmptyList = false;
          }
        },
        error: (error) => {
          console.error('Error fetching blogs:', error);
        },
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.currentPage < this.totalPages
    ) {
      this.currentPage++;
      this.loadBlogs(this.currentPage);
    }
  }

  searchBlogs(): void {
    this.blogs = [];
    this.currentPage = 1;
    this.loadBlogs(this.currentPage);
  }
}
