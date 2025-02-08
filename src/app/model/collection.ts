export interface Collection {
  id: string;
  particularId: string;
  wasteType: string[];
  photo?: string;
  collectionAddress: string;
  estimatedWeight: number;
  collectionDate: string;
  collectionTime: string;
  notes?: string;
  status: 'pending' | 'occupied' | 'in-progress' | 'validated' | 'rejected';
}
