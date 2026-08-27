import { colors } from "@/lib/designTokens";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// Success/checkmark
export function IconSuccess({ size = 24, color = colors.success[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

// Lightbulb / Idea
export function IconIdea({ size = 24, color = colors.primary[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <path d="M9 18h6M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7Z"></path>
    </svg>
  );
}

// Chart/Data
export function IconChart({ size = 24, color = colors.primary[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <line x1="12" y1="2" x2="12" y2="22"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}

// Shield/Security/Privacy
export function IconSecurity({ size = 24, color = colors.success[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );
}

// Accessibility
export function IconAccessibility({ size = 24, color = colors.primary[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="1"></circle>
      <path d="M12 1v6M4.22 4.22l4.24 4.24M1 12h6M4.22 19.78l4.24-4.24M12 23v-6M19.78 19.78l-4.24-4.24M23 12h-6M19.78 4.22l-4.24 4.24"></path>
    </svg>
  );
}

// Message/Chat
export function IconMessage({ size = 24, color = colors.primary[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
}

// Link/Copy
export function IconLink({ size = 24, color = colors.primary[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  );
}

// Download
export function IconDownload({ size = 24, color = colors.primary[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );
}

// Eye/View
export function IconView({ size = 24, color = colors.primary[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

// Alert/Warning
export function IconAlert({ size = 24, color = colors.error[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
}

// Needs/Requirement (target)
export function IconNeeds({ size = 24, color = colors.secondary[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="12" r="8"></circle>
      <circle cx="12" cy="12" r="4"></circle>
    </svg>
  );
}

// Sentiment/Feeling (smile)
export function IconFeeling({ size = 24, color = colors.accent[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
      <line x1="9" y1="9" x2="9.01" y2="9"></line>
      <line x1="15" y1="9" x2="15.01" y2="9"></line>
    </svg>
  );
}

// Map/Location
export function IconMap({ size = 24, color = colors.primary[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
      <line x1="9" y1="3" x2="9" y2="18"></line>
      <line x1="15" y1="6" x2="15" y2="21"></line>
    </svg>
  );
}

// People/Community
export function IconCommunity({ size = 24, color = colors.primary[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}

// Plus/Add
export function IconAdd({ size = 24, color = colors.primary[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

// Live/Active (pulse dot)
export function IconLive({ size = 24, color = colors.error[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <circle cx="12" cy="12" r="3"></circle>
      <circle cx="12" cy="12" r="8" fill="none" stroke={color} strokeWidth="2" opacity="0.3"></circle>
    </svg>
  );
}

// Expand/Growth
export function IconExpand({ size = 24, color = colors.secondary[600], className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <polyline points="23 6 13.46 15.54"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
      <polyline points="1 18 10.46 8.54"></polyline>
      <polyline points="7 18 1 18 1 12"></polyline>
    </svg>
  );
}
