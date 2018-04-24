import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';

import { ConfirmWindowService } from '../../services';

@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmWindowComponent implements OnInit, OnDestroy {

  public message: string;
  @ViewChild('childModal') modal: ModalDirective;

  private _subscriber: Subscription;

  constructor(private _changeDetector: ChangeDetectorRef, private _windowService: ConfirmWindowService) {
  }

  ngOnInit() {
    this._subscriber = this._windowService.isShowed.subscribe((val) => {
      if (val) {
        this.message = val;
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

  confirm() {
    this._windowService.agreed();
  }

  decline() {
    this._windowService.notAgreed();
  }

}
