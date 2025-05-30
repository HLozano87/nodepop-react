export const FilterOpenIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 rotate-180 transition-transform duration-300 ${className}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L13 11.414V17a1 1 0 01-1.447.894l-4-2A1 1 0 017 15v-3.586L3.293 6.707A1 1 0 013 6V4z" />
  </svg>
);

export const FilterClosedIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-transform duration-300 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-4.586L3.293 6.707A1 1 0 013 6V4z"
    />
  </svg>
);
