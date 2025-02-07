import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { Blog } from '../Blog';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-blog-view',
  imports: [RouterLink, CommonModule],
  templateUrl: './blog-view.component.html',
  styleUrl: './blog-view.component.scss',
})
export class BlogViewComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogsService: BlogsService
  ) {}

  blogData$ = new BehaviorSubject<Blog | null>(null);

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (!(id === '')) {
      this.blogsService.getBlogById(id).subscribe({
        next: (data) => this.blogData$.next(data),
        error: (error) => alert('Error fetching blog: ' + error.message),
      });
    }
  }

  updateVote(type: 'up' | 'down'): void {
    const blog = this.blogData$.value;
    if (!blog) {
      alert('Error fetching blog');
      return;
    }

    let update;
    if (type === 'up') {
      update = this.blogsService.upvoteBlog(blog._id);
    } else {
      update = this.blogsService.downvoteBlog(blog._id);
    }

    update.subscribe({
      next: (data) => {
        const updatedBlog = {
          ...blog,
          upvotes: blog.upvotes + (type == 'up' ? 1 : 0),
          downvotes: blog.downvotes + (type == 'down' ? 1 : 0),
        };
        this.blogData$.next(updatedBlog);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
