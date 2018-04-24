import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';

import { LoaderBlockServiceService } from '../../services';

@Component({
  selector: 'app-loader-block',
  templateUrl: './loader-block.component.html',
  styleUrls: ['./loader-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderBlockComponent implements OnInit, OnDestroy {

  private _subscriber: Subscription;

  @ViewChild('childModal') modal: ModalDirective;

  constructor(private _loaderService: LoaderBlockServiceService) {
  }

  ngOnInit() {
    this._subscriber = this._loaderService.getShow.subscribe((val) => {
      val ? this.modal.show() : this.modal.hide();
    });
  }

  ngOnDestroy() {
    this._subscriber.unsubscribe();
  }
}
