const fs = require('fs');
const path = require('path');

const directories = [
    '/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/pages',
    '/home/sumit-pal/Desktop/2morrow-admin/src/modules/agenda/components'
];

const replacements = [
    { from: /(?<!dark:)bg-\[\#ECECEC\]/g, to: 'bg-[#ECECEC] dark:bg-[#0A0A0A]' },
    { from: /(?<!dark:)bg-white/g, to: 'bg-white dark:bg-[#141414]' },
    { from: /(?<!dark:)bg-\[\#F7F7F7\]/g, to: 'bg-[#F7F7F7] dark:bg-[#1A1A1A]' },
    { from: /(?<!dark:)bg-\[\#F8F8F8\]/g, to: 'bg-[#F8F8F8] dark:bg-[#1A1A1A]' },
    { from: /(?<!dark:)border-slate-200/g, to: 'border-slate-200 dark:border-slate-800' },
    { from: /(?<!dark:)border-slate-100/g, to: 'border-slate-100 dark:border-slate-800/50' },
    { from: /(?<!dark:)text-slate-900/g, to: 'text-slate-900 dark:text-white' },
    { from: /(?<!dark:)text-slate-800/g, to: 'text-slate-800 dark:text-slate-100' },
    { from: /(?<!dark:)text-slate-700/g, to: 'text-slate-700 dark:text-slate-200' },
    { from: /(?<!dark:)text-slate-600/g, to: 'text-slate-600 dark:text-slate-300' },
    { from: /(?<!dark:)text-slate-500/g, to: 'text-slate-500 dark:text-slate-400' },
    { from: /(?<!dark:)text-slate-400/g, to: 'text-slate-400 dark:text-slate-500' },
    { from: /(?<!dark:)bg-slate-50/g, to: 'bg-slate-50 dark:bg-[#1A1A1A]' },
    { from: /(?<!dark:)bg-slate-100/g, to: 'bg-slate-100 dark:bg-slate-800' },
    { from: /(?<!dark:)hover:bg-slate-100/g, to: 'hover:bg-slate-100 dark:hover:bg-slate-800' },
    { from: /(?<!dark:)hover:bg-slate-200/g, to: 'hover:bg-slate-200 dark:hover:bg-slate-700' },
    { from: /(?<!dark:)bg-transparent/g, to: 'bg-transparent dark:bg-transparent' }, // Ignore this
    { from: /(?<!dark:)border-slate-300/g, to: 'border-slate-300 dark:border-slate-700' },
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = content;
            for (const { from, to } of replacements) {
                modified = modified.replace(from, to);
            }
            if (modified !== content) {
                fs.writeFileSync(fullPath, modified);
                console.log(`Updated ${file}`);
            }
        }
    }
}

for (const dir of directories) {
    processDirectory(dir);
}
console.log('Done.');
