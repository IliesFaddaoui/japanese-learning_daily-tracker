import React from 'react';

export const ActivityButton = ({ type, label, onClick }) => {
  return (
    <button
      className="px-5 py-4 text-base font-semibold border-none rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white cursor-pointer transition-all duration-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(0,0,0,0.2)] active:translate-y-0"
      data-activity={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
