import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { Blog } from '../Blog';
@Component({
  selector: 'app-blog-view',
  imports: [RouterLink],
  templateUrl: './blog-view.component.html',
  styleUrl: './blog-view.component.scss',
})
export class BlogViewComponent implements OnInit {
  /**
   *
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogsService: BlogsService
  ) {}

  blogData!: Blog;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (!(id === '')) {
      this.blogsService.getBlogById(id).subscribe({
        next: (data) => {
          this.blogData = data;
        },
        error: (error) => {
          alert('Error fetching blog:' + error.message);
        },
      });
    }
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
}
