import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;

  constructor(private configService: ConfigService, private fb: FormBuilder) { }

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      roomId: new FormControl({ value: '2', disabled: true }, {validators: [Validators.required]}),
      // new FormControl('') and [''] represent the same thing
      guestEmail: ['', [Validators.email, Validators.required]],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      guestName: ['', [Validators.required, Validators.minLength(5)]],
      address: this.fb.group({
        addressLine1: ['', {validators: [Validators.required]}],
        addressLine2: [''],
        city: ['', {validators: [Validators.required]}],
        state: ['', {validators: [Validators.required]}],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([
        this.addGuestControl()
      ]),
      tnc: new FormControl(false, {validators: Validators.requiredTrue})
    })
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    this.bookingForm.reset({
      roomId: 2,
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  addGuest() {
    this.guests.push(
      this.addGuestControl()
    );
  }

  private addGuestControl(): any {
    return this.fb.group({ guestName: ['', {validators: [Validators.required]}], age: new FormControl('') });
  }

  addPassport() {
    this.bookingForm.addControl("passport", new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.contains("passport")) {
      this.bookingForm.removeControl("passport");
    }
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}

// export class Booking {
//   roomId: string;
//   guestEmail: string;
//   checkinDate: Date;
//   checkoutDate: Date;
//   bookingStatus: string;
//   bookingAmount: number;
//   bookingDate: Date;
//   mobileNumber: string;
//   guestName: string;
//   guestAddress: string;
//   guestCity: string;
//   guestState: string;
//   guestCountry: string;
//   guestZipCode: string;
//   guestCount: number;
//   guestList: Guest[];
// }