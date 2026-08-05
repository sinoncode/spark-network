import { motion } from "framer-motion";
import {
    CalendarDays,
    Clock,
    MapPin,
    Users,
    ArrowRight,
} from "lucide-react";

import type { AgendaEvent } from "@/types/agenda.types";

interface UpcomingMeetingProps {
    events: AgendaEvent[];
    onSelect?: (event: AgendaEvent) => void;
}

const UpcomingMeeting = ({
    events,
    onSelect,
}: UpcomingMeetingProps) => {
    const upcomingEvents = [...events]
        .filter((event) => event.end >= new Date())
        .sort(
            (a, b) =>
                a.start.getTime() - b.start.getTime()
        )
        .slice(0, 5);

    const formatDate = (date: Date) =>
        date.toLocaleDateString([], {
            day: "numeric",
            month: "short",
        });

    const formatTime = (date: Date) =>
        date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            className="rounded-3xl border border-white/40 bg-white dark:bg-[#141414]/90 p-6 shadow-lg backdrop-blur-xl"
        >
            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                        Upcoming Meetings
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Your next scheduled events
                    </p>

                </div>

                <div className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow">
                    {upcomingEvents.length}
                </div>

            </div>

            {/* Empty State */}

            {upcomingEvents.length === 0 && (

                <div className="flex flex-col items-center justify-center py-14 text-center">

                    <CalendarDays
                        size={50}
                        className="text-slate-300 dark:text-slate-600"
                    />

                    <h3 className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-200">
                        No Upcoming Meetings
                    </h3>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Create your first event to see it here.
                    </p>

                </div>

            )}

            {/* Meeting List */}

            <div className="space-y-4">

                {upcomingEvents.map((event, index) => (

                    <motion.button
                        key={event.id}
                        initial={{
                            opacity: 0,
                            x: -20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: index * 0.08,
                        }}
                        whileHover={{
                            scale: 1.02,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        onClick={() => onSelect?.(event)}
                        className="group flex w-full items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-[#1A1A1A] p-4 text-left transition hover:border-sky-200 hover:bg-white dark:bg-[#141414] hover:shadow-md"
                    >
                        {/* Color */}

                        <div
                            className="h-14 w-2 rounded-full"
                            style={{
                                backgroundColor: event.color,
                            }}
                        />

                        {/* Content */}

                        <div className="min-w-0 flex-1">

                            <div className="flex items-center justify-between">

                                <h3 className="truncate text-base font-semibold text-slate-800 dark:text-slate-100">
                                    {event.title}
                                </h3>

                                <ArrowRight
                                    size={18}
                                    className="text-slate-400 dark:text-slate-500 transition group-hover:translate-x-1"
                                />

                            </div>

                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">

                                <div className="flex items-center gap-2">

                                    <CalendarDays size={15} />

                                    {formatDate(event.start)}

                                </div>

                                <div className="flex items-center gap-2">

                                    <Clock size={15} />

                                    {formatTime(event.start)}

                                </div>

                                {event.location && (

                                    <div className="flex items-center gap-2">

                                        <MapPin size={15} />

                                        <span className="truncate">
                                            {event.location}
                                        </span>

                                    </div>

                                )}

                            </div>

                            {/* Members */}

                            {event.members &&
                                event.members.length > 0 && (

                                    <div className="mt-4 flex items-center justify-between">

                                        <div className="flex -space-x-2">

                                            {event.members
                                                .slice(0, 4)
                                                .map((member, i) => (

                                                    <div
                                                        key={member.id}
                                                        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white dark:border-[#141414] bg-gradient-to-r from-sky-500 to-indigo-600 text-xs font-bold text-white shadow"
                                                    >
                                                        {member.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                ))}

                                            {event.members.length > 4 && (

                                                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white dark:border-[#141414] bg-slate-300 dark:bg-slate-600 text-xs font-semibold">
                                                    +{event.members.length - 4}
                                                </div>

                                            )}

                                        </div>

                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">

                                            <Users size={14} />

                                            {event.members.length} Members

                                        </div>

                                    </div>

                                )}

                        </div>

                    </motion.button>

                ))}

            </div>

            {/* Footer */}

            {upcomingEvents.length > 0 && (

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 p-5 text-white">

                    <p className="text-sm opacity-80">
                        Next Meeting
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                        {upcomingEvents[0].title}
                    </h3>

                    <p className="mt-1 text-sm opacity-90">
                        {formatDate(upcomingEvents[0].start)} •{" "}
                        {formatTime(upcomingEvents[0].start)}
                    </p>

                </div>

            )}

        </motion.div>
    );
};

export default UpcomingMeeting;