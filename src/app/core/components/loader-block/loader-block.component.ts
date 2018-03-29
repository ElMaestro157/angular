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

  private show: boolean;
  private subscriber: Subscription;

  constructor(private ref: ChangeDetectorRef, private loaderService: LoaderBlockServiceService) {
  }

  ngOnInit() {
    this.subscriber = this.loaderService.getShow.subscribe((val) => {
      this.show = val;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  isShowed(): boolean {
    return this.show;
  }

}
