import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";


@Component({
  standalone: true,
  imports: [],
  selector: 'grid-row',
  template: '<ng-content></ng-content>',
  styleUrls: ['./grid-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GridRowComponent {
  
  @Input() public alignItems: 'start' | 'center' | 'end' | 'stretch' = 'start';
  @Input() public justifyContent: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly' = 'start';

  @HostBinding('style.align-items') get alignItemsStyle() {
    return this.alignItems;
  }

  @HostBinding('style.justify-content') get justifyContentStyle() {
    return this.justifyContent;
  }

}