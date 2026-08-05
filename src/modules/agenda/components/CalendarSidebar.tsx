import { motion } from "framer-motion";
import {
    CalendarDays,
    Clock3,
    FolderKanban,
    Users,
    MapPin,
} from "lucide-react";
import { AgendaEvent } from "@/types/agenda.types";



interface CalendarSidebarProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    events: AgendaEvent[];
}

const CalendarSidebar = ({
    selectedDate,
    events,
}: CalendarSidebarProps) => {
    const todayEvents = events.filter(
        (event) =>
            event.start.toDateString() === selectedDate.toDateString()
    );

    const categories = [...new Set(events.map((e) => e.category))];

    return (
        <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4 sm:space-y-6"
        >
            {/* Today's Card */}

            <div className="group relative overflow-hidden rounded-[24px] border border-white/20 bg-gradient-to-br from-white/15 via-white/10 to-white/5 p-5 text-white backdrop-blur-3xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-white/30 hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)] sm:rounded-[32px] sm:p-7">

                {/* Ambient Glow */}
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-400/20 blur-[100px]" />
                <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]" />

                {/* Glass Reflection */}
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />

                {/* Shine Effect */}
                <div className="absolute -left-32 top-0 h-full w-24 rotate-12 bg-white/10 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />

                {/* Content */}
                <div className="relative z-10">

                    <div className="flex items-center justify-between">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
                            <CalendarDays size={28} />
                        </div>

                        <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-xl">
                            Today
                        </span>

                    </div>

                    <div className="mt-10">

                        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
                            {selectedDate.getDate()}
                        </h2>

                        <p className="mt-2 text-white/70">
                            {selectedDate.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>

                    </div>

                    <div className="mt-10 rounded-3xl border border-white/15 bg-white/8 p-5 backdrop-blur-2xl">

                        <p className="text-sm text-white/60">
                            Today's Events
                        </p>

                        <div className="mt-3 flex items-end justify-between">

                            <h1 className="text-3xl font-bold sm:text-5xl">
                                {todayEvents.length}
                            </h1>

                            <div className="rounded-xl bg-emerald-400/20 px-3 py-1 text-xs font-medium text-emerald-200">
                                Active
                            </div>

                        </div>

                    </div>

                </div>

            </div>
            {/* Stats */}

            <div className="group relative overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-br from-white/15 via-white/10 to-white/5 p-7 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-white/30 hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)]">

                {/* Ambient Glow */}
                <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-sky-400/15 blur-[90px]" />
                <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-violet-500/15 blur-[90px]" />

                {/* Glass Reflection */}
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />

                <div className="relative z-10">

                    <h3 className="mb-7 text-xl font-semibold tracking-wide text-white">
                        Overview
                    </h3>

                    <div className="space-y-4">

                        {/* Total Events */}
                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-500/10">
                                    <CalendarDays
                                        size={22}
                                        className="text-sky-300"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm text-white/60">
                                        Total Events
                                    </p>

                                    <p className="font-semibold text-white">
                                        All scheduled events
                                    </p>
                                </div>

                            </div>

                            <span className="text-2xl font-bold text-white">
                                {events.length}
                            </span>

                        </div>

                        {/* Today's Events */}
                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-green-400/20 bg-green-500/10">
                                    <Clock3
                                        size={22}
                                        className="text-green-300"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm text-white/60">
                                        Today's Events
                                    </p>

                                    <p className="font-semibold text-white">
                                        Happening today
                                    </p>
                                </div>

                            </div>

                            <span className="text-2xl font-bold text-white">
                                {todayEvents.length}
                            </span>

                        </div>

                        {/* Categories */}
                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
                                    <FolderKanban
                                        size={22}
                                        className="text-violet-300"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm text-white/60">
                                        Categories
                                    </p>

                                    <p className="font-semibold text-white">
                                        Event groups
                                    </p>
                                </div>

                            </div>

                            <span className="text-2xl font-bold text-white">
                                {categories.length}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Categories */}

            <div className="group relative overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-br from-white/15 via-white/10 to-white/5 p-7 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-white/30 hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)]">

                {/* Ambient Glow */}
                <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-sky-400/15 blur-[100px]" />
                <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-violet-500/15 blur-[100px]" />

                {/* Glass Reflection */}
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/15 via-transparent to-transparent" />

                <div className="relative z-10">

                    <h3 className="mb-5 text-lg font-semibold tracking-wide text-white sm:mb-7 sm:text-xl">
                        Categories
                    </h3>

                    <div className="space-y-5">

                        {categories.map((category, index) => {

                            const count = events.filter(
                                (event) => event.category === category
                            ).length;

                            const percentage = (count / events.length) * 100;

                            return (

                                <div
                                    key={index}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
                                >

                                    <div className="mb-3 flex items-center justify-between">

                                        <div>
                                            <p className="font-medium text-white">
                                                {category}
                                            </p>

                                            <p className="text-xs text-white/50">
                                                {percentage.toFixed(0)}% of total events
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-white/10 bg-white/10 px-3 py-1 backdrop-blur-xl">
                                            <span className="font-semibold text-white">
                                                {count}
                                            </span>
                                        </div>

                                    </div>

                                    <div className="relative h-3 overflow-hidden rounded-full border border-white/10 bg-white/5">

                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${percentage}%`,
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                ease: "easeOut",
                                            }}
                                            className="relative h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500"
                                        >

                                            {/* Shine */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70" />

                                        </motion.div>

                                    </div>

                                </div>

                            );
                        })}

                    </div>

                </div>

            </div>

            {/* Upcoming */}

            <div className="group relative overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-br from-white/15 via-white/10 to-white/5 p-7 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-white/30 hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)]">

                {/* Ambient Glow */}
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-[120px]" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/15 blur-[120px]" />

                {/* Glass Reflection */}
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/20 via-transparent to-transparent" />

                <div className="relative z-10">

                    <h3 className="mb-5 text-lg font-semibold tracking-wide text-white sm:mb-7 sm:text-xl">
                        Upcoming Events
                    </h3>

                    <div className="space-y-5">

                        {events.slice(0, 4).map((event) => (

                            <motion.div
                                key={event.id}
                                whileHover={{
                                    y: -4,
                                    scale: 1.02,
                                }}
                                transition={{ duration: 0.25 }}
                                className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                            >

                                {/* Header */}
                                <div className="flex items-start justify-between">

                                    <div className="flex items-center gap-4">

                                        <div
                                            className="h-4 w-4 rounded-full shadow-[0_0_18px]"
                                            style={{
                                                backgroundColor: event.color,
                                                boxShadow: `0 0 20px ${event.color}`,
                                            }}
                                        />

                                        <div>

                                            <h4 className="font-semibold text-white">
                                                {event.title}
                                            </h4>

                                            <p className="mt-1 text-sm text-white/55">
                                                {event.category}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70 backdrop-blur-xl">
                                        Upcoming
                                    </div>

                                </div>

                                {/* Time */}
                                <div className="mt-5 flex items-center gap-2 text-sm text-white/65">

                                    <Clock3 size={16} />

                                    {event.start.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}

                                </div>

                                {/* Location */}
                                {event.location && (

                                    <div className="mt-3 flex items-center gap-2 text-sm text-white/65">

                                        <MapPin size={16} />

                                        {event.location}

                                    </div>

                                )}

                                {/* Members */}
                                {event.members && (

                                    <div className="mt-5 flex items-center justify-between">

                                        <div className="flex items-center gap-2 text-sm text-white/60">

                                            <Users size={16} />

                                            Team

                                        </div>

                                        <div className="flex -space-x-3">

                                            {event.members.map((member) => (

                                                <div
                                                    key={member.id}
                                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 text-sm font-semibold text-white shadow-lg backdrop-blur-xl"
                                                >
                                                    {member.name.charAt(0).toUpperCase()}
                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                )}

                            </motion.div>

                        ))}

                    </div>

                </div>

            </div>

        </motion.div>
    );
};

export default CalendarSidebar;