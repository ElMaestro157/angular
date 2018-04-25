import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '../../services';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnDestroy {

  public message: string;
  @ViewChild('childModal') modal: ModalDirective;

  private _subscriber: Subscription;

  constructor(private _changeDetector: ChangeDetectorRef, private _alertService: AlertService) { }

  ngOnInit() {
    this._subscriber = this._alertService.showing.subscribe((value: string) => {
      if (value) {
        this.message = value;
        this._changeDetector.markForCheck();
        this.modal.show();
      } else {
        this.modal.hide();
      }
    });
  }

  ngOnDestroy() {
    this._subscriber.unsubscribe();
  }

  ok() {
    this.modal.hide();
  }

}
