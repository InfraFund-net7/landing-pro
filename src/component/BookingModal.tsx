// 'use client';
// import React, { useState } from 'react';
// import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';
// import { utcToZonedTime } from 'date-fns-tz';
// import { X } from 'lucide-react';

// const BookingModal = () => {
//     const [currentMonth, setCurrentMonth] = useState(new Date('2025-11-01')); // نوامبر 2025
//     const [selectedDate, setSelectedDate] = useState(new Date('2025-11-04')); // تاریخ انتخابی پیش‌فرض
//     const [duration, setDuration] = useState('30 mins'); // پیش‌فرض 30-minute session
//     const [timeZone, setTimeZone] = useState('UTC+0:00 Dublin, London, Lisbon');

//     // اسلات‌های زمانی نمونه (available slots برای selectedDate)
//     const timeSlots = [
//         { time: '15:00', label: '3:00 pm' },
//         { time: '15:30', label: '3:30 pm' },
//         { time: '16:00', label: '4:00 pm' },
//         { time: '18:00', label: '6:00 pm' },
//         { time: '18:30', label: '6:30 pm' },
//     ];

//     const handleDateSelect = (date: Date) => {
//         setSelectedDate(date);
//     };

//     const handlePrevMonth = () => {
//         setCurrentMonth(subMonths(currentMonth, 1));
//     };

//     const handleNextMonth = () => {
//         setCurrentMonth(addMonths(currentMonth, 1));
//     };

//     const bookMeeting = (slot: string) => {
//         const startTime = new Date(selectedDate);
//         const [hours, minutes] = slot.split(':').map(Number);
//         startTime.setHours(hours, minutes);
//         // Integrate با Google Calendar: redirect به لینک با params (اگه API support کنه، custom کن)
//         const calendarUrl = 'https://calendar.app.google/JhczsLXzGw66F17s8';
//         window.open(`${calendarUrl}?date=${format(startTime, 'yyyy-MM-dd')}&time=${slot}&duration=${duration}`, '_blank');
//         // یا alert برای تست: alert(`رزرو شد: ${format(startTime, 'yyyy-MM-dd HH:mm')} (Duration: ${duration})`);
//     };

//     // تولید روزهای ماه برای grid تقویم
//     const monthStart = startOfMonth(currentMonth);
//     const monthEnd = endOfMonth(currentMonth);
//     const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
//     const firstDayOfWeek = monthStart.getDay(); // 0=Sunday
//     const paddedDays: (Date | null)[] = Array.from({ length: firstDayOfWeek }, () => null).concat(days as (Date | null)[]);

//     // فرمت ماه
//     const monthYear = format(currentMonth, 'MMMM yyyy');

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
//                 {/* Header با primary color */}
//                 <div className="bg-primary text-white p-6 flex justify-between items-center relative">
//                     <h2 className="text-2xl font-bold">Contact Us</h2>
//                     <button className="text-white hover:text-gray-200"><X size={40} /></button>
//                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
//                         <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
//                         <div className="w-2 h-2 bg-white rounded-full"></div>
//                     </div>
//                 </div>

//                 {/* Main Content: Flex layout */}
//                 <div className="flex flex-1 overflow-hidden">
//                     {/* Left Sidebar: Profile & Calendar */}
//                     <div className="w-1/2 bg-blue-50 p-6 flex flex-col">
//                         {/* Profile Section */}
//                         <div className="text-center mb-6">
//                             <div className="w-20 h-20 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
//                                 <span className="text-2xl font-bold text-primary">IA</span> {/* Placeholder for avatar - Iman Alibeigi */}
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800 mb-1">Meet with Iman Alibeigi</h3>
//                             <p className="text-sm text-gray-600">{monthYear}</p>
//                         </div>

//                         {/* Calendar Grid */}
//                         <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
//                             <div className="flex justify-between items-center mb-4">
//                                 <button onClick={handlePrevMonth} className="text-primary">&lt;</button>
//                                 <h4 className="font-semibold text-gray-800">{monthYear}</h4>
//                                 <button onClick={handleNextMonth} className="text-primary">&gt;</button>
//                             </div>
//                             <div className="grid grid-cols-7 gap-1 text-center text-sm">
//                                 {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
//                                     <div key={day} className="font-medium text-gray-500 py-2">{day}</div>
//                                 ))}
//                                 {paddedDays.slice(0, 42).map((day, idx) => ( // 6 rows max
//                                     <div
//                                         key={idx}
//                                         className={`p-2 h-12 flex items-center justify-center rounded cursor-pointer transition-colors ${day
//                                             ? isSameMonth(day, currentMonth)
//                                                 ? isSameDay(day, selectedDate)
//                                                     ? 'bg-primary text-white'
//                                                     : 'hover:bg-gray-100 text-gray-800'
//                                                 : 'text-gray-300'
//                                             : 'invisible'
//                                             }`}
//                                         onClick={() => day && handleDateSelect(day)}
//                                     >
//                                         {day?.getDate() || ''}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Sidebar: Duration & Time Slots */}
//                     <div className="w-1/2 bg-gray-50 p-6 flex flex-col">
//                         {/* Duration */}
//                         <div className="mb-6">
//                             <label className="block text-sm font-medium text-black mb-2">Meeting duration</label>
//                             <select
//                                 value={duration}
//                                 onChange={(e) => setDuration(e.target.value)}
//                                 className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option>30 mins</option>
//                                 <option>60 mins</option>
//                             </select>
//                         </div>

//                         {/* Time Slots */}
//                         <div className="flex-1">
//                             <h4 className="font-semibold text-black mb-2">What time works best?</h4>
//                             <p className="text-sm text-black mb-2">
//                                 Showing times for {format(selectedDate, 'MMMM d, yyyy')}
//                             </p>
//                             <p className="text-xs text-black mb-4">{timeZone}</p>
//                             <div className="space-y-2 mb-6">
//                                 {timeSlots.map((slot) => (
//                                     <button
//                                         key={slot.time}
//                                         onClick={() => bookMeeting(slot.time)}
//                                         className="w-full p-3 text-black bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left text-sm"
//                                     >
//                                         {slot.label}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BookingModal;
