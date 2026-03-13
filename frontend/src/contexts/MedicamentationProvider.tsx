import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Medication } from '@/types/medication';
import { MedicationContext } from './MedicationContext';

// Dados mock iniciais
const initialMedications: Medication[] = [
  {
    id: '1',
    name: 'Dipirona 500mg',
    laboratory: 'Medley',
    dosage: '500mg',
    quantity: 150,
    price: 8.50,
    description: 'Analgésico e antitérmico',
    available: true
  },
  {
    id: '2',
    name: 'Paracetamol 750mg',
    laboratory: 'EMS',
    dosage: '750mg',
    quantity: 200,
    price: 12.90,
    description: 'Analgésico e antitérmico para dores leves a moderadas',
    available: true
  },
  {
    id: '3',
    name: 'Ibuprofeno 600mg',
    laboratory: 'Novartis',
    dosage: '600mg',
    quantity: 80,
    price: 18.70,
    description: 'Anti-inflamatório não esteroidal',
    available: true
  },
  {
    id: '4',
    name: 'Amoxicilina 500mg',
    laboratory: 'Eurofarma',
    dosage: '500mg',
    quantity: 0,
    price: 25.40,
    description: 'Antibiótico de amplo espectro',
    available: false
  },
  {
    id: '5',
    name: 'Omeprazol 20mg',
    laboratory: 'Teuto',
    dosage: '20mg',
    quantity: 120,
    price: 15.30,
    description: 'Inibidor da bomba de prótons',
    available: true
  },
  {
    id: '6',
    name: 'Losartana 50mg',
    laboratory: 'Sandoz',
    dosage: '50mg',
    quantity: 95,
    price: 22.80,
    description: 'Anti-hipertensivo',
    available: true
  }
];

export function MedicationProvider({ children }: { children: ReactNode }) {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);

  const addMedication = (medication: Omit<Medication, 'id'>) => {
    const newMedication: Medication = {
      ...medication,
      id: Date.now().toString()
    };
    setMedications([...medications, newMedication]);
  };

  const updateMedication = (id: string, medication: Omit<Medication, 'id'>) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...medication, id } : med
    ));
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const getMedicationById = (id: string) => {
    return medications.find(med => med.id === id);
  };

  return (
    <MedicationContext.Provider value={{
      medications,
      addMedication,
      updateMedication,
      deleteMedication,
      getMedicationById
    }}>
      {children}
    </MedicationContext.Provider>
  );
}