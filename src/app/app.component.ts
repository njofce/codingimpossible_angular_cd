import { Component, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-change-detection';

  offsetXObs$: BehaviorSubject<number>;

  constructor(private _zone: NgZone) {}

  trackObs(mouseClickedDrag$: Observable<MouseEvent>) {
    this.offsetXObs$ = new BehaviorSubject(0);
    this._zone.runOutsideAngular(() => {
      mouseClickedDrag$
      .subscribe((val: MouseEvent) => {
        this.offsetXObs$.next(val.offsetX);
      })
    });
  }

}