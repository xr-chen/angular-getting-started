import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) { }

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomid');
      this.bookingForm = this.fb.group({
        roomId: new FormControl({ value: roomId, disabled: true }, { validators: [Validators.required] }),
        // new FormControl('') and [''] represent the same thing
        guestEmail: ['', { updateOn: 'blur', validators: [Validators.email, Validators.required] }],
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        // blur is an event which will be called once moving out of the control
        // default behaviour is the change event will be called every time pressing the keyboard
        mobileNumber: ['', { updateOn: 'blur' }],
        guestName: ['', [Validators.required,
        Validators.minLength(5),
        CustomValidator.ValidateName,
        CustomValidator.ValidateSpecialChar('*')
        ]
        ],
        address: this.fb.group({
          addressLine1: ['', { validators: [Validators.required] }],
          addressLine2: [''],
          city: ['', { validators: [Validators.required] }],
          state: ['', { validators: [Validators.required] }],
          country: [''],
          zipCode: [''],
        }),
        guests: this.fb.array([
          this.addGuestControl()
        ]),
        tnc: new FormControl(false, { validators: Validators.requiredTrue })
      }, { updateOn: 'blur', validators: [CustomValidator.ValidateDate] });
    this.getBookingData();
    // this.bookingForm.valueChanges.subscribe(data => console.log(data));
    this.bookingForm.valueChanges.pipe(
      mergeMap(data => this.bookingService.bookRoom(data))
    ).subscribe(data => console.log(data));
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe(data => console.log(data));
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

  getBookingData() {
    // patchValue is more flexible than setValue, we don't need set every fields of the form
    this.bookingForm.patchValue({
      guestEmail: 'test@gmail.com',
      checkinDate: new Date(),
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
      // guests: [],
      tnc: false,
    });
  }

  private addGuestControl(): any {
    return this.fb.group({ guestName: ['', { validators: [Validators.required] }], age: new FormControl('') });
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