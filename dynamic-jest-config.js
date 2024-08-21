const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load the base Jest configuration
const baseConfigPath = path.join(__dirname, 'jest.config.base.json');
const jestConfig = require(baseConfigPath);

// Function to extract 'it' blocks from a file
const extractItBlocks = (fileContent) => {
  const itRegex = /it\s*\(\s*['"`](.*?)['"`]/g;
  const itBlocks = [];
  let match;
  while ((match = itRegex.exec(fileContent)) !== null) {
    itBlocks.push(match[1]);
  }
  return itBlocks;
};

// Load the previous state of test files
const previousStatePath = path.join(__dirname, 'test_state.json');
let previousState = {};
if (fs.existsSync(previousStatePath)) {
  previousState = JSON.parse(fs.readFileSync(previousStatePath, 'utf-8'));
}

// Get the current state of test files
const testFilesDir = path.join(__dirname, 'tests'); // Adjust this path to your test files directory
const testFiles = fs.readdirSync(testFilesDir).filter(file => file.endsWith('.test.js'));
const currentState = {};

testFiles.forEach(file => {
  const filePath = path.join(testFilesDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  currentState[file] = extractItBlocks(fileContent);
});

// Identify newly added 'it' blocks
const newItBlocks = {};
Object.keys(currentState).forEach(file => {
  if (!previousState[file]) {
    newItBlocks[file] = currentState[file];
  } else {
    newItBlocks[file] = currentState[file].filter(itBlock => !previousState[file].includes(itBlock));
  }
});

// Get the current date and time
const date = new Date();
const formattedDate = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
const formattedTime = `${String(date.getUTCHours()).padStart(2, '0')}-${String(date.getUTCMinutes()).padStart(2, '0')}-${String(date.getUTCSeconds()).padStart(2, '0')}`;
const runFolder = `run-${formattedDate}-${formattedTime}`;


// Generate custom HTML for new `it` blocks
const newItBlocksHtml = Object.entries(newItBlocks).map(([file, itBlocks]) => {
  if (itBlocks.length === 0) return '';
  return `<h3>${file}</h3><ul>` + itBlocks.map(itBlock => {
    return `<li class="new-it-block">${itBlock}</li>`;
  }).join('') + '</ul>';
}).join('');

// Define a style for the new `it` blocks
const style = `
  <style>
    .new-it-block {
      color: green;
      font-weight: bold;
    }
    .new-it-block a {
      color: green;
      text-decoration: none;
    }
    .new-it-block a:hover {
      text-decoration: underline;
    }
  </style>
`;


// Update the jest-html-reporters configuration to include a unique folder path
jestConfig.reporters = [
  "default",
  ["jest-html-reporters", {
    "publicPath": `./html-report/${runFolder}`,
    //"publicPath": `./html-report`,
    "filename": "reports.html",
    "expand": true,
    "customInfos": [
      //{ title: 'New Tests Added:', value: ' 20' },
      // { title: 'Updated Testcases:', value: '<a href="#should-verify-highways-map-is-loaded"> 3</a>' },
     // { title: 'New Tests Added:', value: '<a href="#should-verify-the-presence-of-foreclosure-template-button"> 8</a>' }
     // { title: 'Newly Created it Blocks:', value: `${style}<div>${newItBlocksHtml}</div>` }
    ],
  }]
];

// Write the updated configuration to a temporary file
const tempConfigPath = path.join(__dirname, 'jest.temp.config.json');
fs.writeFileSync(tempConfigPath, JSON.stringify(jestConfig, null, 2));

// Get the test pattern from the command-line arguments
const testPattern = process.argv[2];

// Construct the Jest command with the updated configuration
const jestCommand = `jest --config ${tempConfigPath}` + (testPattern ? ` ${testPattern}` : '');

// Run Jest with the updated configuration
execSync(jestCommand, { stdio: 'inherit' });

// Clean up the temporary configuration file
fs.unlinkSync(tempConfigPath);

// Save the current state of test files for future runs
fs.writeFileSync(previousStatePath, JSON.stringify(currentState, null, 2));
