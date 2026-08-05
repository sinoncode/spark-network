const fs = require('fs');

// 1. Update Agenda.tsx
let agendaPath = '/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/pages/Agenda.tsx';
let agendaContent = fs.readFileSync(agendaPath, 'utf8');

if (!agendaContent.includes('const [activeView, setActiveView] =')) {
    agendaContent = agendaContent.replace(
        'const [selectedDate, setSelectedDate] =\n        useState(new Date(2026, 0, 12));',
        'const [selectedDate, setSelectedDate] =\n        useState(new Date(2026, 0, 12));\n\n    const [activeView, setActiveView] =\n        useState("Month");'
    );

    agendaContent = agendaContent.replace(
        /<CalendarHeader\s+selectedDate={selectedDate}\s+onDateChange={setSelectedDate}\s*\/>/g,
        `<CalendarHeader
                                            selectedDate={selectedDate}
                                            onDateChange={setSelectedDate}
                                            activeView={activeView}
                                            onViewChange={setActiveView}
                                        />`
    );

    agendaContent = agendaContent.replace(
        /<CalendarBoard\s+events={filteredEvents}\s+selectedDate={selectedDate}\s+onEventClick={openEditDialog}\s+onCreateEvent={openCreateDialog}\s*\/>/g,
        `<CalendarBoard
                                            events={filteredEvents}
                                            selectedDate={selectedDate}
                                            onEventClick={openEditDialog}
                                            onCreateEvent={openCreateDialog}
                                            activeView={activeView}
                                        />`
    );
    fs.writeFileSync(agendaPath, agendaContent);
}

// 2. Update CalendarHeader.tsx
let headerPath = '/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/components/CalendarHeader.tsx';
let headerContent = fs.readFileSync(headerPath, 'utf8');

headerContent = headerContent.replace(
    'interface CalendarHeaderProps {\n    selectedDate: Date;\n    onDateChange: (date: Date) => void;\n}',
    'interface CalendarHeaderProps {\n    selectedDate: Date;\n    onDateChange: (date: Date) => void;\n    activeView: string;\n    onViewChange: (view: string) => void;\n}'
);

headerContent = headerContent.replace(
    'const CalendarHeader = ({\n    selectedDate,\n    onDateChange,\n}: CalendarHeaderProps) => {\n    const [activeView, setActiveView] = useState("Month");',
    'const CalendarHeader = ({\n    selectedDate,\n    onDateChange,\n    activeView,\n    onViewChange,\n}: CalendarHeaderProps) => {'
);

headerContent = headerContent.replace(
    'const previousMonth = () => {\n        const date = new Date(selectedDate);\n        date.setMonth(date.getMonth() - 1);\n        onDateChange(date);\n    };',
    `const previousMonth = () => {
        const date = new Date(selectedDate);
        if (activeView === "Month") {
            date.setMonth(date.getMonth() - 1);
        } else if (activeView === "Week") {
            date.setDate(date.getDate() - 7);
        } else if (activeView === "Day") {
            date.setDate(date.getDate() - 1);
        }
        onDateChange(date);
    };`
);

headerContent = headerContent.replace(
    'const nextMonth = () => {\n        const date = new Date(selectedDate);\n        date.setMonth(date.getMonth() + 1);\n        onDateChange(date);\n    };',
    `const nextMonth = () => {
        const date = new Date(selectedDate);
        if (activeView === "Month") {
            date.setMonth(date.getMonth() + 1);
        } else if (activeView === "Week") {
            date.setDate(date.getDate() + 7);
        } else if (activeView === "Day") {
            date.setDate(date.getDate() + 1);
        }
        onDateChange(date);
    };`
);

headerContent = headerContent.replace(/onClick=\{\(\) => setActiveView\(view\)\}/g, 'onClick={() => onViewChange(view)}');
fs.writeFileSync(headerPath, headerContent);


// 3. Update CalendarBoard.tsx
let boardPath = '/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/components/CalendarBoard.tsx';
let boardContent = fs.readFileSync(boardPath, 'utf8');

if (!boardContent.includes('activeView: string;')) {
    boardContent = boardContent.replace(
        'interface CalendarBoardProps {\n    events: AgendaEvent[];\n    selectedDate: Date;\n    onEventClick: (event: AgendaEvent) => void;\n    onCreateEvent: () => void;\n}',
        'interface CalendarBoardProps {\n    events: AgendaEvent[];\n    selectedDate: Date;\n    onEventClick: (event: AgendaEvent) => void;\n    onCreateEvent: () => void;\n    activeView: string;\n}'
    );

    boardContent = boardContent.replace(
        'const CalendarBoard = ({\n    events,\n    selectedDate,\n    onEventClick,\n    onCreateEvent,\n}: CalendarBoardProps) => {',
        'const CalendarBoard = ({\n    events,\n    selectedDate,\n    onEventClick,\n    onCreateEvent,\n    activeView,\n}: CalendarBoardProps) => {'
    );

    boardContent = boardContent.replace(
        'const monthStart = startOfMonth(selectedDate);\n    const monthEnd = endOfMonth(selectedDate);\n\n    const calendarDays = useMemo(() => {\n        const days: Date[] = [];\n\n        const startDay = new Date(monthStart);\n        startDay.setDate(monthStart.getDate() - monthStart.getDay());\n\n        for (let i = 0; i < 42; i++) {\n            const current = new Date(startDay);\n            current.setDate(startDay.getDate() + i);\n            days.push(current);\n        }\n\n        return days;\n    }, [selectedDate]);',
        `const calendarDays = useMemo(() => {
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
    }, [selectedDate, activeView]);`
    );

    boardContent = boardContent.replace(
        /<div className="mb-4 grid grid-cols-7 gap-4">([\s\S]*?)<\/div>/,
        `<div className={clsx("mb-4 grid gap-4", activeView === "Day" ? "grid-cols-1" : "grid-cols-7")}>
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
            </div>`
    );

    boardContent = boardContent.replace(
        '<div className="grid grid-cols-7 gap-4">',
        '<div className={clsx("grid gap-4", activeView === "Day" ? "grid-cols-1" : "grid-cols-7")}>'
    );
    
    boardContent = boardContent.replace(
        'const isCurrentMonth =\n                        day.getMonth() === selectedDate.getMonth();',
        'const isCurrentMonth =\n                        activeView === "Month" ? day.getMonth() === selectedDate.getMonth() : true;'
    );
    
    fs.writeFileSync(boardPath, boardContent);
}

console.log("Updated Agenda components to handle activeView state.");
