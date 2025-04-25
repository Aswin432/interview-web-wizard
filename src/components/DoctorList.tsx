
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Clock3, CreditCard } from 'lucide-react';
import { Doctor } from '@/types/doctor';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList = ({ doctors }: DoctorListProps) => {
  if (doctors.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-gray-500">No doctors found. Please try another search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {doctors.map((doctor) => (
        <Card key={doctor.id} className="overflow-hidden shadow-md" data-testid="doctor-card">
          <CardHeader className="pb-0">
            <div className="flex gap-4 items-start">
              <Avatar className="h-16 w-16">
                <AvatarImage src={doctor.photo} alt={doctor.name} />
                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-800" data-testid="doctor-name">{doctor.name}</h3>
                  {doctor.consultationMode && doctor.consultationMode.includes('Video Consult') && (
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Video Consult
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1" data-testid="doctor-specialty">
                  <User className="h-4 w-4" />
                  {doctor.specialities.map(s => s.name).join(', ')}
                </div>
                <p className="text-sm text-gray-600 mt-1">{doctor.clinic.name}</p>
                <p className="text-sm text-gray-500">{doctor.clinic.address.locality}, {doctor.clinic.address.city}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Clock3 className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600" data-testid="doctor-experience">
                  {doctor.experience}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600" data-testid="doctor-fee">
                  {typeof doctor.fees === 'number' ? `₹${doctor.fees}` : doctor.fees} consultation fee
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Book Appointment</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DoctorList;
