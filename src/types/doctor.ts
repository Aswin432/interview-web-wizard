
export interface DoctorSpecialty {
  name: string;
}

export interface DoctorClinic {
  name: string;
  address: {
    locality: string;
    city: string;
  };
}

export interface Doctor {
  id: string;
  name: string;
  photo?: string;
  specialities: DoctorSpecialty[];
  fees: string;
  experience: string;
  clinic: DoctorClinic;
  consultationMode?: string[];
  specialty?: string[]; // Keep for backward compatibility
}
