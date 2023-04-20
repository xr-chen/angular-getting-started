import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, DoCheck, Host, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { catchError, from, map, Observable, of, Subject } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { Room, RoomList } from './room';
import { RoomsService } from './services/rooms.service';
import { ConfigService } from '../services/config.service';


@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, AfterViewInit {
  hotelName = 'Hilton Hotel';

  numberOfRooms = 10;

  hidenRooms = false;

  title = "Room List";

  selectedRoom!: RoomList;

  error$ : Subject<string> = new Subject();

  getError$ : Observable<string> = this.error$.asObservable();

  rooms$ = this.roomService.getRooms$.pipe(
    catchError((err, caught) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  roomCount$ = this.roomService.getRooms$.pipe(
    map(rooms => rooms.length)
  );

  rooms: Room = {
    totalRoom: 20,
    availableRoom: 15,
    occupiedRoom: 5
  };

  roomList: RoomList[] = []

  // stream: Observable<string> = new Observable<string>(observer => {
  //   observer.next("user1");
  //   observer.next("user2");
  //   observer.next("user3");
  //   observer.complete();
  // })

  stream: Observable<string> = of("user1", "user2", "user3");

  totalBytes: number = 0;

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  constructor(private roomService: RoomsService, private configService: ConfigService) { }

  display(): void {
    console.log(this.rooms);
    console.log(this.rooms.availableRoom);
  }

  ngOnInit(): void {
    // this.roomList = this.roomService.getRooms();
    this.stream.subscribe({
      next(next) { console.log(next) },
      complete: () => console.log("done"),
      error(error) { console.log(error) },
    });
    this.stream.subscribe(data => console.log(data));
    // this.roomService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });
    this.roomService.getPhotos().subscribe(event => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log("Request has been made");
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log("Request success");
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    });
  }

  ngAfterViewInit(): void {
    // console.log("view child: ", this.headerComponent);
    // console.log("view children: ", this.headerChildrenComponent)
    this.headerComponent.title = "Welcome to " + this.hotelName;

    this.headerChildrenComponent.last.title = "Last title";
  }

  toggle() {
    this.hidenRooms = !this.hidenRooms;
    this.title = "Rooms";
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: "4",
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 1000,
      photo: "https://images.unsplash.com",
      checkInTime: new Date('11-Nov-2021'),
      checkOutTime: new Date('12-Nov-2021'),
      rating: 3.5
    };
    // this.roomList.push(room); 
    // must pass an immutable object
    // this.roomList = [...this.roomList, room];
    this.roomService.addRoom(room).subscribe(data => this.roomList = data);
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: "3",
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 1000,
      photo: "https://images.unsplash.com",
      checkInTime: new Date('11-Nov-2021'),
      checkOutTime: new Date('12-Nov-2021'),
      rating: 3.5
    };
    this.roomService.editRoom(room).subscribe(room => this.roomList = room);
  }

  deleteRoom() {
    this.roomService.deleteRoom('3').subscribe(data => this.roomList = data);
  }

}
