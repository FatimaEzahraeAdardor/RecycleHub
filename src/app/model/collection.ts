export interface Collection {
  id: string;
  particularId: string;
  type: string;
  photo?: string;
  address: string;
  weight: number;
  dateTime: string;
  note?: string;
  status: 'pending' | 'occupied' | 'in-progress' | 'validated' | 'rejected';
}
