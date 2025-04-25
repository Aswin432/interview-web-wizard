
export interface Doctor {
  name: string;
  specialty: string[];
  experience: string;
  fees: number;
  consultationMode?: string[];
}

export const mockDoctors: Doctor[] = [
  { 
    name: "Dr. John Doe", 
    specialty: ["Dentist"], 
    experience: "5 yrs", 
    fees: 500, 
    consultationMode: ["Video Consult"] 
  },
  { 
    name: "Dr. Sarah Smith", 
    specialty: ["Cardiologist"], 
    experience: "8 yrs", 
    fees: 800, 
    consultationMode: ["In Clinic"] 
  },
  { 
    name: "Dr. Michael Brown", 
    specialty: ["Pediatrician"], 
    experience: "6 yrs", 
    fees: 600, 
    consultationMode: ["Video Consult", "In Clinic"] 
  },
  { 
    name: "Dr. Emily Johnson", 
    specialty: ["Neurologist"], 
    experience: "10 yrs", 
    fees: 900, 
    consultationMode: ["In Clinic"] 
  },
  { 
    name: "Dr. David Wilson", 
    specialty: ["Dermatologist"], 
    experience: "7 yrs", 
    fees: 700, 
    consultationMode: ["Video Consult"] 
  },
  { 
    name: "Dr. Lisa Anderson", 
    specialty: ["General Physician"], 
    experience: "12 yrs", 
    fees: 450, 
    consultationMode: ["Video Consult", "In Clinic"] 
  },
  { 
    name: "Dr. Robert Miller", 
    specialty: ["Orthopedic"], 
    experience: "9 yrs", 
    fees: 850, 
    consultationMode: ["In Clinic"] 
  },
  { 
    name: "Dr. Jennifer Clark", 
    specialty: ["Gynecologist"], 
    experience: "11 yrs", 
    fees: 750, 
    consultationMode: ["Video Consult"] 
  }
];
