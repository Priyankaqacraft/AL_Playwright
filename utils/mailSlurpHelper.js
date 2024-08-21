import { MailSlurp } from 'mailslurp-client';

const apiKey = 'f3bc038fecd59e85f36c3a1fbcea66d80ec32b2927c11334e4046a14f2f3749d';//'3df57f36e139a7a269cbf7afcaabc6682c570092d6ee8e1f6507c223a07f9df7';
const mailslurp = new MailSlurp({ apiKey });

export async function createTestEmail() {
  const inbox = await mailslurp.createInbox();
  return inbox;
}

export async function fetchEmail(inboxId) {
  // Wait for the email to arrive
  const email = await mailslurp.waitForLatestEmail(inboxId, 30000); // wait up to 30 seconds
  return email;
}

// Regular expression to match the <a> tag with the specified text
const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*?>Complete Sign Up Process<\/a>/i;

export function extractSignUpLink(emailBody) {
  const linkMatch = emailBody.match(linkRegex);

  if (linkMatch) {
    return linkMatch[1];
  } else {
    return null;
  }
}
