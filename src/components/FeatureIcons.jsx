import BrainIcon from "./BrainIcon";

// Ensemble Model Icon - Network/Connection
export function EnsembleIcon({ size = 64, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ensembleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5CB8E4" />
          <stop offset="50%" stopColor="#A3E4B8" />
          <stop offset="100%" stopColor="#7CC894" />
        </linearGradient>
        <filter id="ensembleGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Central node */}
      <circle
        cx="50"
        cy="50"
        r="14"
        fill="url(#ensembleGrad)"
        filter="url(#ensembleGlow)"
      />
      {/* Connected nodes */}
      <circle
        cx="25"
        cy="30"
        r="10"
        fill="url(#ensembleGrad)"
        opacity="0.9"
        filter="url(#ensembleGlow)"
      />
      <circle
        cx="75"
        cy="30"
        r="10"
        fill="url(#ensembleGrad)"
        opacity="0.9"
        filter="url(#ensembleGlow)"
      />
      <circle
        cx="25"
        cy="70"
        r="10"
        fill="url(#ensembleGrad)"
        opacity="0.9"
        filter="url(#ensembleGlow)"
      />
      <circle
        cx="75"
        cy="70"
        r="10"
        fill="url(#ensembleGrad)"
        opacity="0.9"
        filter="url(#ensembleGlow)"
      />
      {/* Connection lines */}
      <line
        x1="50"
        y1="50"
        x2="25"
        y2="30"
        stroke="url(#ensembleGrad)"
        strokeWidth="2.5"
        opacity="0.8"
      />
      <line
        x1="50"
        y1="50"
        x2="75"
        y2="30"
        stroke="url(#ensembleGrad)"
        strokeWidth="2.5"
        opacity="0.8"
      />
      <line
        x1="50"
        y1="50"
        x2="25"
        y2="70"
        stroke="url(#ensembleGrad)"
        strokeWidth="2.5"
        opacity="0.8"
      />
      <line
        x1="50"
        y1="50"
        x2="75"
        y2="70"
        stroke="url(#ensembleGrad)"
        strokeWidth="2.5"
        opacity="0.8"
      />
      <line
        x1="25"
        y1="30"
        x2="75"
        y2="30"
        stroke="url(#ensembleGrad)"
        strokeWidth="2"
        opacity="0.5"
      />
      <line
        x1="25"
        y1="70"
        x2="75"
        y2="70"
        stroke="url(#ensembleGrad)"
        strokeWidth="2"
        opacity="0.5"
      />
    </svg>
  );
}

// Fast & Efficient Icon - Lightning Bolt
export function FastIcon({ size = 64, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="fastGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F39C12" />
          <stop offset="50%" stopColor="#E8A85C" />
          <stop offset="100%" stopColor="#D68910" />
        </linearGradient>
        <filter id="fastGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M45 15 L35 50 L50 50 L40 85 L65 35 L50 35 L60 15 Z"
        fill="url(#fastGrad)"
        filter="url(#fastGlow)"
      />
      <path
        d="M45 15 L35 50 L50 50 L40 85 L65 35 L50 35 L60 15 Z"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Detailed Results Icon - Chart/Graph
export function ChartIcon({ size = 64, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A3E4B8" />
          <stop offset="50%" stopColor="#7CC894" />
          <stop offset="100%" stopColor="#5CB8E4" />
        </linearGradient>
        <filter id="chartGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Bars */}
      <rect
        x="15"
        y="60"
        width="12"
        height="25"
        fill="url(#chartGrad)"
        opacity="0.8"
        rx="2"
        filter="url(#chartGlow)"
      />
      <rect
        x="32"
        y="45"
        width="12"
        height="40"
        fill="url(#chartGrad)"
        opacity="0.9"
        rx="2"
        filter="url(#chartGlow)"
      />
      <rect
        x="49"
        y="30"
        width="12"
        height="55"
        fill="url(#chartGrad)"
        rx="2"
        filter="url(#chartGlow)"
      />
      <rect
        x="66"
        y="50"
        width="12"
        height="35"
        fill="url(#chartGrad)"
        opacity="0.85"
        rx="2"
        filter="url(#chartGlow)"
      />
      <rect
        x="83"
        y="40"
        width="12"
        height="45"
        fill="url(#chartGrad)"
        opacity="0.9"
        rx="2"
        filter="url(#chartGlow)"
      />
      {/* Line chart overlay */}
      <polyline
        points="21,70 38,55 55,40 72,60 89,50"
        fill="none"
        stroke="url(#chartGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      {/* Data points */}
      <circle
        cx="21"
        cy="70"
        r="4"
        fill="url(#chartGrad)"
        filter="url(#chartGlow)"
      />
      <circle
        cx="38"
        cy="55"
        r="4"
        fill="url(#chartGrad)"
        filter="url(#chartGlow)"
      />
      <circle
        cx="55"
        cy="40"
        r="4"
        fill="url(#chartGrad)"
        filter="url(#chartGlow)"
      />
      <circle
        cx="72"
        cy="60"
        r="4"
        fill="url(#chartGrad)"
        filter="url(#chartGlow)"
      />
      <circle
        cx="89"
        cy="50"
        r="4"
        fill="url(#chartGrad)"
        filter="url(#chartGlow)"
      />
    </svg>
  );
}

// Secure & Private Icon - Shield with Lock
export function SecureIcon({ size = 64, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="secureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5CB8E4" />
          <stop offset="50%" stopColor="#3D9FCC" />
          <stop offset="100%" stopColor="#2B7AA8" />
        </linearGradient>
        <filter id="secureGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Shield */}
      <path
        d="M50 15 L30 25 L30 45 C30 60, 40 75, 50 80 C60 75, 70 60, 70 45 L70 25 Z"
        fill="url(#secureGrad)"
        opacity="0.2"
        stroke="url(#secureGrad)"
        strokeWidth="3"
        filter="url(#secureGlow)"
      />
      {/* Lock body */}
      <rect
        x="40"
        y="50"
        width="20"
        height="18"
        rx="2"
        fill="url(#secureGrad)"
        filter="url(#secureGlow)"
      />
      {/* Lock shackle */}
      <path
        d="M45 50 L45 42 C45 36, 50 32, 55 32 C60 32, 55 36, 55 42 L55 50"
        stroke="url(#secureGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Keyhole */}
      <circle cx="50" cy="59" r="3.5" fill="rgba(255,255,255,0.9)" />
    </svg>
  );
}

// User Friendly Icon - Device/Interface
export function UserFriendlyIcon({ size = 64, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A3E4B8" />
          <stop offset="50%" stopColor="#5CB8E4" />
          <stop offset="100%" stopColor="#3D9FCC" />
        </linearGradient>
        <filter id="userGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Device frame */}
      <rect
        x="20"
        y="25"
        width="60"
        height="50"
        rx="4"
        fill="url(#userGrad)"
        opacity="0.2"
        stroke="url(#userGrad)"
        strokeWidth="2.5"
        filter="url(#userGlow)"
      />
      {/* Screen */}
      <rect
        x="25"
        y="30"
        width="50"
        height="35"
        rx="2"
        fill="rgba(255,255,255,0.15)"
      />
      {/* UI Elements */}
      <rect
        x="30"
        y="35"
        width="15"
        height="8"
        rx="1"
        fill="url(#userGrad)"
        opacity="0.8"
      />
      <rect
        x="48"
        y="35"
        width="22"
        height="8"
        rx="1"
        fill="url(#userGrad)"
        opacity="0.5"
      />
      <rect
        x="30"
        y="47"
        width="40"
        height="6"
        rx="1"
        fill="url(#userGrad)"
        opacity="0.6"
      />
      <rect
        x="30"
        y="56"
        width="30"
        height="6"
        rx="1"
        fill="url(#userGrad)"
        opacity="0.6"
      />
      {/* Touch indicator */}
      <circle
        cx="75"
        cy="50"
        r="6"
        fill="url(#userGrad)"
        opacity="0.7"
        filter="url(#userGlow)"
      />
    </svg>
  );
}

// AI Powered Icon - Brain (using existing BrainIcon)
export function AIIcon({ size = 64, className = "" }) {
  return <BrainIcon size={size} className={className} />;
}
