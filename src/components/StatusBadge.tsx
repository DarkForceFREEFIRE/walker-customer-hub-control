
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type StatusType = 'safe' | 'maintenance' | 'danger' | 'warning';

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  children?: ReactNode;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className, children }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'safe':
        return 'bg-green-500/15 text-green-400 border-green-500/20';
      case 'maintenance':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
      case 'danger':
        return 'bg-red-500/15 text-red-400 border-red-500/20';
      case 'warning':
        return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20';
      default:
        return 'bg-gray-500/15 text-gray-400 border-gray-500/20';
    }
  };

  const getPulsingEffect = () => {
    if (status === 'safe') return 'animate-pulse';
    return '';
  };

  return (
    <div className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium',
      getStatusStyles(),
      className
    )}>
      <span className={`h-2 w-2 rounded-full mr-1.5 ${getPulsingEffect()}`} style={{ backgroundColor: 'currentColor' }}></span>
      <span className="capitalize">{children || status}</span>
    </div>
  );
};

export default StatusBadge;
