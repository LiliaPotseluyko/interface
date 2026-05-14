interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'filter';
}

export default function TabButton({ active, onClick, children, variant = 'default' }: TabButtonProps) {
  if (variant === 'filter') {
    // Filter style tabs (Priority, Location, Status, Types)
    return (
      <button
        onClick={onClick}
        className={`px-5 py-1.5 rounded-full border-2 border-[#4b5563] font-bold text-lg capitalize whitespace-nowrap transition-all ${
          active
            ? 'bg-[#4b5563] text-[#e6edf2]'
            : 'bg-white text-[#4b5563]'
        }`}
      >
        {children}
      </button>
    );
  }

  // Default style tabs (Home, Urgent Repairs, Road Sections, etc.)
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
        active
          ? 'bg-[#4b5563] text-white'
          : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  );
}
