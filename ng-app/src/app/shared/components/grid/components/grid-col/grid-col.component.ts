import { Component, ElementRef, HostBinding, HostListener, Inject, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { BREAKPOINTS_TOKEN, Breakpoints } from "src/app/shared/_types/shared.types";

@Component({
  standalone: true,
  imports: [],
  selector: 'grid-col',
  template: '<ng-content></ng-content>',
  styleUrls: ['./grid-col.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridColComponent implements OnInit {

  @Input() public justify?: 'start' | 'center' | 'stretch' | 'end';

  private _screenWidth?: number;
  private _documentFontSize: number = parseFloat(getComputedStyle(document.documentElement).fontSize);

  constructor(@Inject(BREAKPOINTS_TOKEN) private _breakpoints: Breakpoints, private _elementRef: ElementRef) {
    if (typeof window !== 'undefined') {
      this._screenWidth = window.innerWidth;
    }
  }

  public ngOnInit(): void {
    this.setComponentStyle();
  }

  public pxToRem(px: number): number {
    if (typeof window === 'undefined') {
      return px / 16;
    } else {
      return px / this._documentFontSize;
    }
  }

  public setComponentStyle(): any {
    let style: any = {
      justifyContent: this.justify || 'start',
    };

    if (this._screenWidth) {
      const breakpoints = this._breakpoints.breakpoints;
      const unit: 'px' | 'rem' = this._breakpoints.convertToRem ? 'rem' : 'px';
      const mobileFirst = this._breakpoints.mobileFirst;

      let activeBreakpoints: string[] = [];

      for (const [breakpoint, value] of breakpoints) {
        const _value = unit === 'rem' ? this.pxToRem(value) : value;
        if (mobileFirst) {
          if (this.pxToRem(this._screenWidth) >= _value) {
            activeBreakpoints.push(breakpoint);
          }
        } else {
          if (this.pxToRem(this._screenWidth) < _value) {
            activeBreakpoints.push(breakpoint);
          }
        }
      }

      if (this._elementRef.nativeElement.hasAttribute('span')) {
        const span = this._elementRef.nativeElement.getAttribute('span');
        if (span === '0') {
          style.display = 'none';
        } else {
          style.display = 'block';
          style['grid-column'] = `span ${span}`;
        }
      }

      activeBreakpoints?.forEach((activeBreakpoint) => {
        if (this._elementRef.nativeElement.hasAttribute(activeBreakpoint)) {
          const _value = this._elementRef.nativeElement.getAttribute(activeBreakpoint);
          if (Number(_value) === 0) {
            style.display = 'none';
          } else {
            style.display = 'block';
            style['grid-column'] = `span ${_value}`;
          }
        }
      });

      Object.keys(style).forEach((key) => {
        this._elementRef.nativeElement.style[key] = style[key];
      });

    } else {
      style = {
        display: 'block',
        justifyContent: this.justify || 'start',
      };

      this._elementRef.nativeElement.style = style;
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {
    if (typeof window !== 'undefined') {
      this._screenWidth = window.innerWidth;
    }
    this.setComponentStyle();
  }

}


