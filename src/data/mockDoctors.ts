
export interface Doctor {
  name: string;
  specialty: string[];
  experience: string;
  fees: number;
}

export const mockDoctors: Doctor[] = [
  { name: "Dr. John Doe", specialty: ["Dentist"], experience: "5 yrs", fees: 500 },
  { name: "Dr. Sarah Smith", specialty: ["Cardiologist"], experience: "8 yrs", fees: 800 },
  { name: "Dr. Michael Brown", specialty: ["Pediatrician"], experience: "6 yrs", fees: 600 },
  { name: "Dr. Emily Johnson", specialty: ["Neurologist"], experience: "10 yrs", fees: 900 },
  { name: "Dr. David Wilson", specialty: ["Dermatologist"], experience: "7 yrs", fees: 700 }
];
