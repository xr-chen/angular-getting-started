import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomList } from '../room';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'hinv-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent implements OnInit {


  room: RoomList = {
    roomType: "",
    amenities: "",
    price: 0,
    photo: "",
    checkInTime: new Date(),
    checkOutTime: new Date(),
    rating: 0
  };

  successMessage: string = '';

  constructor(private roomService: RoomsService) { }

  ngOnInit(): void {
  }

  AddRoom(roomsForm: NgForm) {
    this.roomService.addRoom(this.room).subscribe(data => {
      this.successMessage = "Room Added Successful";
      // just reset the form
      // roomsForm.reset();
      // resetting with the default data
      roomsForm.resetForm({
        roomType: "",
        amenities: "",
        price: 0,
        photo: "",
        checkInTime: new Date(),
        checkOutTime: new Date(),
        rating: 0
      });
    });
  }

}
