export interface Room {
    totalRoom?: number;
    availableRoom?: number;
    occupiedRoom?: number;
}

export interface RoomList {
    roomNumber?: string;
    roomType: string;
    amenities: string;
    price: number;
    photo: string;
    checkInTime: Date;
    checkOutTime: Date;
    rating: number;
}