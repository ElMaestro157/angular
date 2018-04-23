import { ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  timer = 0;
  title = 'app';

  constructor(private _zone: NgZone) {

  }

  ngOnInit() {
    this._zone.onUnstable.subscribe(() => {
      // console.log('Detection started');
      this.timer = performance.now();
    });
    this._zone.onStable.subscribe(() => {
      this.timer = -this.timer + performance.now();
      console.log('Detection ended. Time: ', this.timer, ' ms');
    });
  }

  ngOnDestroy() {
    this._zone.onUnstable.unsubscribe();
    this._zone.onStable.unsubscribe();
  }
}
