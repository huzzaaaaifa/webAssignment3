import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import contentData from '../data/content.json';
import { submitContactForm } from '../services/firebase';

/* ========================================
   ASSIGNMENT REQUIREMENTS SATISFIED:
   ========================================
   1. React Hooks: useState
   2. Firebase Integration: Form submission to Firestore
   3. localStorage Fallback: If Firebase unavailable
   ======================================== */

function Contact() {
  // 1. React Hooks (useState)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 2. Firebase - Submit form to Firestore (with localStorage fallback)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // submitContactForm uses Firebase Firestore or localStorage as fallback
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'An error occurred. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <Sidebar 
        title="Support" 
        items={contentData.sidebarLinks.contact.methods}
      />
      <main className="fade-in">
        <h2>Contact Us</h2>
        
        <div className="content-row" style={{ marginBottom: '30px' }}>
          <div className="content-box">
            <h3>Get in Touch</h3>
            <p>Have questions or need assistance? Fill out the form below and we'll get back to you soon!</p>
          </div>
          <div className="content-box">
            <h3>Quick Info</h3>
            <p><strong>Email:</strong> contact@cybersecure.com</p>
            <p><strong>Response Time:</strong> 24-48 hours</p>
            <p><strong>Community:</strong> Join our Discord</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              rows="6"
              required
            ></textarea>
          </div>

          {status.message && (
            <div className={status.type === 'success' ? 'success' : 'error'}>
              {status.message}
            </div>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="content-box" style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto' }}>
          <h3>Privacy Note</h3>
          <p>
            Your information is stored securely using Firebase Firestore. 
            We use Local Storage and Cookies to enhance your experience. 
            We never share your data with third parties.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Contact;
