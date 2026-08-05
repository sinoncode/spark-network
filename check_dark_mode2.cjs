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
            
            // Extract all className strings
            const classNames = [...content.matchAll(/className=["']([^"']+)["']/g)].map(m => m[1]);
            const missing = [];
            
            for (const cn of classNames) {
                const classes = cn.split(/\s+/);
                for (const cls of classes) {
                    if ((cls.startsWith('text-slate-') || cls.startsWith('bg-slate-') || cls === 'bg-white' || cls.startsWith('border-slate-')) && !cls.startsWith('dark:')) {
                        // Check if there's any dark:text- or dark:bg- or dark:border- in the same className string
                        let hasDarkCounterpart = false;
                        if (cls.startsWith('text-')) {
                            hasDarkCounterpart = classes.some(c => c.startsWith('dark:text-'));
                        } else if (cls.startsWith('bg-')) {
                            hasDarkCounterpart = classes.some(c => c.startsWith('dark:bg-'));
                        } else if (cls.startsWith('border-')) {
                            hasDarkCounterpart = classes.some(c => c.startsWith('dark:border-'));
                        }
                        
                        if (!hasDarkCounterpart) {
                            missing.push(cls);
                        }
                    }
                }
            }
            if (missing.length > 0) {
                console.log(`File: ${file}`);
                console.log(`  Missing dark counterparts for: ${[...new Set(missing)].join(', ')}`);
            }
        }
    }
}

for (const dir of directories) {
    processDirectory(dir);
}
