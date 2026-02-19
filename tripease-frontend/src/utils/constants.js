export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export const TRIP_STATUS = {
  PLANNING: 'PLANNING',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export const EXPENSE_CATEGORIES = [
  'Accommodation',
  'Transportation',
  'Food',
  'Activities',
  'Shopping',
  'Other'
];

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd'
};