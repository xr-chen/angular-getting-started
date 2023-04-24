import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../room';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() rooms: RoomList[] = [];

  @Input() title: String = "";

  @Input() price: number | null = 0;

  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() { }
  ngOnDestroy(): void {
    console.log("On destroy gets called!")
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      console.log("Previous title is: " + changes['title'].previousValue);
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {
  }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }

}
