import { Directive, ElementRef, Host, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hinvHover]'
})
export class HoverDirective implements OnInit {

  @Input() hinvHover: string = 'green';

  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log(element.nativeElement.style.backgroundColor);
  }

  ngOnInit(): void {
    // this.element.nativeElement.style.backgroundColor = this.color;

  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.element.nativeElement, "backgroundColor", this.hinvHover);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', '');
  }

}
