/**
 * Hosted form delivery via Web3Forms (HTTPS POST from the browser).
 * Works on static hosts (Netlify, GoDaddy, S3, etc.) without a custom backend.
 *
 * Create a free access key at https://web3forms.com using sales@forezcorp.com
 * as the notification inbox, then set VITE_WEB3FORMS_ACCESS_KEY in your host
 * build environment (e.g. Netlify UI → Environment variables).
 *
 * If the key is unset, pages should fall back to mailto:SUBMISSION_EMAIL.
 */

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

export function hasHostedFormDelivery(): boolean {
  return Boolean(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim());
}

export async function submitViaWeb3Forms(params: {
  subject: string;
  name: string;
  replyEmail: string;
  message: string;
}): Promise<{ success: boolean; errorMessage?: string }> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return { success: false, errorMessage: 'NO_KEY' };
  }

  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: params.subject,
        name: params.name,
        email: params.replyEmail,
        message: params.message,
      }),
    });

    const data = (await res.json()) as { success?: boolean; message?: string };
    if (data.success) {
      return { success: true };
    }
    return {
      success: false,
      errorMessage: typeof data.message === 'string' ? data.message : 'Submission failed.',
    };
  } catch {
    return { success: false, errorMessage: 'Network error.' };
  }
}
