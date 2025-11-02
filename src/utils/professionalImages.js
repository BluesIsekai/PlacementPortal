// Professional image URLs for different demographics and roles
export const professionalImages = {
  // Female Students
  femaleStudents: [
    "https://images.unsplash.com/photo-1494790108755-2616b9b66364?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Riya
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Sneha
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Priya A
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Ananya
  ],
  
  // Male Students
  maleStudents: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Arjun
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Vikram
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Rohit
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Karthik
  ],
  
  // Female Guiders/Professionals
  femaleGuiders: [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Dr. Meera
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Priyanka
    "https://images.unsplash.com/photo-1494790108755-2616b9b66364?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Sanya
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Neha
  ],
  
  // Male Guiders/Professionals
  maleGuiders: [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Ankit
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Rajesh
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Amit
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Venkat
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80", // Raghav
  ],
  
  // Default fallback
  default: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
};

// Utility function to get a professional image based on profile characteristics
export const getProfessionalImage = (profile) => {
  if (!profile) return professionalImages.default;
  
  const { name, role, gender } = profile;
  
  // Simple gender detection based on name (could be improved with a proper library)
  const femaleNames = ['riya', 'priya', 'sneha', 'ananya', 'meera', 'priyanka', 'sanya', 'neha'];
  const isLikelyFemale = femaleNames.some(fname => 
    name.toLowerCase().includes(fname)
  );
  
  if (role === 'Student') {
    if (isLikelyFemale) {
      return professionalImages.femaleStudents[Math.floor(Math.random() * professionalImages.femaleStudents.length)];
    } else {
      return professionalImages.maleStudents[Math.floor(Math.random() * professionalImages.maleStudents.length)];
    }
  } else if (role === 'Guider') {
    if (isLikelyFemale) {
      return professionalImages.femaleGuiders[Math.floor(Math.random() * professionalImages.femaleGuiders.length)];
    } else {
      return professionalImages.maleGuiders[Math.floor(Math.random() * professionalImages.maleGuiders.length)];
    }
  }
  
  return professionalImages.default;
};

export default professionalImages;
