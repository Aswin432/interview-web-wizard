
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Doctor } from '@/data/mockDoctors';

interface FilterPanelProps {
  doctors: Doctor[];
  onConsultationChange: (mode: string | null) => void;
  onSpecialtyChange: (specialties: string[]) => void;
  onSortChange: (sortBy: string | null) => void;
}

const FilterPanel = ({ doctors, onConsultationChange, onSpecialtyChange, onSortChange }: FilterPanelProps) => {
  const [consultationType, setConsultationType] = useState<string | null>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string | null>(null);
  
  // Get unique specialties from doctor data
  const allSpecialties = React.useMemo(() => {
    const specialtiesSet = new Set<string>();
    doctors.forEach(doctor => {
      doctor.specialty.forEach(spec => specialtiesSet.add(spec));
    });
    return Array.from(specialtiesSet).sort();
  }, [doctors]);

  // Handle consultation type change
  const handleConsultationChange = (value: string) => {
    const newValue = consultationType === value ? null : value;
    setConsultationType(newValue);
    onConsultationChange(newValue);
  };

  // Handle specialty change
  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    const updatedSpecialties = checked
      ? [...selectedSpecialties, specialty]
      : selectedSpecialties.filter(s => s !== specialty);
    
    setSelectedSpecialties(updatedSpecialties);
    onSpecialtyChange(updatedSpecialties);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    const newValue = sortOption === value ? null : value;
    setSortOption(newValue);
    onSortChange(newValue);
  };

  return (
    <div className="space-y-6 w-full max-w-xs bg-white p-4 rounded-lg shadow-sm">
      {/* Consultation Mode Section */}
      <Collapsible defaultOpen>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold" data-testid="filter-header-moc">Consultation Mode</h3>
          <CollapsibleTrigger className="p-1 rounded-full hover:bg-gray-100">
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-2 space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroup value={consultationType || ""} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  id="video-consult"
                  value="Video Consult"
                  data-testid="filter-video-consult"
                  onClick={() => handleConsultationChange("Video Consult")}
                />
                <Label htmlFor="video-consult">Video Consult</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  id="in-clinic"
                  value="In Clinic"
                  data-testid="filter-in-clinic"
                  onClick={() => handleConsultationChange("In Clinic")}
                />
                <Label htmlFor="in-clinic">In Clinic</Label>
              </div>
            </RadioGroup>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Specialty Section */}
      <Collapsible defaultOpen>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold" data-testid="filter-header-speciality">Speciality</h3>
          <CollapsibleTrigger className="p-1 rounded-full hover:bg-gray-100">
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-2 space-y-2">
          {allSpecialties.map((specialty) => {
            const specialtyId = specialty.replace(/\s+/g, '-');
            return (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox
                  id={specialtyId}
                  checked={selectedSpecialties.includes(specialty)}
                  onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked === true)}
                  data-testid={`filter-specialty-${specialtyId}`}
                />
                <Label htmlFor={specialtyId}>{specialty}</Label>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      {/* Sort Section */}
      <Collapsible defaultOpen>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold" data-testid="filter-header-sort">Sort</h3>
          <CollapsibleTrigger className="p-1 rounded-full hover:bg-gray-100">
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-2 space-y-2">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroup value={sortOption || ""} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    id="sort-fees"
                    value="fees"
                    data-testid="sort-fees"
                    onClick={() => handleSortChange("fees")}
                  />
                  <Label htmlFor="sort-fees">Fees (Low to High)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    id="sort-experience"
                    value="experience"
                    data-testid="sort-experience"
                    onClick={() => handleSortChange("experience")}
                  />
                  <Label htmlFor="sort-experience">Experience (High to Low)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FilterPanel;
