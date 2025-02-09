export interface User {
  id:string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  birthDate: string;
  role: 'particulier' | 'collecteur';
  profilePicture?: string;
  collectorId?: string;



}
