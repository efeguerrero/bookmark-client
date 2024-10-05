type IconProps = React.HTMLAttributes<SVGElement>;

export const spinner = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const success = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    height="20"
    width="20"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
);

export const error = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    height="20"
    width="20"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

export const logo = (props: IconProps) => (
  <svg
    {...props}
    stroke="currentColor"
    viewBox="0 0 69 108"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.03278 52.8131C21.2369 42.8951 37.5408 30.93 55.3242 23.8507C58.6666 22.5202 61.8253 21.5107 65.3745 21.1413"
      stroke="currentColor"
      stroke-width="5.5"
      stroke-linecap="round"
    />

    <path
      d="M2.74896 71.0228C18.3094 61.3239 33.7476 51.2604 49.7649 42.3159C55.2969 39.2267 60.988 36.1918 67.1175 34.4831"
      stroke="currentColor"
      stroke-width="5.5"
      stroke-linecap="round"
    />

    <path
      d="M1.48685 83.403C22.9611 70.0363 44.2167 56.67 67.2376 46.1422"
      stroke="currentColor"
      stroke-width="5.5"
      stroke-linecap="round"
    />
    <path
      d="M46.9234 2C40.2598 36.1161 35.4971 71.2339 34.0016 106"
      stroke="currentColor"
      stroke-width="5.5"
      stroke-linecap="round"
    />
    <path
      d="M27.7211 7.34874C24.5074 29.1677 23.0639 50.8448 21.9814 72.8558"
      stroke="currentColor"
      stroke-width="5.5"
      stroke-linecap="round"
    />
  </svg>
);
