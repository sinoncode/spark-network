const fs = require('fs');
const path = require('path');

const directories = [
    '/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/pages',
    '/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/components'
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Check for classes like text-slate-XYZ without dark: counterpart
            const matches = content.match(/(?<!dark:)text-slate-\d{3}/g) || [];
            const bgMatches = content.match(/(?<!dark:)bg-slate-\d{3}/g) || [];
            
            if (matches.length > 0 || bgMatches.length > 0) {
                console.log(`File: ${file}`);
                if (matches.length > 0) console.log(`  Unmatched text classes: ${[...new Set(matches)].join(', ')}`);
                if (bgMatches.length > 0) console.log(`  Unmatched bg classes: ${[...new Set(bgMatches)].join(', ')}`);
            }
        }
    }
}

for (const dir of directories) {
    processDirectory(dir);
}
