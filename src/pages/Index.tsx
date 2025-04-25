
import AutocompleteHeader from "@/components/AutocompleteHeader";
import { Doctor, mockDoctors } from "@/data/mockDoctors";
import { useState } from "react";

const Index = () => {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(mockDoctors);

  const handleSearch = (doctors: Doctor[]) => {
    setFilteredDoctors(doctors);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AutocompleteHeader doctors={mockDoctors} onSearch={handleSearch} />
      
      {/* Display the filtered doctors count */}
      <div className="max-w-2xl mx-auto mt-8 px-4">
        <p className="text-gray-600">
          {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
        </p>
      </div>
    </div>
  );
};

export default Index;
