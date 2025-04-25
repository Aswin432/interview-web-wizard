
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AutocompleteHeader from "@/components/AutocompleteHeader";
import FilterPanel from "@/components/FilterPanel";
import DoctorList from "@/components/DoctorList";
import { Doctor, mockDoctors } from "@/data/mockDoctors";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  
  // URL query params
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("search") || "");
  const [consultationMode, setConsultationMode] = useState<string | null>(searchParams.get("consultation"));
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(searchParams.getAll("specialty"));
  const [sortOption, setSortOption] = useState<string | null>(searchParams.get("sort"));

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
        // const data = await response.json();
        // setDoctors(data);
        
        // Using mock data for now
        setDoctors(mockDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Apply all filters and sorts
  useEffect(() => {
    let result = [...doctors];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply consultation mode filter
    if (consultationMode) {
      result = result.filter(doctor => 
        doctor.consultationMode?.includes(consultationMode)
      );
    }

    // Apply specialty filters
    if (selectedSpecialties.length > 0) {
      result = result.filter(doctor =>
        doctor.specialty.some(spec => selectedSpecialties.includes(spec))
      );
    }

    // Apply sort
    if (sortOption) {
      if (sortOption === "fees") {
        result.sort((a, b) => a.fees - b.fees);
      } else if (sortOption === "experience") {
        result.sort((a, b) => {
          const expA = parseInt(a.experience, 10);
          const expB = parseInt(b.experience, 10);
          return expB - expA;
        });
      }
    }

    setFilteredDoctors(result);
  }, [doctors, searchTerm, consultationMode, selectedSpecialties, sortOption]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set("search", searchTerm);
    if (consultationMode) params.set("consultation", consultationMode);
    
    // Clear existing specialty params and add new ones
    selectedSpecialties.forEach(spec => {
      params.append("specialty", spec);
    });
    
    if (sortOption) params.set("sort", sortOption);
    
    setSearchParams(params);
  }, [searchTerm, consultationMode, selectedSpecialties, sortOption, setSearchParams]);

  // Load params from URL on initial load
  useEffect(() => {
    const search = searchParams.get("search");
    const consultation = searchParams.get("consultation");
    const specialties = searchParams.getAll("specialty");
    const sort = searchParams.get("sort");

    if (search) setSearchTerm(search);
    if (consultation) setConsultationMode(consultation);
    if (specialties.length > 0) setSelectedSpecialties(specialties);
    if (sort) setSortOption(sort);
  }, []);

  // Handler for search input
  const handleSearch = (doctors: Doctor[]) => {
    if (doctors.length === 1) {
      // If a specific doctor is clicked
      const doctor = doctors[0];
      setSearchTerm(doctor.name);
    } else {
      // Filter was changed/cleared
      setFilteredDoctors(doctors);
      setSearchTerm(doctors === mockDoctors ? "" : searchTerm);
    }
  };

  // Handler for consultation mode change
  const handleConsultationChange = (mode: string | null) => {
    setConsultationMode(mode);
  };

  // Handler for specialty changes
  const handleSpecialtyChange = (specialties: string[]) => {
    setSelectedSpecialties(specialties);
  };

  // Handler for sort option change
  const handleSortChange = (sortBy: string | null) => {
    setSortOption(sortBy);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AutocompleteHeader doctors={doctors} onSearch={handleSearch} />
      
      <div className="max-w-7xl mx-auto mt-8 px-4 flex flex-col md:flex-row gap-8">
        {/* Filter Panel */}
        <aside className="w-full md:w-1/4">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-48 w-full" />
            </div>
          ) : (
            <FilterPanel 
              doctors={doctors} 
              onConsultationChange={handleConsultationChange} 
              onSpecialtyChange={handleSpecialtyChange} 
              onSortChange={handleSortChange} 
            />
          )}
        </aside>
        
        {/* Main Content */}
        <main className="w-full md:w-3/4">
          {/* Doctors Count */}
          <div className="mb-4">
            <p className="text-gray-600">
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {/* Doctor List */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md">
                  <Skeleton className="h-48 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <DoctorList doctors={filteredDoctors} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
