import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import type { AgendaEvent } from "@/types/agenda.types";

interface MiniCalendarProps {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
    events: AgendaEvent[];
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MiniCalendar = ({
    selectedDate,
    onSelectDate,
    events,
}: MiniCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    );

    const today = new Date();

    const startOfMonth = useMemo(
        () =>
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                1
            ),
        [currentMonth]
    );

    const endOfMonth = useMemo(
        () =>
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                0
            ),
        [currentMonth]
    );

    const startDay = startOfMonth.getDay();

    const days = [];

    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }

    for (let day = 1; day <= endOfMonth.getDate(); day++) {
        days.push(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day
            )
        );
    }

    const previousMonth = () => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1
            )
        );
    };

    const nextMonth = () => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1
            )
        );
    };

    const sameDay = (a: Date, b: Date) =>
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear();

    const hasEvents = (date: Date) =>
        events.some((event) => sameDay(event.start, date));

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/40 bg-white dark:bg-[#141414]/90 p-6 shadow-lg backdrop-blur-xl"
        >
            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {currentMonth.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    })}
                </h3>

                <div className="flex gap-2">

                    <button
                        onClick={previousMonth}
                        className="rounded-xl border border-slate-200 dark:border-slate-800 p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <button
                        onClick={nextMonth}
                        className="rounded-xl border border-slate-200 dark:border-slate-800 p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800"
                    >
                        <ChevronRight size={18} />
                    </button>

                </div>

            </div>

            {/* Week Days */}

            <div className="mb-3 grid grid-cols-7 gap-2">

                {weekDays.map((day) => (
                    <div
                        key={day}
                        className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500"
                    >
                        {day}
                    </div>
                ))}

            </div>

            {/* Dates */}

            <div className="grid grid-cols-7 gap-2">

                {days.map((date, index) => {

                    if (!date) {
                        return (
                            <div
                                key={index}
                                className="aspect-square"
                            />
                        );
                    }

                    const isSelected = sameDay(
                        date,
                        selectedDate
                    );

                    const isToday = sameDay(
                        date,
                        today
                    );

                    return (
                        <motion.button
                            key={date.toISOString()}
                            whileHover={{
                                scale: 1.08,
                            }}
                            whileTap={{
                                scale: 0.95,
                            }}
                            onClick={() => onSelectDate(date)}
                            className={`relative aspect-square rounded-2xl text-sm font-medium transition

              ${isSelected
                                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg"
                                    : isToday
                                        ? "border border-sky-400 text-sky-600"
                                        : "hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                                }
              `}
                        >
                            {date.getDate()}

                            {hasEvents(date) && (
                                <span
                                    className={`absolute bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full

                  ${isSelected
                                            ? "bg-white dark:bg-[#141414]"
                                            : "bg-sky-500"
                                        }
                  `}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Footer */}

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] px-4 py-3">

                <div>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        Selected
                    </p>

                    <h4 className="font-semibold text-slate-700 dark:text-slate-200">
                        {selectedDate.toLocaleDateString(undefined, {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                        })}
                    </h4>

                </div>

                <div className="rounded-xl bg-sky-500 px-3 py-1 text-sm font-semibold text-white">
                    {
                        events.filter((e) =>
                            sameDay(e.start, selectedDate)
                        ).length
                    }{" "}
                    Events
                </div>

            </div>

        </motion.div>
    );
};

export default MiniCalendar;