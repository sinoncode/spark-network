const fs = require('fs');

const replacements = {
    '/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/components/CalendarBoard.tsx': [
        { from: /bg-slate-200/g, to: 'bg-slate-200 dark:bg-slate-700' }
    ],
    '/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/components/CalendarEventCard.tsx': [
        { from: /bg-slate-200/g, to: 'bg-slate-200 dark:bg-slate-700' }
    ],
    '/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/components/CategoryProgress.tsx': [
        { from: /bg-slate-200/g, to: 'bg-slate-200 dark:bg-slate-700' }
    ],
    '/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/components/UpcomingMeeting.tsx': [
        { from: /text-slate-300/g, to: 'text-slate-300 dark:text-slate-600' },
        { from: /bg-slate-300/g, to: 'bg-slate-300 dark:bg-slate-600' }
    ]
};

for (const [file, reps] of Object.entries(replacements)) {
    let content = fs.readFileSync(file, 'utf8');
    for (const { from, to } of reps) {
        content = content.replace(from, (match) => {
            // Avoid double replace if we run it twice
            if (!match.includes('dark:')) return to;
            return match;
        });
    }
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
}
