import React from 'react';

export interface SharedFieldLabelProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  htmlFor?: string;
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Reusable field label component for enterprise forms.
 * Enforces uppercase, compact typography with consistent red required asterisk.
 */
export const SharedFieldLabel: React.FC<SharedFieldLabelProps> = ({
  label,
  required = false,
  error = false,
  disabled = false,
  htmlFor,
  id,
  className = '',
  children,
}) => {
  if (!label && !children) return null;

  const colorClass = error
    ? 'text-red-600'
    : disabled
    ? 'text-slate-400'
    : 'text-slate-700';

  return (
    <label
      id={id}
      htmlFor={htmlFor}
      className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 transition-colors select-none ${colorClass} ${className}`}
    >
      {label || children}
      {required && (
        <span
          className="text-red-600 font-bold ml-0.5 text-xs inline-block"
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
  );
};

export default SharedFieldLabel;
