export enum BookingStatus {
  pending = "pending",
  confirmed = "confirmed",
  cancelled = "cancelled",
  completed = "completed",
}

export interface Booking {
  id: number | null;
  status: BookingStatus;
  category: string;
  service: string;
  service_type: string;
  date: Date;
  time: string;
  city: string;
  address: string;
  region: string;
}