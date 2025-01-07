import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay, parse } from 'date-fns';

interface Event {
    date: Date;
    title: string;
}

const CalendarSection: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [view, setView] = useState<'Day' | 'Week' | 'Month'>('Month');

    const events: Event[] = [
        { date: new Date(), title: 'Today\'s Event' },
        { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5), title: 'Meeting with Team' },
        { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 12), title: 'Project Deadline' },
        { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20), title: 'Client Presentation' },
    ];

    const header = () => {
        const dateFormat = "MMMM yyyy";

        return (
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={prevMonth}
                        className="p-2 rounded hover:bg-gray-200"
                        aria-label="Previous Month"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-semibold">{format(currentDate, dateFormat)}</h2>
                    <button
                        onClick={nextMonth}
                        className="p-2 rounded hover:bg-gray-200"
                        aria-label="Next Month"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={today}
                        className="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        Today
                    </button>
                    <div className="flex items-center gap-1">
                        {['Day', 'Week', 'Month'].map((v) => (
                            <button
                                key={v}
                                onClick={() => setView(v as 'Day' | 'Week' | 'Month')}
                                className={`py-1 px-3 rounded-md text-sm font-medium ${
                                    view === v ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                } transition`}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const daysOfWeek = () => {
        const dateFormat = "EEE";
        const days = [];

        let startDate = startOfWeek(currentDate, { weekStartsOn: 0 });

        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} className="text-center font-medium text-gray-600">
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="grid grid-cols-7 gap-0 border-b border-gray-200 pb-2">{days}</div>;
    };

    const cells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;

                const dayEvents = events.filter(event => isSameDay(event.date, day));

                days.push(
                    <div
                        className={`p-2 border-r border-b border-gray-200 min-h-[100px] relative ${
                            !isSameMonth(day, monthStart) ? 'bg-gray-100 text-gray-400' : ''
                        } ${isSameDay(day, new Date()) ? 'border-blue-500' : ''}`}
                        key={day.toString()}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-sm">{formattedDate}</span>
                            {dayEvents.length > 0 && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                        </div>
                        {dayEvents.map((event, idx) => (
                            <div key={idx} className="text-xs text-gray-700 mt-1">
                                {event.title}
                            </div>
                        ))}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7 gap-0" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }

        return <div>{rows}</div>;
    };

    const onDateClick = (day: Date) => {
        setSelectedDate(day);
        alert(`Selected Date: ${format(day, 'PPP')}`);
    };

    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const today = () => {
        setCurrentDate(new Date());
    };

    return (
        <section className="py-8 sm:p-8">
            <div className="w-full max-w-4xl mx-auto px-4 lg:px-8 xl:px-14">
                {header()}

                {daysOfWeek()}

                <div className="mt-4">
                    {cells()}
                </div>
            </div>
        </section>
    );
};

export default CalendarSection;