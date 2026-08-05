const fs = require('fs');
const file = '/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/pages/Agenda.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add EventDialog before the final </>
content = content.replace(
    /(\s*)<\/motion\.div>(\s*)<\/>(\s*)\);(\s*)\};/g,
    `$1</motion.div>
            <EventDialog
                open={dialogOpen}
                event={selectedEvent}
                selectedDate={selectedDate}
                onClose={closeDialog}
                onSave={saveEvent}
                onDelete={deleteEvent}
            />
        </>
    );
};`
);

// We need to move the right dashboard to the left.
const dashboardStartTag = '{/* ================= Right Dashboard ================= */}';
const mainContentStartTag = '<div className="flex min-w-0 flex-1 flex-col">';

const dashboardStartIdx = content.indexOf(dashboardStartTag);
if (dashboardStartIdx !== -1) {
    let rightDashboardBlock = content.substring(dashboardStartIdx);
    const endAsideIdx = rightDashboardBlock.indexOf('</aside>') + '</aside>'.length;
    rightDashboardBlock = rightDashboardBlock.substring(0, endAsideIdx);

    // Remove the block from original place
    content = content.replace(rightDashboardBlock, '');

    // Replace Right with Left in comments and border-l with border-r
    let modifiedDashboardBlock = rightDashboardBlock.replace('Right Dashboard', 'Left Dashboard');
    modifiedDashboardBlock = modifiedDashboardBlock.replace('border-l border-slate-200', 'border-r border-slate-200');

    // Insert it before the main content
    const mainContentStartIdx = content.indexOf(mainContentStartTag);
    content = content.substring(0, mainContentStartIdx) + modifiedDashboardBlock + '\n\n                                ' + content.substring(mainContentStartIdx);
}

fs.writeFileSync(file, content);
console.log('Done!');
