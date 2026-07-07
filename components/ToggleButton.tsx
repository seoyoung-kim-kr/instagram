import React from "react";

type Props = {
  onIcon: React.ReactNode;
  offIcon?: React.ReactNode;
  toggled?: boolean;
  onToggle?: (toggled: boolean) => void;
  count?: number | string;
};

export default function ToggleButton({
  onIcon,
  offIcon,
  toggled = false,
  onToggle,
  count,
}: Props) {
  return (
    <div className="flex items-center gap-x-1">
      <button
        type="button"
        onClick={() => onToggle?.(!toggled)}
        className="hover:opacity-60 transition-opacity outline-none cursor-pointer"
      >
        {toggled ? onIcon : (offIcon ?? onIcon)}
      </button>
      {count !== undefined && (
        <span className="font-bold text-sm">{count}</span>
      )}
    </div>
  );
}
