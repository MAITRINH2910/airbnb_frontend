import { User } from './user.model';

export class House {
    id: number
    title: string;
    description: string;
    bedRoomNumber: number;
    bathRoomNumber: number;
    address: string;
    pricePerNight: number;
    pricePerMonth: number;
    typeHouse: string;
    typeRoom: string;
    user: User;
    utilities: string[];
    maxGuest: number;
    status: boolean;
}