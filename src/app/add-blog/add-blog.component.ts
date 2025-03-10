import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-blog',
  imports: [ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss',
})
export class AddBlogComponent {
  form!: FormGroup;

  constructor(private blogsService: BlogsService, private router: Router) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.blogsService.addBlog(this.form.value).subscribe({
      next: (data) => {
        // redirect to list using router
        this.router.navigate(['/list']);

        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
    console.log(this.form.value);
  }
}
