import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, ViewEncapsulation, HostBinding } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GridRowComponent } from "./components/grid-row/grid-row.component";
import { GridColComponent } from "./components/grid-col/grid-col.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  selector: 'grid',
  template: '<ng-content></ng-content>',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
class GridComponent {

  @HostBinding('class.grid') _: boolean = true;

}

export { GridComponent, GridRowComponent, GridColComponent };
export const GridComponents = [GridComponent, GridRowComponent, GridColComponent];
