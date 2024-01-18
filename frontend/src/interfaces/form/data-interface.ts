export interface Data {
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  consent: boolean;
  [key: string]: string | boolean;
}
