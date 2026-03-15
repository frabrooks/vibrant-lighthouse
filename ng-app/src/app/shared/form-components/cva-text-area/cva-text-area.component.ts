import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Self, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormControlDirective, FormsModule, NgControl, ReactiveFormsModule } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  selector: 'fb-cva-text-area',
  templateUrl: './cva-text-area.component.html',
  styleUrls: ['./cva-text-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvaTextAreaComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, ControlValueAccessor {
  
  @Input() public label: string = '';
  @Input() public id: string = '';
  @Input() public name: string = '';
  @Input() public placeholder: string = 'Type here...';

  @Input() showErrors: boolean = false;
  @Input() requiredErrorMessage: string = 'This field is required';
  @Input() touchOnBlur: boolean = true;
  
  @Input() maxLength: number = 1000;
  @Input() autocomplete: 'on' | 'off' | string = 'on';
  @Input() autocorrect: 'on' | 'off' = 'on';
  @Input() dataLpIgnore: boolean = false;

  @Input() heightMode: 'resizeable' | 'fixed' | 'auto' = 'resizeable';
  @Input() showCharacterLimit: boolean = false;
  @Input() minHeight: string = '';
  @Input() maxHeight: string = '';
  
  @ViewChild('textarea', { static: true }) textarea: ElementRef<HTMLTextAreaElement> | undefined;

  onChange: any = () => {};
  onTouched: any = () => {};

  public disabled: boolean = false;
  private _destroyed$ = new Subject<void>();

  constructor(@Self() private _ngControl: NgControl, private _elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {
    this._ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    const control = this._ngControl.control;
    const validators = control?.validator ? [control.validator, this.validate] : this.validate;
    control?.setValidators(validators);
    control?.updateValueAndValidity();

    control?.statusChanges.pipe(takeUntil(this._destroyed$)).subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });

    if (this.isAutoResizeEnabled) {
      this._resize();
    }
  }

  public ngAfterViewInit(): void {
    if (this._elementRef.nativeElement.hasAttribute('ng-reflect-required') && this._ngControl instanceof FormControlDirective) {
      console.warn('The required attribute should not be used with reactive forms. Use the Validators.required validator instead.');
    }
  }

  public ngOnChanges(): void {
    this._resize();
    this._changeDetectorRef.markForCheck();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public writeValue(value: any): void {
    if (value !== undefined && this.textarea) {
      this.textarea.nativeElement.value = value ?? '';
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = (value: any) => {
      this._resize();
      fn(value);
    };
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /*
   * Null because we cannot say anything about the validity of the input in the abstract.
  */
  public validate(control: any): any {
    return null;
  }

  private _resize(): void {
    if (this.heightMode === 'auto' && this.textarea) {
      this.textarea.nativeElement.style.height = '1px';
      this.textarea.nativeElement.style.maxHeight = 'unset';
      this.textarea.nativeElement.style.minHeight = 'unset';

      const scrollHeight = this.textarea.nativeElement.scrollHeight;

      this.textarea.nativeElement.style.height = `${scrollHeight + 4}px`;
      this.textarea.nativeElement.style.maxHeight = this.maxHeight;
      this.textarea.nativeElement.style.minHeight = this.minHeight;
    }
  }

  public onBlur(): void {
    if (this.touchOnBlur) {
      this.onTouched();
    }
  }

  public onInput(event: Event): void {
    this.onChange((event.target as HTMLInputElement).value);
  }

  public get isAutoResizeEnabled(): boolean {
    return this.heightMode === 'auto';
  }

  public get isFixedHeight(): boolean {
    return this.heightMode === 'fixed';
  }

  public get isResizeable(): boolean {
    return this.heightMode === 'resizeable';
  }

  public get required(): boolean {
    if (!(this._ngControl.control as any).validator) {
      return false;
    } else {
      return !!((this._ngControl.control as any).validator({} as any) || {}).required;
    }
  }

  public get showErrorState(): boolean {
    return Boolean(this._ngControl.control?.invalid && this._ngControl.control?.touched && this.showErrors);
  }

  public get errorMessage(): string {
    
    if (!this.showErrorState) {
      return '';
    }

    let key: string = Object.keys(this._ngControl.control?.errors ?? {}).find((key: string) => typeof this._ngControl.control?.errors?.[key] === 'string') ?? '';

    let error = key ? this._ngControl.control?.errors?.[key] : '';

    if (error) return error;

    if (this._ngControl?.errors?.['required']) {
      return this.requiredErrorMessage;
    }
    return '';
  }

}


