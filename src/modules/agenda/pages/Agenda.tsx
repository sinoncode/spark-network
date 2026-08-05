import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Plus,
    Sparkles,
} from "lucide-react";

import CalendarSidebar from "../components/CalendarSidebar";
import CalendarHeader from "../components/CalendarHeader";
import CalendarBoard from "../components/CalendarBoard";
import EventDialog from "../components/EventDialog";
import CategoryProgress from "../components/CategoryProgress";
import UpcomingMeeting from "../components/UpcomingMeeting";

import { useAgendaStore } from "@/store/agendaStore";

import type { AgendaEvent, AgendaPayload } from "@/types/agenda.types";


const Agenda = () => {
    const {
        events,
        fetchEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        selectedEvent,
        setSelectedEvent
    } = useAgendaStore();

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const [selectedDate, setSelectedDate] =
        useState(new Date(2026, 0, 12)); // Consider using current date or keep as is

    const [activeView, setActiveView] =
        useState("Month");

    const [search, setSearch] =
        useState("");

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const filteredEvents = useMemo(() => {
        if (!search.trim()) return events;

        return events.filter((event) =>
            event.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [events, search]);

    const openCreateDialog = () => {
        setSelectedEvent(null);
        setDialogOpen(true);
    };

    const openEditDialog = (
        event: AgendaEvent
    ) => {
        setSelectedEvent(event);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedEvent(null);
    };

    const saveEvent = async (
        payload: AgendaPayload
    ) => {
        if (selectedEvent) {
            await updateEvent(selectedEvent.id, payload);
        } else {
            await createEvent(payload);
        }
        closeDialog();
    };

    const removeEvent = async (id: string) => {
        await deleteEvent(id);
        closeDialog();
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
                className="min-h-screen bg-[#ECECEC] p-2 sm:p-4 lg:p-8 dark:bg-[#0A0A0A] dark:[color-scheme:dark]"
            >
                <div className="mx-auto min-h-[calc(100vh-1rem)] max-w-[1850px] overflow-hidden rounded-[24px] bg-white shadow-[0_35px_80px_rgba(0,0,0,0.18)] dark:bg-[#141414] sm:rounded-[32px] lg:min-h-[95vh] lg:rounded-[42px]">

                    <div className="flex h-full flex-col xl:flex-row">

                        {/* ================= Sidebar ================= */}

                        <aside className="w-full shrink-0 overflow-y-auto overflow-x-hidden bg-[linear-gradient(180deg,#1f6ea9_0%,#155789_40%,#0a2f4f_70%,#040404_100%)] p-4 text-white sm:p-6 xl:w-[320px] xl:p-7 2xl:w-[360px] xl:flex xl:flex-col">

                            <CalendarSidebar
                                selectedDate={selectedDate}
                                onDateChange={setSelectedDate}
                                events={filteredEvents}
                            />

                        </aside>

                        {/* ================= Main ================= */}

                        <div className="flex min-w-0 flex-1 flex-col bg-[#F7F7F7] dark:bg-[#1A1A1A]">

                            {/* ================= Top Toolbar ================= */}

                            <div className="border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-[#141414] sm:px-6 lg:px-8 lg:py-6">

                                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                    {/* Left */}

                                    <div>

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#1f6ea9_0%,#155789_40%,#0a2f4f_70%,#040404_100%)] text-white shadow-lg">

                                                <Sparkles size={22} />

                                            </div>

                                            <div>

                                                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                    Agenda
                                                </h1>

                                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                    Organize meetings, schedules and projects
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Right */}

                                    <div className="flex flex-wrap items-center gap-4">

                                        {/* Search */}

                                        <div className="relative">

                                            <Search
                                                size={18}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                                            />

                                            <input
                                                value={search}
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                                placeholder="Search events..."
                                                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-5 text-sm outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-[#1A1A1A] dark:bg-[#141414] dark:text-white"
                                            />

                                        </div>

                                        {/* Add Button */}

                                        <button
                                            onClick={openCreateDialog}
                                            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl sm:w-auto"
                                        >

                                            <Plus size={18} />

                                            New Event
 
                                        </button>

                                    </div>

                                </div>

                            </div>

                            {/* ================= Calendar Section ================= */}

                            <div className="flex flex-1 overflow-hidden">

                                <div className="flex min-w-0 flex-1 flex-col">

                                    {/* <div className="border-b border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-[#141414]/70 sm:p-6 lg:p-8">
                                        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                                            <CategoryProgress events={filteredEvents} />
                                            <UpcomingMeeting
                                                events={filteredEvents}
                                                onSelect={openEditDialog}
                                            />
                                        </div>
                                    </div> */}

                                    {/* Calendar Header */}

                                    <div className="bg-white dark:bg-[#141414]">

                                        <CalendarHeader
                                            selectedDate={selectedDate}
                                            onDateChange={setSelectedDate}
                                            activeView={activeView}
                                            onViewChange={setActiveView}
                                        />

                                    </div>

                                    {/* Calendar */}

                                    <div className="flex-1 overflow-auto bg-[#F8F8F8] dark:bg-[#1A1A1A]">

                                        <CalendarBoard
                                            events={filteredEvents}
                                            selectedDate={selectedDate}
                                            onEventClick={openEditDialog}
                                            onCreateEvent={openCreateDialog}
                                            activeView={activeView}
                                        />

                                    </div>

                                </div>



                            </div>

                        </div>

                    </div>

                </div>

            </motion.div>
            <EventDialog
                open={dialogOpen}
                event={selectedEvent}
                selectedDate={selectedDate}
                onClose={closeDialog}
                onSave={saveEvent}
                onDelete={removeEvent}
            />
        </>
    );
};

export default Agenda;