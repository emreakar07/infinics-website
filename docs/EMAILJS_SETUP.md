# EmailJS Setup Guide for Infinics Contact Form

This guide will help you set up EmailJS to receive contact form submissions from your Infinics website.

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com)
2. Click "Sign Up Free" and create an account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, click on "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection instructions for your provider
5. Name your service (e.g., "Infinics Contact")
6. Click "Create Service" and save the **Service ID**

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Set up your template:
   - **Template Name**: "Infinics Contact Form"
   - **Subject**: `New Contact Form Submission - {{from_name}}`
   - **From Name**: `{{from_name}}`
   - **From Email**: `{{from_email}}`
   - **Reply To**: `{{from_email}}`
   - **To Email**: Your email address
4. For the content, use the template in `docs/emailjs-template.html`
5. Save the template and note the **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" in your dashboard
2. Find your **Public Key** under the API keys section

## Step 5: Configure Your Project

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your EmailJS credentials:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_CONTACT_EMAIL=your-email@example.com
```

## Step 6: Deploy to Vercel

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add all the EmailJS variables from your `.env` file
4. Redeploy your project

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your email for the submission
4. Check EmailJS dashboard for email history

## Troubleshooting

### Form submission fails
- Check browser console for errors
- Verify all environment variables are set correctly
- Check EmailJS dashboard for failed attempts

### Not receiving emails
- Check spam folder
- Verify email service is connected properly
- Check EmailJS email history
- Ensure daily quota hasn't been exceeded (200 emails/month on free plan)

### Email formatting issues
- Review the email template in EmailJS
- Ensure all variable names match exactly: `{{from_name}}`, `{{from_email}}`, `{{timeline}}`, `{{message}}`

## Alternative Solutions

If you prefer other methods to store form submissions:

1. **Google Sheets**: Use Google Sheets API to store submissions
2. **Supabase/Firebase**: Use a database for more complex needs
3. **Webhook**: Send to your own API endpoint
4. **Formspree**: Alternative form handling service

For help with implementing these alternatives, please refer to their respective documentation. 