import { motion } from "framer-motion";
import {
    Clock,
    MapPin,
    Tag,
    Users,
} from "lucide-react";

import type { AgendaEvent } from "@/types/agenda.types";

interface CalendarEventCardProps {
    event: AgendaEvent;
    onClick: (event: AgendaEvent) => void;
}

const CalendarEventCard = ({
    event,
    onClick,
}: CalendarEventCardProps) => {
    const formatTime = (date: Date) =>
        date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <motion.button
            whileHover={{
                scale: 1.03,
                y: -2,
            }}
            whileTap={{
                scale: 0.98,
            }}
            onClick={() => onClick(event)}
            className="group relative w-full overflow-hidden rounded-2xl border border-white/40 bg-white dark:bg-[#141414]/90 p-4 text-left shadow-md backdrop-blur-xl transition-all duration-300 hover:shadow-xl"
        >
            {/* Left Accent */}
            <div
                className="absolute left-0 top-0 h-full w-1.5 rounded-l-2xl"
                style={{
                    backgroundColor: event.color,
                }}
            />

            {/* Header */}
            <div className="flex items-start justify-between gap-3 pl-3">
                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                        {event.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Clock size={12} />
                        {formatTime(event.start)} - {formatTime(event.end)}
                    </div>
                </div>

                <div
                    className="h-3 w-3 rounded-full shadow-sm"
                    style={{
                        backgroundColor: event.color,
                    }}
                />
            </div>

            {/* Description */}
            {event.description && (
                <p className="mt-3 line-clamp-2 pl-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {event.description}
                </p>
            )}

            {/* Category */}
            {event.category && (
                <div className="mt-3 flex items-center gap-2 pl-3 text-xs text-slate-600 dark:text-slate-300">
                    <Tag
                        size={13}
                        style={{
                            color: event.color,
                        }}
                    />
                    <span>{event.category}</span>
                </div>
            )}

            {/* Location */}
            {event.location && (
                <div className="mt-2 flex items-center gap-2 pl-3 text-xs text-slate-600 dark:text-slate-300">
                    <MapPin
                        size={13}
                        style={{
                            color: event.color,
                        }}
                    />
                    <span className="truncate">
                        {event.location}
                    </span>
                </div>
            )}

            {/* Members */}
            {event.members && event.members.length > 0 && (
                <div className="mt-4 flex items-center justify-between pl-3">
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Users
                            size={13}
                            style={{
                                color: event.color,
                            }}
                        />
                        <span>{event.members.length} Members</span>
                    </div>

                    <div className="flex -space-x-2">
                        {event.members.slice(0, 3).map((member, index) => (
                            <div
                                key={member.id}
                                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-[#141414] bg-gradient-to-br from-sky-500 to-indigo-600 text-[10px] font-bold text-white shadow"
                            >
                                {member.name.charAt(0).toUpperCase()}
                            </div>
                        ))}

                        {event.members.length > 3 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-[#141414] bg-slate-200 dark:bg-slate-700 text-[10px] font-semibold text-slate-700 dark:text-slate-200">
                                +{event.members.length - 3}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Hover Glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-10"
                style={{
                    backgroundColor: event.color,
                }}
            />
        </motion.button>
    );
};

export default CalendarEventCard;