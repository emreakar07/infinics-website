import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
export const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  } else {
    console.error('EmailJS public key is not configured');
  }
};

// Send email function
export const sendContactForm = async (formData: {
  name: string;
  email: string;
  problems: string;
  timeline: string;
}) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!serviceId || !templateId) {
    throw new Error('EmailJS configuration is incomplete');
  }

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    timeline: formData.timeline || 'Not specified',
    message: formData.problems,
    to_email: import.meta.env.VITE_CONTACT_EMAIL || 'contact@infinics.ai',
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams);
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}; 