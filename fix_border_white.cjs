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
            // replace border-white with border-white dark:border-[#141414] 
            // only if not followed by /40 or already having dark:border
            content = content.replace(/border-white(?!\/)(?!\s*dark:border-)/g, 'border-white dark:border-[#141414]');
            fs.writeFileSync(fullPath, content);
        }
    }
}

for (const dir of directories) {
    processDirectory(dir);
}
console.log('Fixed border-white');
