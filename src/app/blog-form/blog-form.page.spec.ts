import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogFormPage } from './blog-form.page';

describe('BlogFormPage', () => {
  let component: BlogFormPage;
  let fixture: ComponentFixture<BlogFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
