import { readdirSync, statSync } from "fs";
import { join } from "path";

// Function to recursively scan the directory tree and print it
function printFolderTree(dirPath, indent = "") {
  const files = readdirSync(dirPath);

  files.forEach((file, index) => {
    const filePath = join(dirPath, file);
    const isLast = index === files.length - 1;
    const isDir = statSync(filePath).isDirectory();
    const connector = isLast ? "└──" : "├──";

    console.log(`${indent}${connector} ${file}`);

    if (isDir) {
      const newIndent = isLast ? `${indent}    ` : `${indent}│   `;
      printFolderTree(filePath, newIndent);
    }
  });
}

// Start the tree printing from the current directory or a specified directory
const startPath = process.argv[2] || ".";
console.log(startPath);
printFolderTree(startPath);
