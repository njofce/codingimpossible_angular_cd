import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[appMouseEvent]'
})
export class MouseEventDirective {

  private destroy$ = new Subject<void>();

  @Output()
  emitObs: EventEmitter<Observable<MouseEvent>> = new EventEmitter();

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    this.observeEvents(this._elementRef.nativeElement);
  }

  private observeEvents(nativeElement: any) {
    let mouseDown$ = fromEvent(nativeElement, 'mousedown', { passive: false });
    let mouseUp$ = fromEvent(document, 'mouseup', { passive: false });
    let mouseMove$ = fromEvent(nativeElement, "mousemove", { passive: false });

    let mouseClickedDrag$: Observable<MouseEvent> = mouseDown$.pipe(
      switchMap((ev: MouseEvent) =>
        mouseMove$.pipe(
          tap((ev: MouseEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
          }),
          takeUntil(mouseUp$)
        )
      ),
      takeUntil(this.destroy$)
    );
    
    this.emitObs.emit(mouseClickedDrag$)
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}