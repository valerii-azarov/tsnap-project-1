export interface BookingDetails {
  categoryId: number | null;
  serviceId: number | null;
  serviceTypeId: number | null;
  scheduleId: number | null;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  consent?: boolean;
}

export interface BookingCheck {
  regCode: number | null;
  phone: string;
}