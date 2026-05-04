import { useMemo } from 'react';
import { 
  CalendarDate, 
  getLocalTimeZone, 
  today, 
  isSameDay, 
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek
} from '@internationalized/date';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import { SelectField } from '../SelectField';

interface CalendarGridProps {
  viewDate: CalendarDate;
  onViewDateChange: (date: CalendarDate) => void;
  selectedDate: CalendarDate | null;
  onDateSelect: (date: CalendarDate) => void;
  minDate?: CalendarDate | null;
  maxDate?: CalendarDate | null;
}

export const CalendarGrid = ({
  viewDate,
  onViewDateChange,
  selectedDate,
  onDateSelect,
  minDate,
  maxDate
}: CalendarGridProps) => {
  const isDateDisabled = (date: CalendarDate) => {
    if (minDate && date.compare(minDate) < 0) return true;
    if (maxDate && date.compare(maxDate) > 0) return true;
    return false;
  };

  const calendarGrid = useMemo(() => {
    const monthStart = startOfMonth(viewDate);
    const monthEnd = endOfMonth(viewDate);
    const start = startOfWeek(monthStart, 'en-US');
    const end = endOfWeek(monthEnd, 'en-US');

    const days: CalendarDate[] = [];
    let curr = start;
    while (curr.compare(end) <= 0) {
      days.push(curr);
      curr = curr.add({ days: 1 });
    }
    return days;
  }, [viewDate]);

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const months = [
    { label: 'January', value: 1 }, { label: 'February', value: 2 },
    { label: 'March', value: 3 }, { label: 'April', value: 4 },
    { label: 'May', value: 5 }, { label: 'June', value: 6 },
    { label: 'July', value: 7 }, { label: 'August', value: 8 },
    { label: 'September', value: 9 }, { label: 'October', value: 10 },
    { label: 'November', value: 11 }, { label: 'December', value: 12 },
  ];

  const years = useMemo(() => {
    const currentYear = today(getLocalTimeZone()).year;
    const startYear = minDate ? minDate.year : currentYear - 50;
    const endYear = maxDate ? maxDate.year : currentYear + 50;
    const items = [];
    for (let y = startYear; y <= endYear; y++) {
      items.push({ label: y.toString(), value: y });
    }
    return items;
  }, [minDate, maxDate]);

  return (
    <div className="w-[min(300px,calc(100vw-2rem))] p-3 sm:p-4 select-none">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex gap-0.5">
          <button 
            type="button"
            onClick={() => onViewDateChange(viewDate.subtract({ years: 1 }))}
            className="p-1 hover:bg-white/5 rounded-md text-slate-400 transition-colors"
          >
            <ChevronsLeft size={16} />
          </button>
          <button 
            type="button"
            onClick={() => onViewDateChange(viewDate.subtract({ months: 1 }))}
            className="p-1 hover:bg-white/5 rounded-md text-slate-400 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
        
        <div className="flex-1 flex gap-1 items-center min-w-0">
          <div className="flex-1 min-w-0">
            <SelectField
              value={viewDate.month}
              onChange={(e) => onViewDateChange(viewDate.set({ month: parseInt(e.target.value as string) }))}
              options={months}
              className="[&_label]:hidden"
              matchTriggerWidth={false}
            />
          </div>
          <div className="w-20 shrink-0 sm:w-[85px]">
            <SelectField
              value={viewDate.year}
              onChange={(e) => onViewDateChange(viewDate.set({ year: parseInt(e.target.value as string) }))}
              options={years}
              className="[&_label]:hidden"
              matchTriggerWidth={false}
            />
          </div>
        </div>

        <div className="flex gap-0.5">
          <button 
            type="button"
            onClick={() => onViewDateChange(viewDate.add({ months: 1 }))}
            className="p-1 hover:bg-white/5 rounded-md text-slate-400 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          <button 
            type="button"
            onClick={() => onViewDateChange(viewDate.add({ years: 1 }))}
            className="p-1 hover:bg-white/5 rounded-md text-slate-400 transition-colors"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7">
        {weekDays.map(day => (
          <div key={day} className="text-[10px] font-bold text-center text-slate-500 uppercase">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px">
        {calendarGrid.map((date, i) => {
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isTodayDate = isSameDay(date, today(getLocalTimeZone()));
          const isCurrentMonth = date.month === viewDate.month;
          const isDisabled = isDateDisabled(date);

          return (
            <button
              key={i}
              type="button"
              disabled={isDisabled}
              onClick={() => onDateSelect(date)}
              className={`
                relative aspect-square w-full text-xs rounded-lg transition-all flex items-center justify-center
                ${isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'hover:bg-white/10 text-slate-300'}
                ${!isCurrentMonth ? 'opacity-20' : ''}
                ${isTodayDate && !isSelected ? 'text-cyan-400 ring-1 ring-inset ring-cyan-500/30' : ''}
                ${isDisabled ? 'opacity-10 cursor-not-allowed line-through' : ''}
              `}
            >
              {date.day}
              {isTodayDate && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-cyan-400" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex justify-center">
        <button
          type="button"
          onClick={() => onViewDateChange(today(getLocalTimeZone()))}
          className="text-[11px] font-medium text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider"
        >
          Go to Today
        </button>
      </div>
    </div>
  );
};
