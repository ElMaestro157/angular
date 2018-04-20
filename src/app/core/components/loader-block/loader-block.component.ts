import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderBlockServiceService } from '../../services';

@Component({
  selector: 'app-loader-block',
  templateUrl: './loader-block.component.html',
  styleUrls: ['./loader-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderBlockComponent implements OnInit, OnDestroy {

  private _show: boolean; // Boolean value of showing loader
  private _subscriber: Subscription;

  constructor(private _changeDetector: ChangeDetectorRef, private _loaderService: LoaderBlockServiceService) {
  }

  ngOnInit() {
    this._subscriber = this._loaderService.getShow.subscribe((val) => {
      this._show = val;
      this._changeDetector.markForCheck();
    });
  }

  ngOnDestroy() {
    this._subscriber.unsubscribe();
  }

  isShowed(): boolean {
    return this._show;
  }

}
