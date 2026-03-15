import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GridComponents } from 'src/app/shared/components/grid/grid.component';
import { CvaTextAreaComponent } from 'src/app/shared/form-components/cva-text-area/cva-text-area.component';
import { CvaTextInputComponent } from 'src/app/shared/form-components/cva-text-input/cva-text-input.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ...GridComponents,
    CvaTextAreaComponent,
    CvaTextInputComponent
  ],
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  public textAreaValue: string = '';
  public textInputValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
