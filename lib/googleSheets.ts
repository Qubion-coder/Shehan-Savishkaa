export type GoogleSheetFormType = 'rsvp' | 'wish';

interface SubmitPayload {
  formType: GoogleSheetFormType;
  name: string;
  attending?: string;
  message?: string;
}

// Apps Script web app for Shehan & Savishkaa's RSVP / wish sheet (see code.gs)
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxF-zBq67UMxPh2pAKrZ8Mj3jLRfcKTQhlL2iJZo88yzr2h3GjZEt9kSCxTYDC95FcK/exec';

export async function submitToGoogleSheets(payload: SubmitPayload): Promise<void> {
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      source: 'wedding-site',
    }),
  });
}
