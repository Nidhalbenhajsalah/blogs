import { NgFor, NgStyle, SlicePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
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
  currentPage = 1;
  pageSize = 2;
  totalPages = 0;
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.currentPage < this.totalPages
    ) {
      this.currentPage++;
      this.loadBlogs(this.currentPage);
    }
  }

  ngOnInit(): void {
    // get blogs list
    // this.blogsService.getBlogs().subscribe({
    //   next: (data: any) => {
    //     if (data.message === 'No blogs added yet!') {
    //       alert('No blogs added yet!');
    //       this.isEmptyList = true;
    //     } else {
    //       this.blogs = data;
    //     }
    //   },
    //   error: (error) => {
    //     console.error('Error fetching blogs:', error);
    //     alert('Error fetching blogs. Please try again later.');
    //   },
    // });
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

  loadBlogs(page: number): void {
    this.blogsService.getPartialLoadBlogs(page, this.pageSize).subscribe({
      next: (response: any) => {
        console.log(response);

        this.blogs = [...this.blogs, ...response.blogs];
        this.totalPages = response.totalPages;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
