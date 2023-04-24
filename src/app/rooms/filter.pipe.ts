import { Pipe, PipeTransform } from '@angular/core';
import { RoomList } from './room';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(rooms: RoomList[], price: number | null): RoomList[] {
    if (price == null) {
      return rooms;
    }
    return rooms?.filter(room => room.price > price);
  }

}
