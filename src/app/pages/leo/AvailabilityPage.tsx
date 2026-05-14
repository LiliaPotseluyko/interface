import { useParams } from 'react-router';
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import TabButton from '../../components/TabButton';
import { Calendar, ChevronLeft, ChevronRight, AlertCircle, CalendarDays, Moon, Sunrise, Sun, Sunset } from 'lucide-react';

interface TimeSlot {
  id: string;
  label: string;
  start: string;
  end: string;
  icon: any;
  color: string;
  colorLight: string;
  colorDark: string;
}

const TIME_SLOTS: TimeSlot[] = [
  { 
    id: 'slot1', 
    label: 'Night', 
    start: '00:00', 
    end: '06:00',
    icon: Moon,
    color: '#4338ca',
    colorLight: '#818cf8',
    colorDark: '#312e81'
  },
  { 
    id: 'slot2', 
    label: 'Morning', 
    start: '06:00', 
    end: '12:00',
    icon: Sunrise,
    color: '#16a34a',
    colorLight: '#4ade80',
    colorDark: '#166534'
  },
  { 
    id: 'slot3', 
    label: 'Afternoon', 
    start: '12:00', 
    end: '18:00',
    icon: Sun,
    color: '#f59e0b',
    colorLight: '#fbbf24',
    colorDark: '#b45309'
  },
  { 
    id: 'slot4', 
    label: 'Evening', 
    start: '18:00', 
    end: '00:00',
    icon: Sunset,
    color: '#1e40af',
    colorLight: '#60a5fa',
    colorDark: '#1e3a8a'
  },
];

interface DayAvailability {
  date: string;
  slots: Set<string>;
}

export default function AvailabilityPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const [activeTab, setActiveTab] = useState<'urgent' | 'sections'>('urgent');
  
  // Urgent repairs state
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2)); // March 2026
  const [selectedDay, setSelectedDay] = useState<number>(17); // Default to today
  const [urgentAvailability, setUrgentAvailability] = useState<Map<string, Set<string>>>(
    new Map([
      ['2026-03-17', new Set(['slot2', 'slot3'])],
      ['2026-03-18', new Set(['slot2', 'slot3'])],
      ['2026-03-19', new Set(['slot1', 'slot2', 'slot3', 'slot4'])],
      ['2026-03-20', new Set(['slot2', 'slot3'])],
    ])
  );

  // Section repairs state
  const [sectionStartDate, setSectionStartDate] = useState<number | null>(null);
  const [sectionEndDate, setSectionEndDate] = useState<number | null>(null);
  const [sectionAvailability, setSectionAvailability] = useState<Array<{start: string, end: string}>>([
    { start: '2026-03-25', end: '2026-03-27' },
    { start: '2026-04-01', end: '2026-04-05' },
  ]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const today = 17; // March 17, 2026

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const toggleTimeSlot = (slotId: string) => {
    const dateKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    const newAvailability = new Map(urgentAvailability);
    const currentSlots = newAvailability.get(dateKey) || new Set<string>();
    
    if (currentSlots.has(slotId)) {
      currentSlots.delete(slotId);
    } else {
      currentSlots.add(slotId);
    }
    
    if (currentSlots.size > 0) {
      newAvailability.set(dateKey, new Set(currentSlots));
    } else {
      newAvailability.delete(dateKey);
    }
    
    setUrgentAvailability(newAvailability);
  };

  const isSlotAvailable = (slotId: string) => {
    const dateKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    const slots = urgentAvailability.get(dateKey);
    return slots ? slots.has(slotId) : false;
  };

  const hasAnyAvailability = (day: number) => {
    const dateKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const slots = urgentAvailability.get(dateKey);
    return slots && slots.size > 0;
  };

  const getAvailableSlots = (day: number): Set<string> => {
    const dateKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return urgentAvailability.get(dateKey) || new Set<string>();
  };

  const isPastDate = (day: number) => {
    return day < today;
  };

  const handleDayClick = (day: number) => {
    if (activeTab === 'urgent') {
      setSelectedDay(day);
    } else {
      // Section repairs - date range selection
      if (isPastDate(day)) return;

      if (sectionStartDate === null) {
        setSectionStartDate(day);
        setSectionEndDate(null);
      } else if (sectionEndDate === null) {
        if (day < sectionStartDate) {
          setSectionStartDate(day);
        } else {
          setSectionEndDate(day);
        }
      } else {
        // Reset and start new selection
        setSectionStartDate(day);
        setSectionEndDate(null);
      }
    }
  };

  const isInDateRange = (day: number) => {
    if (sectionStartDate === null) return false;
    if (sectionEndDate === null) return day === sectionStartDate;
    return day >= sectionStartDate && day <= sectionEndDate;
  };

  const addSectionRange = () => {
    if (sectionStartDate !== null && sectionEndDate !== null) {
      const startDate = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(sectionStartDate).padStart(2, '0')}`;
      const endDate = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(sectionEndDate).padStart(2, '0')}`;
      
      setSectionAvailability([...sectionAvailability, { start: startDate, end: endDate }]);
      setSectionStartDate(null);
      setSectionEndDate(null);
    }
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.getDate()} ${monthNames[startDate.getMonth()].substring(0, 3)} - ${endDate.getDate()} ${monthNames[endDate.getMonth()].substring(0, 3)} ${endDate.getFullYear()}`;
  };

  const removeSectionRange = (index: number) => {
    setSectionAvailability(sectionAvailability.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-xl font-semibold text-gray-900">Availability</h1>
        <p className="text-sm text-gray-600 mt-1">Manage urgent and section repair availability</p>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2">
          <TabButton
            onClick={() => setActiveTab('urgent')}
            active={activeTab === 'urgent'}
          >
            Urgent Repairs
          </TabButton>
          <TabButton
            onClick={() => setActiveTab('sections')}
            active={activeTab === 'sections'}
          >
            Section Repairs
          </TabButton>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        {activeTab === 'urgent' ? (
          <>
            {/* Info Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-900 mb-1">Short-notice urgent jobs</h3>
                  <p className="text-sm text-amber-800">
                    Set daily time slot availability for urgent repair work that needs immediate attention.
                  </p>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              {/* Month Header */}
              <div className="flex items-center justify-between mb-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" disabled>
                  <ChevronLeft className="w-5 h-5 text-gray-400" />
                </button>
                <h3 className="text-lg font-semibold text-gray-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" disabled>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Day Labels */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <div
                    key={`day-${idx}`}
                    className="text-center text-xs font-medium text-gray-600 py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isSelected = selectedDay === day;
                  const past = isPastDate(day);
                  const isToday = day === today;
                  const availableSlots = getAvailableSlots(day);
                  const hasAvailability = availableSlots.size > 0;

                  return (
                    <button
                      key={day}
                      onClick={() => !past && handleDayClick(day)}
                      disabled={past}
                      className={`aspect-square rounded-lg text-sm font-medium transition-all relative overflow-hidden ${
                        past
                          ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                          : isToday
                          ? 'bg-blue-100 text-[#0082ca]'
                          : isSelected
                          ? 'bg-white text-gray-900 border-2 border-[#0082ca] shadow-sm'
                          : hasAvailability
                          ? 'bg-white border border-gray-300 text-gray-900 hover:border-[#0082ca]'
                          : 'bg-white border border-gray-200 text-gray-900 hover:border-[#0082ca] hover:bg-blue-50'
                      }`}
                    >
                      <div className="relative z-10 flex items-center justify-center h-full">
                        {day}
                      </div>
                      {/* Time slot stripe indicators */}
                      {hasAvailability && !past && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
                          {TIME_SLOTS.map((slot) => (
                            <div
                              key={slot.id}
                              className="flex-1"
                              style={{
                                backgroundColor: availableSlots.has(slot.id) ? slot.color : 'transparent'
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Day Time Slots */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                {selectedDay} {monthNames[currentMonth.getMonth()].substring(0, 3)} - {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDay).getDay()]}
              </h3>

              <div className="space-y-2.5">
                {TIME_SLOTS.map((slot) => {
                  const isAvailable = isSlotAvailable(slot.id);
                  const Icon = slot.icon;
                  return (
                    <button
                      key={slot.id}
                      onClick={() => toggleTimeSlot(slot.id)}
                      style={{
                        backgroundColor: isAvailable ? slot.color : '#e5e7eb',
                        borderColor: isAvailable ? slot.colorDark : '#d1d5db',
                      }}
                      className={`w-full rounded-full px-5 py-3.5 text-left transition-all border-2 shadow-sm hover:shadow-md ${
                        isAvailable ? 'transform hover:scale-[1.02]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isAvailable ? 'bg-white' : 'bg-gray-300'
                            }`}
                          >
                            <Icon 
                              className="w-5 h-5"
                              style={{ color: isAvailable ? slot.color : '#6b7280' }}
                            />
                          </div>
                          <div>
                            <p className={`font-semibold text-sm ${isAvailable ? 'text-white' : 'text-gray-600'}`}>
                              {slot.label}
                            </p>
                            <p className={`text-xs ${isAvailable ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                              {slot.start} - {slot.end}
                            </p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isAvailable ? 'bg-white border-white' : 'bg-transparent border-gray-400'
                        }`}>
                          {isAvailable && (
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: slot.color }}
                            ></div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CalendarDays className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">Longer repair jobs</h3>
                  <p className="text-sm text-blue-800">
                    Select date ranges when you or your crew are available for section repair work.
                  </p>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              {/* Month Header */}
              <div className="flex items-center justify-between mb-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" disabled>
                  <ChevronLeft className="w-5 h-5 text-gray-400" />
                </button>
                <h3 className="text-lg font-semibold text-gray-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" disabled>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Day Labels */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <div
                    key={`day-${idx}`}
                    className="text-center text-xs font-medium text-gray-600 py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const past = isPastDate(day);
                  const isToday = day === today;
                  const inRange = isInDateRange(day);
                  const isStart = day === sectionStartDate;
                  const isEnd = day === sectionEndDate;

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      disabled={past}
                      className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                        past
                          ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                          : inRange
                          ? isStart || isEnd
                            ? 'bg-[#0082ca] text-white shadow-md'
                            : 'bg-blue-100 text-gray-900'
                          : isToday
                          ? 'bg-blue-50 text-[#0082ca] border-2 border-[#0082ca]'
                          : 'bg-white border border-gray-200 text-gray-900 hover:border-[#0082ca] hover:bg-blue-50'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Range Selection Info */}
              {sectionStartDate !== null && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      {sectionEndDate === null ? (
                        <p className="text-gray-600">
                          Start: <span className="font-semibold text-gray-900">{sectionStartDate} {monthNames[currentMonth.getMonth()].substring(0, 3)}</span> - Select end date
                        </p>
                      ) : (
                        <p className="text-gray-600">
                          Selected: <span className="font-semibold text-gray-900">
                            {formatDateRange(
                              `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(sectionStartDate).padStart(2, '0')}`,
                              `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(sectionEndDate).padStart(2, '0')}`
                            )}
                          </span>
                        </p>
                      )}
                    </div>
                    {sectionEndDate !== null && (
                      <button
                        onClick={addSectionRange}
                        className="bg-[#4b5563] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#374151] transition-all"
                      >
                        Add Range
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Saved Ranges */}
            {sectionAvailability.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Your availability windows</h3>
                <div className="space-y-2">
                  {sectionAvailability.map((range, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-900">
                          {formatDateRange(range.start, range.end)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeSectionRange(index)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Navigation */}
      {personaId && <Navigation personaId={personaId} />}
    </div>
  );
}