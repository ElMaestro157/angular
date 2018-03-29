import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: '[appCourseDate]'
})
export class CourseDateDirective implements OnInit {

  @Input() appCourseDate: Date;

  constructor(private el: ElementRef, private renderer: Renderer) {  }

  ngOnInit() {
    const date = new Date();
    date.setDate(date.getDate() - 14);
    if (this.appCourseDate.valueOf() <= Date.now() && this.appCourseDate > date) {
      this.renderer.setElementStyle(this.el.nativeElement, 'border', 'solid 5px #77CC02');
    } else if (this.appCourseDate.valueOf() > Date.now()) {
      this.renderer.setElementStyle(this.el.nativeElement, 'border', 'solid 5px #2D7DD2');
    }
  }
}
