
# Doctor Listing Application

A React application for a doctor listing page, designed for frontend developer interviews. The app allows users to search and filter doctors, with all functionality working on the client side after the initial data fetch.

## Features

- **Autocomplete Search**: Filter doctors by name with up to 3 suggestions in a dropdown
- **Filter Panel**:
  - Consultation Type (Single select): Video Consult, In Clinic
  - Specialties (Multi-select): Generated dynamically from available doctor specialties
  - Sort: By fees (ascending) or experience (descending)
- **Doctor Cards**: Display of filtered doctor information with booking button
- **URL Query Parameters**: Retain search and filter state in URL for easy sharing and navigation

## Tech Stack

- React with TypeScript
- React Router for URL parameter handling
- Tailwind CSS for styling
- shadcn/ui components for UI elements

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open http://localhost:8080 to view the application

## Project Structure

- `src/components/`
  - `AutocompleteHeader.tsx`: Search bar with autocomplete functionality
  - `FilterPanel.tsx`: Filter panel for consultation mode, specialties, and sorting
  - `DoctorList.tsx`: Component to render the list of doctor cards
- `src/data/`
  - `mockDoctors.ts`: Mock doctor data for development
- `src/pages/`
  - `Index.tsx`: Main page that integrates all components and handles state
  - `NotFound.tsx`: 404 page for invalid routes

## Test Automation

All components include the required data-testid attributes for test automation:

- Search: `autocomplete-input`, `suggestion-item`
- Filters:
  - Headers: `filter-header-moc`, `filter-header-speciality`, `filter-header-sort`
  - Consultation: `filter-video-consult`, `filter-in-clinic`
  - Specialties: `filter-specialty-{SpecialtyName}`
  - Sort: `sort-fees`, `sort-experience`
- Doctor Cards: `doctor-card`, `doctor-name`, `doctor-specialty`, `doctor-experience`, `doctor-fee`

## Future Enhancements

- Integration with a real backend API
- Pagination for the doctor list
- Detail view for each doctor
- Appointment booking functionality
- User authentication
