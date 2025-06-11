// src/components/DateRangePicker.tsx
import React from 'react';

interface DateRange {
  from: string;
  to: string;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: dateValue } = e.target;
    onChange({
      ...value,
      [name]: dateValue,
    });
  };

  return (
    <div className="flex gap-4 items-center">
      <div>
        <label className="block text-sm">From:</label>
        <input
          type="date"
          name="from"
          value={value.from}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm">To:</label>
        <input
          type="date"
          name="to"
          value={value.to}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
