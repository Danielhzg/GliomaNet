function BrainIcon({ className = "", size = 40 }) {
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
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5CB8E4" />
          <stop offset="50%" stopColor="#A3E4B8" />
          <stop offset="100%" stopColor="#7CC894" />
        </linearGradient>
        <filter id="brainGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Left half: Biological brain (cerebral cortex with detailed folds) */}
      <g opacity="1" filter="url(#brainGlow)">
        {/* Main brain outline */}
        <path
          d="M50 18 C42 18, 32 22, 28 28 C24 32, 20 38, 20 45 C20 52, 22 58, 25 62 C22 66, 20 72, 20 78 C20 84, 24 88, 30 90 C36 92, 42 94, 48 94 C46 96, 48 98, 50 98"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Detailed cerebral cortex folds (gyri and sulci) */}
        {/* Top folds */}
        <path
          d="M28 28 Q32 30, 35 32"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M24 35 Q28 37, 32 39"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M22 42 Q26 44, 30 46"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Middle folds */}
        <path
          d="M25 50 Q30 52, 35 54"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M22 58 Q28 60, 34 62"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M24 65 Q30 67, 36 69"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Bottom folds */}
        <path
          d="M26 72 Q32 74, 38 76"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M28 80 Q34 82, 40 84"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M30 88 Q36 90, 42 92"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Additional detail lines for depth */}
        <path
          d="M32 35 Q28 38, 26 42"
          stroke="url(#brainGradient)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M34 50 Q30 54, 28 58"
          stroke="url(#brainGradient)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M36 70 Q32 74, 30 78"
          stroke="url(#brainGradient)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>

      {/* Right half: Neural network (6 nodes with connections) */}
      <g opacity="1" filter="url(#brainGlow)">
        {/* 6 Neural network nodes */}
        <circle cx="62" cy="28" r="6" fill="url(#brainGradient)" />
        <circle cx="72" cy="38" r="6" fill="url(#brainGradient)" />
        <circle cx="68" cy="52" r="6" fill="url(#brainGradient)" />
        <circle cx="78" cy="62" r="6" fill="url(#brainGradient)" />
        <circle cx="64" cy="72" r="6" fill="url(#brainGradient)" />
        <circle cx="74" cy="82" r="6" fill="url(#brainGradient)" />

        {/* Neural network connections (synapses) - forming irregular mesh */}
        <line
          x1="62"
          y1="28"
          x2="72"
          y2="38"
          stroke="url(#brainGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="72"
          y1="38"
          x2="68"
          y2="52"
          stroke="url(#brainGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="68"
          y1="52"
          x2="78"
          y2="62"
          stroke="url(#brainGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="78"
          y1="62"
          x2="64"
          y2="72"
          stroke="url(#brainGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="64"
          y1="72"
          x2="74"
          y2="82"
          stroke="url(#brainGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Additional cross-connections for mesh pattern */}
        <line
          x1="62"
          y1="28"
          x2="68"
          y2="52"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <line
          x1="72"
          y1="38"
          x2="78"
          y2="62"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <line
          x1="68"
          y1="52"
          x2="64"
          y2="72"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <line
          x1="72"
          y1="38"
          x2="64"
          y2="72"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <line
          x1="78"
          y1="62"
          x2="74"
          y2="82"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>

      {/* Center vertical division line (subtle) */}
      <line
        x1="50"
        y1="15"
        x2="50"
        y2="95"
        stroke="url(#brainGradient)"
        strokeWidth="1.5"
        opacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default BrainIcon;
