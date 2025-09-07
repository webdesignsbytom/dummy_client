export const ROLES = {
  ADMIN: 'ADMIN',
  DEVELOPER: 'DEVELOPER',
  USER: 'USER',
};

// Simple role checker
export const hasRole = (user, ...roles) => {
  if (!user || !user.role) return false;
  return roles.includes(user.role);
};

// Very simple "permission" system (optional)
export const hasPermission = (user, permission) => {
  if (!user) return false;
  // Example: check array of permissions on the user object
  return Array.isArray(user.permissions) && user.permissions.includes(permission);
};

// Example account status check
export const isActive = (user) => {
  if (!user) return false;
  return user.status === 'ACTIVE' && !user.suspended;
};