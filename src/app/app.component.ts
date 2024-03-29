import { ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private _timer = 0;
  public title = 'app';

  constructor(private _zone: NgZone) {

  }

  ngOnInit() {
    this._zone.onUnstable.subscribe(() => {
      // console.log('Detection started');
      this._timer = performance.now();
    });
    this._zone.onStable.subscribe(() => {
      this._timer = -this._timer + performance.now();
      console.log('Detection ended. Time: ', this._timer, ' ms');
    });
  }

  ngOnDestroy() {
    this._zone.onUnstable.unsubscribe();
    this._zone.onStable.unsubscribe();
  }
}
