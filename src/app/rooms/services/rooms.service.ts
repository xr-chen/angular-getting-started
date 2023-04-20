import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { environment } from 'src/environments/environment';
import { RoomList } from '../room';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  roomList: RoomList[] = [];
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient) {
    console.log("Room service initialized!");
    console.log(this.config.apiEndpoint);
  }

  // this is a property of the class not a method, `$`indicates this is a stream
  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(shareReplay(1));

  getRooms(): Observable<RoomList[]> {
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList): Observable<RoomList[]> {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList): Observable<RoomList[]> {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string): Observable<RoomList[]> {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest("GET", "https://jsonplaceholder.typicode.com/photos", { reportProgress: true });
    return this.http.request(request);
  }
}
