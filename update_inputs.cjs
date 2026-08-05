const fs = require('fs');

function updateFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    // For Agenda.tsx input
    content = content.replace(/className="h-12 w-\[300px\].*?"/g, (match) => {
        if (!match.includes('dark:text-white')) {
            return match.slice(0, -1) + ' dark:text-white dark:bg-[#1A1A1A]"';
        }
        return match;
    });

    // For EventDialog.tsx inputs and textareas
    content = content.replace(/className="w-full rounded-2xl.*?"/g, (match) => {
        if (!match.includes('dark:text-white')) {
            return match.slice(0, -1) + ' dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"';
        }
        return match;
    });
    
    fs.writeFileSync(file, content);
}

updateFile('/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/pages/Agenda.tsx');
updateFile('/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/components/EventDialog.tsx');
console.log('Updated inputs');
