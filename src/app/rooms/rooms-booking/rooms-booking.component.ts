import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  id$: Observable<string | null>;

  constructor(private route: ActivatedRoute) {
    this.id$ = route.paramMap.pipe(map(params => params.get('roomid')));
  }

  ngOnInit(): void {
  }

}
