import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  timer = 0;
  title = 'app';

  constructor(private zone: NgZone) {
    this.zone.onUnstable.subscribe(() => {
      // console.log('Detection started');
      this.timer = performance.now();
    });
    this.zone.onStable.subscribe(() => {
      this.timer = -this.timer + performance.now();
      console.log('Detection ended. Time: ', this.timer, ' ms');
    });
  }
}
