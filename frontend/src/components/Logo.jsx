const Logo = () => {
  return (
    <svg  viewBox="0 0 350 100" xmlns="http://www.w3.org/2000/svg">
      {/* Animated Dots */}
      <circle cx="30" cy="50" r="3" fill="#FF5E1A">
        <animate attributeName="cy" values="50;30;50" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="3" fill="#FF7B25">
        <animate attributeName="cy" values="50;40;50" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </circle>

      {/* Text */}
      <text x="80" y="60" fontFamily="'Clash Grotesk', sans-serif" fontWeight="600"
        fontSize="36" fill="#FF5E1A" letterSpacing="-0.5px">
        Prep<tspan fill="#1A1A1A">Genie</tspan>
      </text>

      {/* Tagline */}
      <text x="80" y="80" fontFamily="'Clash Grotesk', sans-serif" fontWeight="300"
        fontSize="14" fill="#666" letterSpacing="1px">
        AI Interview Intelligence
      </text>
    </svg>
  );
};

export default Logo;
