export const APP_TITLE = "EVENTA";
export const IMAGE_PLACEHOLDER =
  "https://png.pngtree.com/thumb_back/fh260/background/20201026/pngtree-futuristic-shape-abstract-background-chemistry-technology-concept-for-website-image_438818.jpg";

export const COLORS = {
  primary: "#539ac9",
  secondary: "#114163",
  secondaryLight: "#5b8db0",
};

export const RESPONSE_MESSAGES = {
  somethingWentWrong: "Something went wrong. Try again!",
  registerSuccess: "User registered successfully!",
  alreadyRegistered: "This user is already registered!",
};

export const ASYNC_FLAGS = {
  user: "user",
};

// ------------ INTERFACES & TYPES ----------- //

export enum CollectionsType {
  users = "users",
  events = "events",
}

export interface EventType {
  id: string;
  eventName: string;
  dateTime: string;
  seatsAvailable: number;
  description: string;
  location: string;
  price: number;
  organizer: string;
  contactEmail: string;
  category: string;
  image: string;
  maxAttendees: number;
  duration: number;
}

export interface UserType {
  fullName: string;
  email: string;
  contact: string;
  password: string;
}
