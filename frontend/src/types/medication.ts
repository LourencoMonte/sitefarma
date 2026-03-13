export interface Medication {
  id: string;
  name: string;
  laboratory: string;
  dosage: string;
  quantity: number;
  price: number;
  description: string;
  available: boolean;
}

export interface MedicationContextType {
  medications: Medication[];
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  updateMedication: (id: string, medication: Omit<Medication, 'id'>) => void;
  deleteMedication: (id: string) => void;
  getMedicationById: (id: string) => Medication | undefined;
}