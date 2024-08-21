const fs = require('fs');
const path = require('path');

// Path to the report directory and index.html
const reportDir = path.join(__dirname, 'html-report');
const indexPath = path.join(reportDir, 'index.html');

// Read the contents of the html-report directory and filter out directories
const reportFolders = fs.readdirSync(reportDir)
  .filter(folder => fs.statSync(path.join(reportDir, folder)).isDirectory())
  .map(folder => ({
    name: folder,
    time: fs.statSync(path.join(reportDir, folder)).ctime
  }))
  .sort((a, b) => b.time - a.time)  // Sort folders by creation time, latest first
  .map(folder => folder.name);

// Generate HTML content
const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Report Index</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      h1 {
        color: #333;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        margin-bottom: 10px;
      }
      li a {
        display: block;
        padding: 10px;
        background-color: #f4f4f4;
        border: 1px solid #ccc;
        text-decoration: none;
        color: #333;
      }
      li a:hover {
        background-color: #eaeaea;
      }
      .dropdown {
        margin-bottom: 20px;
      }
      select {
        padding: 10px;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <h1>Test Report Index</h1>
    <div class="dropdown">
      <label for="dates">Select a date:</label>
      <select id="dates" onchange="filterReports()">
									   
        ${reportFolders.map(folder => `<option value="${folder}">${folder}</option>`).join('')}
					
      </select>
    </div>
    <ul id="reportList">
      ${reportFolders.map(folder => `
        <li class="report-folder" data-date="${folder}">
          <a href="./${folder}/reports.html">${folder}</a>
        </li>`).join('')}
    </ul>

    <script>
      function filterReports() {
        const selectedDate = document.getElementById('dates').value;
        const reportList = document.querySelectorAll('.report-folder');
        reportList.forEach(report => {
          const reportDate = report.getAttribute('data-date');
          report.style.display = reportDate === selectedDate ? 'block' : 'none';
										   
				  
										  
		   
        });
      }
    </script>
  </body>
  </html>
`;

// Write the HTML content to index.html
fs.writeFileSync(indexPath, htmlContent);

console.log(`Index file generated at: ${indexPath}`);
