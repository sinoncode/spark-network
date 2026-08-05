import { motion } from "framer-motion";
import {
    Briefcase,
    Users,
    Code2,
    GraduationCap,
    Palette,
} from "lucide-react";

import type { AgendaEvent } from "@/types/agenda.types";

interface CategoryProgressProps {
    events: AgendaEvent[];
}

const categories = [
    {
        name: "Meeting",
        icon: Users,
        color: "#3B82F6",
    },
    {
        name: "Development",
        icon: Code2,
        color: "#8B5CF6",
    },
    {
        name: "Design",
        icon: Palette,
        color: "#EC4899",
    },
    {
        name: "Training",
        icon: GraduationCap,
        color: "#10B981",
    },
    {
        name: "Business",
        icon: Briefcase,
        color: "#F59E0B",
    },
];

const CategoryProgress = ({
    events,
}: CategoryProgressProps) => {
    const totalEvents = events.length || 1;

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

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                        Category Progress
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Distribution of your agenda
                    </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-lg font-bold text-white shadow-lg">
                    {events.length}
                </div>

            </div>

            {/* Categories */}

            <div className="space-y-6">

                {categories.map((category, index) => {

                    const count = events.filter(
                        (event) =>
                            event.category?.toLowerCase() ===
                            category.name.toLowerCase()
                    ).length;

                    const percentage = Math.round(
                        (count / totalEvents) * 100
                    );

                    const Icon = category.icon;

                    return (
                        <motion.div
                            key={category.name}
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
                            className="rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] p-4"
                        >
                            <div className="mb-3 flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div
                                        className="flex h-11 w-11 items-center justify-center rounded-xl"
                                        style={{
                                            backgroundColor: `${category.color}20`,
                                        }}
                                    >
                                        <Icon
                                            size={20}
                                            color={category.color}
                                        />
                                    </div>

                                    <div>

                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200">
                                            {category.name}
                                        </h4>

                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {count} Events
                                        </p>

                                    </div>

                                </div>

                                <div
                                    className="rounded-xl px-3 py-1 text-sm font-bold text-white"
                                    style={{
                                        backgroundColor: category.color,
                                    }}
                                >
                                    {percentage}%
                                </div>

                            </div>

                            {/* Progress */}

                            <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                                <motion.div
                                    initial={{
                                        width: 0,
                                    }}
                                    animate={{
                                        width: `${percentage}%`,
                                    }}
                                    transition={{
                                        duration: 1,
                                        delay: index * 0.1,
                                    }}
                                    className="h-full rounded-full"
                                    style={{
                                        backgroundColor: category.color,
                                    }}
                                />

                            </div>

                        </motion.div>
                    );
                })}

            </div>

            {/* Footer */}

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 p-5 text-white">

                <p className="text-sm opacity-80">
                    Total Scheduled
                </p>

                <div className="mt-2 flex items-end justify-between">

                    <h3 className="text-3xl font-bold">
                        {events.length}
                    </h3>

                    <div className="rounded-xl bg-white dark:bg-[#141414]/20 px-3 py-1 text-sm font-semibold backdrop-blur">
                        Active Agenda
                    </div>

                </div>

            </div>
        </motion.div>
    );
};

export default CategoryProgress;