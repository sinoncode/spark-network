import { useState } from "react";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    CalendarDays,
} from "lucide-react";

interface CalendarHeaderProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    activeView: string;
    onViewChange: (view: string) => void;
}

const views = ["Month", "Week", "Day"];

const CalendarHeader = ({
    selectedDate,
    onDateChange,
    activeView,
    onViewChange,
}: CalendarHeaderProps) => {

    const previousMonth = () => {
        const date = new Date(selectedDate);
        if (activeView === "Month") {
            date.setMonth(date.getMonth() - 1);
        } else if (activeView === "Week") {
            date.setDate(date.getDate() - 7);
        } else if (activeView === "Day") {
            date.setDate(date.getDate() - 1);
        }
        onDateChange(date);
    };

    const nextMonth = () => {
        const date = new Date(selectedDate);
        if (activeView === "Month") {
            date.setMonth(date.getMonth() + 1);
        } else if (activeView === "Week") {
            date.setDate(date.getDate() + 7);
        } else if (activeView === "Day") {
            date.setDate(date.getDate() + 1);
        }
        onDateChange(date);
    };

    const goToToday = () => {
        onDateChange(new Date());
    };

    return (
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 dark:border-slate-800/50 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">

            {/* Left */}

            <div className="flex flex-wrap items-center gap-3 sm:gap-5">

                <button
                    onClick={previousMonth}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 sm:h-11 sm:w-11"
                >
                    <ChevronLeft size={18} />
                </button>

                <button
                    onClick={nextMonth}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 sm:h-11 sm:w-11"
                >
                    <ChevronRight size={18} />
                </button>

                <div>

                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 sm:text-3xl">
                        {selectedDate.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                        })}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                        })}
                    </p>

                </div>

            </div>

            {/* Right */}

            <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">

                <button
                    onClick={goToToday}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold shadow-lg transition hover:scale-105"
                >
                    <CalendarDays size={18} />
                    Today
                </button>

                <div className="flex w-full flex-wrap rounded-2xl bg-slate-100 p-1 dark:bg-slate-800 sm:w-auto">

                    {views.map((view) => (
                        <button
                            key={view}
                            onClick={() => onViewChange(view)}
                            className="relative flex-1 px-4 py-2 text-sm font-semibold sm:flex-none sm:px-6"
                        >
                            {activeView === view && (
                                <motion.div
                                    layoutId="calendar-view"
                                    className="absolute inset-0 rounded-xl bg-white dark:bg-[#141414] shadow"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                />
                            )}

                            <span
                                className={`relative z-10 ${activeView === view
                                    ? "text-slate-800 dark:text-slate-100"
                                    : "text-slate-500 dark:text-slate-400"
                                    }`}
                            >
                                {view}
                            </span>
                        </button>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default CalendarHeader;