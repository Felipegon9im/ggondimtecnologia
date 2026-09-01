import React from 'react';

// Animated SVG Clouds
export const CloudSVG: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="90" height="45" viewBox="0 0 90 45" fill="none" style={style}>
    <path
      d="M20 35C14.4772 35 10 30.5228 10 25C10 20.3506 13.1742 16.4443 17.5142 15.3533C18.919 9.38575 24.269 5 30.625 5C35.9189 5 40.5484 8.04689 42.7483 12.518C44.3755 11.2334 46.4385 10.5 48.6667 10.5C53.7725 10.5 57.9405 14.4379 58.3093 19.4533C60.2798 18.5298 62.4828 18 64.8 18C72.0902 18 78 23.9098 78 31.2C78 32.5317 77.8033 33.8174 77.4378 35H20Z"
      fill="rgba(255, 255, 255, 0.45)"
    />
  </svg>
);

// Swaying Tree for Genesis / Nature
export const TreeSVG: React.FC<{ size?: number; color?: string; style?: React.CSSProperties }> = ({
  size = 48,
  color = '#10b981',
  style
}) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 40 50" fill="none" style={{ animation: 'swayTree 4s ease-in-out infinite', ...style }}>
    {/* Trunk */}
    <rect x="17" y="32" width="6" height="18" rx="2" fill="#78350f" />
    {/* Foliage */}
    <circle cx="20" cy="20" r="16" fill={color} />
    <circle cx="12" cy="24" r="11" fill={color} opacity="0.85" />
    <circle cx="28" cy="24" r="11" fill={color} opacity="0.85" />
    <circle cx="20" cy="12" r="10" fill="#34d399" opacity="0.6" />
  </svg>
);

// Oasis Palm Tree for Exodus Desert
export const PalmTreeSVG: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 48, style }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 40 52" fill="none" style={{ animation: 'swayTree 3.5s ease-in-out infinite', ...style }}>
    {/* Curved Trunk */}
    <path d="M18 50C19 35 24 25 20 15" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
    {/* Palm Leaves */}
    <path d="M20 15C12 10 4 14 2 18" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
    <path d="M20 15C28 10 36 14 38 18" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
    <path d="M20 15C14 6 8 2 2 4" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
    <path d="M20 15C26 6 32 2 38 4" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
    {/* Coconuts */}
    <circle cx="18" cy="16" r="2.5" fill="#78350f" />
    <circle cx="22" cy="16" r="2.5" fill="#78350f" />
  </svg>
);

// Animated Campfire SVG
export const CampfireSVG: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 40, style }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={style}>
    {/* Logs */}
    <path d="M10 32L30 24" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
    <path d="M30 32L10 24" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
    {/* Flames */}
    <path
      d="M20 8C20 8 26 15 26 21C26 24.3137 23.3137 27 20 27C16.6863 27 14 24.3137 14 21C14 15 20 8 20 8Z"
      fill="#f59e0b"
      style={{ animation: 'flameFlicker 1.2s ease-in-out infinite' }}
    />
    <path
      d="M20 14C20 14 23 18 23 22C23 23.6569 21.6569 25 20 25C18.3431 25 17 23.6569 17 22C17 18 20 14 20 14Z"
      fill="#fbbf24"
      style={{ animation: 'flameFlicker 0.8s ease-in-out infinite alternate' }}
    />
  </svg>
);

// Cartoony Student Pilgrim Mascot SVG (Friendly student with backpack & walking staff)
export const PilgrimMascotSVG: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 54, style }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 50 60" fill="none" style={style}>
    {/* Backpack */}
    <rect x="8" y="24" width="8" height="18" rx="3" fill="#b45309" />
    {/* Body / Tunic */}
    <path d="M16 26C16 22 34 22 34 26L36 46H14L16 26Z" fill="#3b82f6" />
    {/* Belt */}
    <rect x="14" y="34" width="22" height="4" fill="#1e3a8a" />
    <rect x="23" y="33" width="4" height="6" fill="#fbbf24" />
    {/* Head / Face */}
    <circle cx="25" cy="15" r="9" fill="#fde047" />
    {/* Pilgrim Hat */}
    <path d="M12 13C12 13 18 5 25 5C32 5 38 13 38 13" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
    <path d="M10 13H40" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
    {/* Eyes & Smile */}
    <circle cx="22" cy="15" r="1.5" fill="#000000" />
    <circle cx="28" cy="15" r="1.5" fill="#000000" />
    <path d="M22 19C22 19 25 21 28 19" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
    {/* Walking Staff */}
    <line x1="38" y1="10" x2="38" y2="52" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
    <circle cx="38" cy="9" r="3" fill="#fbbf24" />
    {/* Boots */}
    <rect x="16" y="46" width="6" height="8" rx="2" fill="#78350f" />
    <rect x="28" y="46" width="6" height="8" rx="2" fill="#78350f" />
  </svg>
);

// Visual Landmark Badges for Bible Checkpoints
export const LandmarkIllustration: React.FC<{ type: string; size?: number }> = ({ type, size = 48 }) => {
  switch (type) {
    case 'EDEN':
      return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <TreeSVG size={size} color="#10b981" />
          <span style={{ position: 'absolute', bottom: -2, right: -4, fontSize: '1rem' }}>🍎</span>
        </div>
      );
    case 'RED_SEA':
      return <span style={{ fontSize: `${size * 0.7}px` }}>🌊</span>;
    case 'SINAI':
      return <span style={{ fontSize: `${size * 0.7}px` }}>🏔️</span>;
    case 'JERICHO':
      return <span style={{ fontSize: `${size * 0.7}px` }}>🏰</span>;
    case 'JERUSALEM':
      return <span style={{ fontSize: `${size * 0.7}px` }}>👑</span>;
    case 'CROSS':
      return <span style={{ fontSize: `${size * 0.7}px` }}>✝️</span>;
    default:
      return <span style={{ fontSize: `${size * 0.7}px` }}>🏕️</span>;
  }
};
