const {
  activeBaseUrl,
  acelabEditableCredentials,
  acelabRegressionCredentials,
  acelabUnverifiedCredentials,
  acelabAdminRepCredentials,
  acelabMfgRepCredentials,
  acelabAdminCredentials
} = require('./config')

async function setAcelabCredentials(loginType) {
  let email, password; // Use let here
  switch (loginType) {
    case 'editable':
      email = acelabEditableCredentials.email;
      password = acelabEditableCredentials.password;
      break;
    case 'regression':
      email = acelabRegressionCredentials.email;
      password = acelabRegressionCredentials.password;
      break;
    case 'unverified':
      email = acelabUnverifiedCredentials.email;
      password = acelabUnverifiedCredentials.password;
      break;
    case 'adminRep':
      email = acelabAdminRepCredentials.email;
      password = acelabAdminRepCredentials.password;
      break;
    case 'mfgRep':
      email = acelabMfgRepCredentials.email;
      password = acelabMfgRepCredentials.password;
      break;
    case 'admin':
    default:
      email = acelabAdminCredentials.email;
      password = acelabAdminCredentials.password;
      break;
  }
  return { email, password }; // Return the credentials
}


async function loginToAcelab(page, loginType) {
  const { email, password } = await setAcelabCredentials(loginType); // Get the credentials

  await page.goto(`${activeBaseUrl}`, { waitUntil: 'networkidle0'})
  await page.waitForTimeout(5000);

  await Promise.all([
    page.click(`button[id='desktop-login-button']`),
  ])
  await page.waitForTimeout(4000);
  await page.type(`input[id='signin-email']`, email)
  await page.waitForTimeout(500);

  await page.type(`input[id='signin-pass']`, password)
  await page.waitForTimeout(500);
  await Promise.all([
    page.click(`button[type='submit']`),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ])
  await page.waitForTimeout(1000);

}



async function performLogins(page,loginType) {
  await loginToAcelab(page,loginType)
}




module.exports = { performLogins }
