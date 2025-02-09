export interface Collection {
  id: string;
  particularId: string;
  wasteItems: WasteDetail[];
  photo?: string;
  collectionAddress: string;
  collectionDate: string;
  collectionTime: string;
  notes?: string;
  status: 'pending' | 'occupied' | 'in-progress' | 'validated' | 'rejected';
}
export interface WasteDetail {
  type: string;
  weight: number;
}
