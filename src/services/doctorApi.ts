
import { Doctor } from '../types/doctor';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    const data = await response.json();
    
    // Transform data to match our interface
    return data.map((doctor: Doctor) => ({
      ...doctor,
      specialty: doctor.specialities.map(s => s.name), // Add specialty array for existing components
      consultationMode: ['Video Consult'], // Adding default consultation mode
      fees: typeof doctor.fees === 'string' ? 
        parseInt(doctor.fees.replace(/[^0-9]/g, '')) : 
        doctor.fees // Convert fees to number if it's a string
    }));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};
