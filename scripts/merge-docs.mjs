import fs from 'fs';
import path from 'path';

const DOCS_DIR = 'docs';
const INDEX_FILE = 'index.md';
const OUTPUT_FILE = 'FULL_DOCUMENTATION.md';

async function mergeDocs() {
  console.log('Merging documentation files...');

  const indexPath = path.join(DOCS_DIR, INDEX_FILE);
  if (!fs.existsSync(indexPath)) {
    console.error('Error: docs/index.md not found.');
    process.exit(1);
  }

  const indexContent = fs.readFileSync(indexPath, 'utf-8');
  
  // Extract all markdown links from index.md
  const linkRegex = /\[([^\]]+)\]\(([^)]+\.md)\)/g;
  let match;
  const filesToMerge = [];

  while ((match = linkRegex.exec(indexContent)) !== null) {
    const fileName = match[2];
    if (fileName !== INDEX_FILE) {
      filesToMerge.push(fileName);
    }
  }

  if (filesToMerge.length === 0) {
    console.warn('No documentation files found to merge in index.md.');
    return;
  }

  let finalContent = `# Full Documentation\n\n*Generated on ${new Date().toLocaleString()}*\n\n---\n\n`;

  // Add the index content first (optional, but good for context)
  finalContent += indexContent + '\n\n---\n\n';

  for (const file of filesToMerge) {
    const filePath = path.join(DOCS_DIR, file);
    if (fs.existsSync(filePath)) {
      console.log(`- Adding ${file}`);
      const content = fs.readFileSync(filePath, 'utf-8');
      finalContent += content + '\n\n---\n\n';
    } else {
      console.warn(`- Warning: ${file} not found, skipping.`);
    }
  }

  fs.writeFileSync(path.join(DOCS_DIR, OUTPUT_FILE), finalContent);
  console.log(`\nSuccess! Documentation merged into ${path.join(DOCS_DIR, OUTPUT_FILE)}`);
}

mergeDocs();
