
import {Component, inject, DestroyRef, OnDestroy} from '@angular/core';
import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NotificationService } from './notificationService';
import { interval, mergeMap , startWith, Subject, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-notifications',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit, OnDestroy {

  notifications: any[] = [];

  unreadCount = 0;

  destroyRef$ = inject(DestroyRef);

  helloInterval: any;

  constructor(
    private service: NotificationService
  ) {}

  ngOnInit() {

    //  use timer(0,5000) in place of interval(5000) to instantly start the api from 0th second.
    interval(5000)
      .pipe(
        startWith(0), // or use interval + startwith 0 to start the api call immediately.
        takeUntilDestroyed(this.destroyRef$),
        switchMap(() =>
          this.service.getNotifications('123')
        )
      )
      .subscribe(data => {

        // this.notifications.push(...data);
        //  use this with onpush 
        // this.notifications = [...this.notifications, ...data];



        // now modify our onpush so we dont get duplicate ids like 101,102,101,103,102 like this
        let map = new Map();

        [...this.notifications,...data].forEach(n=>map.set(n.id, n));
        this.notifications = [...map.values()]

        this.unreadCount =
          this.notifications
            .filter(n => !n.read)
            .length;
      });


    this.helloInterval = setInterval(()=>{
        console.log('hello')
      },5000)
  }

  markAsRead(id: number) {

    //  from line 58-65 - object is getting mutated directly in case of onpush.
    const item =
      this.notifications.find(
        x => x.id === id
      );

    if (item) {
      item.read = true;
    }

    // SOLUTION : dont mutate objects directly in case of onpush 
    this.notifications =
    this.notifications.map(n =>
        n.id === id
        ? { ...n, read: true }
        : n
    );

    // update unread count 
    this.unreadCount =
    this.notifications.filter(
        n => !n.read
    ).length;
  }


  ngOnDestroy(){
    clearInterval(this.helloInterval);
  }
}