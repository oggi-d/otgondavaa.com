import {
  ContactsApi,
  CreateContact,
  TransactionalEmailsApi,
  SendSmtpEmail,
} from "@getbrevo/brevo";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_FROM_EMAIL = process.env.BREVO_FROM_EMAIL;

function getContactsApi(): ContactsApi {
  const api = new ContactsApi();
  if (BREVO_API_KEY) {
    // @ts-expect-error - authentications is protected but this is the official way to set API key
    api.authentications.apiKey.apiKey = BREVO_API_KEY;
  }
  return api;
}

function getTransactionalEmailsApi(): TransactionalEmailsApi {
  const api = new TransactionalEmailsApi();
  if (BREVO_API_KEY) {
    // @ts-expect-error - authentications is protected but this is the official way to set API key
    api.authentications.apiKey.apiKey = BREVO_API_KEY;
  }
  return api;
}

export async function addContact(
  email: string,
  attributes?: Record<string, string>,
) {
  if (!BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not configured");
  }

  const createContact = new CreateContact();
  createContact.email = email;
  createContact.attributes = attributes || {};
  createContact.updateEnabled = true;

  try {
    const contactsApi = getContactsApi();
    const response = await contactsApi.createContact(createContact);
    return response;
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { body?: { message?: string } } })?.response?.body
        ?.message ||
      (error as { message?: string })?.message ||
      "Unknown error";
    throw new Error(`Brevo API error: ${errorMessage}`);
  }
}

export async function sendTransactionalEmail({
  to,
  replyTo,
  subject,
  html,
}: {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
}) {
  if (!BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not configured");
  }

  if (!BREVO_FROM_EMAIL) {
    throw new Error("BREVO_FROM_EMAIL is not configured");
  }

  const sendSmtpEmail = new SendSmtpEmail();
  sendSmtpEmail.sender = {
    email: BREVO_FROM_EMAIL,
    name: "Otgondavaa",
  };
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.replyTo = { email: replyTo };
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;

  try {
    const transactionalEmailsApi = getTransactionalEmailsApi();
    const response =
      await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    return response;
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { body?: { message?: string } } })?.response?.body
        ?.message ||
      (error as { message?: string })?.message ||
      "Unknown error";
    throw new Error(`Brevo API error: ${errorMessage}`);
  }
}
