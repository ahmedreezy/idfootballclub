// EmailJS Configuration
// -----------------------------------------------
// 1. Go to https://www.emailjs.com and create a FREE account
// 2. Add an Email Service (Outlook, Gmail, or custom SMTP) and note the Service ID
// 3. Create two Email Templates (one for registration, one for contact)
//    - Use {{to_email}} in the template "To Email" field
//    - Use {{reply_to}} in the template "Reply To" field
//    - Template variables are passed from the form data
// 4. Get your Public Key from Account > API Keys
// 5. Replace the placeholder values below with your real IDs
// -----------------------------------------------

export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY',         // from Account > API Keys
  SERVICE_ID: 'YOUR_SERVICE_ID',                  // e.g. 'service_xxxxxxx'
  REGISTRATION_TEMPLATE_ID: 'YOUR_REG_TEMPLATE', // e.g. 'template_xxxxxxx'
  CONTACT_TEMPLATE_ID: 'YOUR_CONTACT_TEMPLATE',  // e.g. 'template_xxxxxxx'
  TO_EMAIL: 'admin@idallstarsfc.com',
}
