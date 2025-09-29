import React from 'react';
import { StampType, StampTool } from '../types';

interface StampIconProps {
  type: StampType | StampTool;
  className?: string;
}

const StampIcon: React.FC<StampIconProps> = ({ type, className = "w-8 h-8" }) => {
  const iconProps = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5,
  };

  switch (type) {
    case StampType.SLIDE:
      return (
        <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 20h2.8l2.7-2.7a2.83 2.83 0 0 1 4 0L16.2 20H19a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1z" />
            <path d="m14 13-3-3-3 3" />
            <path d="m11 13 3 3" />
            <path d="m11 10-3 3" />
            <path d="M12 4v4" />
        </svg>
      );
    case StampType.SWING:
      return (
        <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 21h16" />
            <path d="M5 4v17" />
            <path d="M19 4v17" />
            <path d="M8 4h8" />
            <path d="m12 12-2 5h4l-2-5" />
            <path d="M10 12h4" />
        </svg>
      );
    case StampType.BARS:
      return (
        <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 21h16" /><path d="M4 14h16" /><path d="M4 7h16" />
          <path d="M8 21V4" /><path d="M16 21V4" />
        </svg>
      );
    case StampType.SANDBOX:
      return (
        <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c-5 0-9 2-9 4v10c0 2 4 4 9 4s9-2 9-4V7c0-2-4-4-9-4z" />
          <path d="M6.2 11.7c.9-2.5 4-4.2 7.6-4.2 2.3 0 4.1.6 5.2 1.5" />
          <path d="M21 12c-1.7 0-3.3.4-4.8 1.1" />
        </svg>
      );
    case StampType.JUNGLE_GYM:
      return (
        <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="8" y1="4" x2="8" y2="20" />
            <line x1="16" y1="4" x2="16" y2="20" />
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
        </svg>
      );
    case StampType.BENCH:
      return (
        <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 13h18" />
          <path d="M18 10v3" />
          <path d="M4 10v3" />
          <path d="M16 13V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v7" />
        </svg>
      );
    case StampType.TOILET:
      return (
        <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 5h8v4H8z" /><path d="M12 9v12" /><path d="M6 12h12" />
          <path d="M6 12a4 4 0 0 0-4 4v3h4" /><path d="M18 12a4 4 0 0 1 4 4v3h-4" />
        </svg>
      );
    case StampType.WATER_FOUNTAIN:
        return (
            <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 14h18" />
                <path d="M12 14v4" />
                <path d="M12 4a2 2 0 0 1 2 2c0 1-2 3-2 3s-2-2-2-3a2 2 0 0 1 2-2z" />
                <path d="M12 10a2 2 0 0 1 2-2c0-1-2-3-2-3s-2 2-2 3a2 2 0 0 1 2 2z" />
                <path d="M12 10V4" />
            </svg>
        );
    case StampType.WATER_TAP:
      return (
        <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v2" />
            <path d="M12 4v16" />
            <path d="M12 12h4" />
            <path d="M4 12c0-4 4-4 4-4" />
            <path d="M4 16c0 2.2 1.8 4 4 4h4" />
        </svg>
      );
    case StampType.ACORN:
      return (
        <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 6a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4z" />
            <path d="M8 10c0 4.418 1.79 8 4 8s4-3.582 4-8H8z" />
            <path d="M12 4V2" />
        </svg>
      );
    case StampType.CAUTION:
      return (
        <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" /><path d="M12 17h.01" />
        </svg>
      );
    case StampType.MEMO:
      return (
        <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M3 15h6" /><path d="M6 12v6" />
        </svg>
      );
    case 'PRINT':
        return (
            <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.5 7H17a1 1 0 0 1 1 1v5.5" />
                <path d="M10 18H5a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1h1.5" />
                <path d="M17 14.5V18a1 1 0 0 1-1 1h-1" />
                <rect width="8" height="6" x="8" y="2" rx="1" />
                <path d="M18 12.5a2 2 0 0 1-2-2h-1a2 2 0 0 1-2 2" />
            </svg>
        );
    case 'GEOLOCATE':
        return (
            <svg {...iconProps} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                <path d="M12 2v2" /><path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" /><path d="M20 12h2" />
                <path d="m4.93 19.07 1.41-1.41" /><path d="m17.66 6.34 1.41-1.41" />
            </svg>
        );
    default:
      return null;
  }
};

export default StampIcon;