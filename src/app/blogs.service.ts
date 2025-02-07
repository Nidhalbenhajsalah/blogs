import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private apiUrl = 'http://localhost:3000/api/blogs';

  constructor(private http: HttpClient) {}

  // get blogs
  getBlogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // add blog
  addBlog(blog: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, blog);
  }

  getBlogById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  upvoteBlog(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/upvote/${id}`, {});
  }

  downvoteBlog(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/downvote/${id}`, {});
  }
}
