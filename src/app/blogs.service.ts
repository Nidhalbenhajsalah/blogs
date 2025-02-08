import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from './Blog';
@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private apiUrl = 'http://localhost:3000/api/blogs';

  constructor(private http: HttpClient) {}

  // get blogs
  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  // add blog
  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blog);
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  upvoteBlog(id: string): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/upvote/${id}`, {});
  }

  downvoteBlog(id: string): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/downvote/${id}`, {});
  }

  getPartialLoadBlogs(
    currentPage: number,
    limit: number,
    search: string
  ): Observable<any> {
    const params = {
      currentPage: currentPage,
      limit: limit,
      search: search,
    };
    return this.http.get(this.apiUrl, { params });
  }
}
