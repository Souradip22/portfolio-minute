export interface UsernameAvailabilityResponse {
  message: string;
  available: boolean;
}

export interface ProfileFormData {
  id: string;
  font: string;
  theme: string;
  shortname: string;
  fullName: string;
  bio: string;
  experience: string;
  completedProjects: string;
  isOpenToWork: boolean;
  userEmail: string;
  phone: string;
  skills: { label: string; value: string }[];
  socialLinks: { label: string; value: string }[];
  projects: {
    projectName: string;
    projectDescription: string;
    repositoryUrl: string;
    demoUrl: string;
  }[];
  educationWithExperiences: {
    orgName: string;
    fromDate: string;
    toDate: string;
    type: string;
    designation: string;
    location: string;
  }[];
}
