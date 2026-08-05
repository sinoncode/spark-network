import { useMemo } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Plus } from "lucide-react";
import type { AgendaEvent } from "@/types/agenda.types";

interface CalendarBoardProps {
    events: AgendaEvent[];
    selectedDate: Date;
    onEventClick: (event: AgendaEvent) => void;
    onCreateEvent: () => void;
    activeView: string;
}

const WEEK_DAYS = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

const isSameDay = (date1: Date, date2: Date) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

const startOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

const endOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const CalendarBoard = ({
    events,
    selectedDate,
    onEventClick,
    onCreateEvent,
    activeView,
}: CalendarBoardProps) => {
    const today = new Date();

    const calendarDays = useMemo(() => {
        const days: Date[] = [];

        if (activeView === "Month") {
            const monthStart = startOfMonth(selectedDate);
            const startDay = new Date(monthStart);
            startDay.setDate(monthStart.getDate() - monthStart.getDay());
            for (let i = 0; i < 42; i++) {
                const current = new Date(startDay);
                current.setDate(startDay.getDate() + i);
                days.push(current);
            }
        } else if (activeView === "Week") {
            const startDay = new Date(selectedDate);
            startDay.setDate(selectedDate.getDate() - selectedDate.getDay());
            for (let i = 0; i < 7; i++) {
                const current = new Date(startDay);
                current.setDate(startDay.getDate() + i);
                days.push(current);
            }
        } else if (activeView === "Day") {
            days.push(new Date(selectedDate));
        }

        return days;
    }, [selectedDate, activeView]);

    const getEventsForDay = (day: Date) => {
        return events.filter((event) => isSameDay(event.start, day));
    };

    return (
        <div className="p-3 sm:p-6 lg:p-8">

            {/* Week Days */}

            <div className={clsx("mb-4 grid gap-2 sm:gap-4", activeView === "Day" ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-7")}>
                {activeView === "Day" ? (
                    <div className="pb-3 text-center text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {WEEK_DAYS[selectedDate.getDay()]}
                    </div>
                ) : (
                    WEEK_DAYS.map((day) => (
                        <div
                            key={day}
                            className="pb-3 text-center text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                        >
                            {day}
                        </div>
                    ))
                )}
            </div>

            {/* Calendar Grid */}

            <div className={clsx("grid gap-3 sm:gap-4", activeView === "Day" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-7")}>

                {calendarDays.map((day, index) => {

                    const dayEvents = getEventsForDay(day);

                    const isToday = isSameDay(day, today);

                    const isCurrentMonth =
                        activeView === "Month" ? day.getMonth() === selectedDate.getMonth() : true;

                    const isSelected =
                        isSameDay(day, selectedDate);

                    return (

                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: index * 0.01,
                            }}
                            whileHover={{
                                y: -3,
                            }}
                            className={clsx(
                                "group relative min-h-[140px] rounded-3xl border bg-white p-3 transition-all duration-300 dark:bg-[#141414] sm:min-h-[180px] sm:p-4",
                                isCurrentMonth
                                    ? "border-slate-200 dark:border-slate-800"
                                    : "border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-[#1A1A1A] opacity-60",
                                isSelected &&
                                "ring-2 ring-sky-500",
                                "hover:border-sky-300 hover:shadow-xl"
                            )}
                        >

                            {/* Day Number */}

                            <div className="mb-4 flex items-center justify-between">

                                <div
                                    className={clsx(
                                        "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition",
                                        isToday
                                            ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white"
                                            : "text-slate-700 dark:text-slate-200"
                                    )}
                                >
                                    {day.getDate()}
                                </div>

                                <button
                                    onClick={onCreateEvent}
                                    className="opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                                >

                                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white">

                                        <Plus size={16} />

                                    </div>

                                </button>

                            </div>

                            {/* Events */}

                            <div className="space-y-2">
                                {dayEvents.length === 0 ? (
                                    <div className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500">
                                        No events
                                    </div>
                                ) : (
                                    dayEvents.map((event) => (
                                        <motion.button
                                            key={event.id}
                                            whileHover={{
                                                scale: 1.03,
                                            }}
                                            whileTap={{
                                                scale: 0.98,
                                            }}
                                            onClick={() => onEventClick(event)}
                                            className="w-full overflow-hidden rounded-2xl p-3 text-left shadow-sm transition hover:shadow-lg"
                                            style={{
                                                background: `${event.color}15`,
                                                borderLeft: `4px solid ${event.color}`,
                                            }}
                                        >
                                            <div className="flex items-start justify-between">

                                                <div className="min-w-0 flex-1">

                                                    <h4 className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                                                        {event.title}
                                                    </h4>

                                                    {event.category && (
                                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                            {event.category}
                                                        </p>
                                                    )}

                                                </div>

                                                <div
                                                    className="ml-2 h-3 w-3 rounded-full"
                                                    style={{
                                                        backgroundColor: event.color,
                                                    }}
                                                />

                                            </div>

                                            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">

                                                <span>
                                                    {event.start.toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </span>

                                                <span>
                                                    {event.end.toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </span>

                                            </div>

                                            {event.location && (
                                                <div className="mt-2 truncate text-xs text-slate-400 dark:text-slate-500">
                                                    📍 {event.location}
                                                </div>
                                            )}

                                            {event.members && event.members.length > 0 && (
                                                <div className="mt-3 flex -space-x-2">

                                                    {event.members.slice(0, 4).map((member) => (
                                                        <div
                                                            key={member.id}
                                                            title={`${member.name}\n${member.email}`}
                                                            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white dark:border-[#141414] bg-gradient-to-r from-sky-500 to-indigo-600 text-[10px] font-bold text-white cursor-pointer"
                                                        >
                                                            {member.name.charAt(0).toUpperCase()}
                                                        </div>
                                                    ))}

                                                    {event.members.length > 4 && (
                                                        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white dark:border-[#141414] bg-slate-200 dark:bg-slate-700 text-[10px] font-semibold text-slate-700 dark:text-slate-200">
                                                            +{event.members.length - 4}
                                                        </div>
                                                    )}

                                                </div>
                                            )}

                                        </motion.button>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div >
    );
};

export default CalendarBoard;