import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Feedback.module.css';
import Link from 'next/link';

const FeedbackPage = () => {
  const [formType, setFormType] = useState('feedback'); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: '',
    priority: 'medium',
    browser: '',
    device: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const feedbackCategories = [
    'General Feedback',
    'Feature Request',
    'Improvement Suggestion',
    'User Experience',
    'Content Accuracy',
    'Prayer Times',
    'Zakat Calculator',
    'Other'
  ];

  const bugCategories = [
    'Calculator Error',
    'Prayer Times Issue',
    'Display/UI Problem',
    'Navigation Issue',
    'Mobile Responsiveness',
    'Performance Issue',
    'Other Technical Issue'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Since this is static, we'll show the data in console and display success message
    // In production, you would send this to an email service or external form service
    
    const submissionData = {
      type: formType,
      timestamp: new Date().toISOString(),
      ...formData
    };
    
    console.log('Form Submission:', submissionData);
    
    // You can integrate with services like:
    // - Formspree.io
    // - EmailJS
    // - Netlify Forms
    // - Google Forms
    
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        category: '',
        subject: '',
        message: '',
        priority: 'medium',
        browser: '',
        device: ''
      });
    }, 3000);
  };

  const copyToClipboard = () => {
    const text = `
=== ${formType === 'feedback' ? 'FEEDBACK' : 'BUG REPORT'} ===
From: ${formData.name}
Email: ${formData.email}
Category: ${formData.category}
${formType === 'bug' ? `Priority: ${formData.priority}` : ''}
Subject: ${formData.subject}

Message:
${formData.message}

${formType === 'bug' ? `Browser: ${formData.browser}
Device: ${formData.device}` : ''}

Submitted: ${new Date().toLocaleString()}
    `.trim();
    
    navigator.clipboard.writeText(text);
    alert('Form data copied to clipboard! You can email this to support.');
  };

  return (
    <>
      <Head>
        <title>Feedback & Bug Report - Mercy Oceans</title>
        <meta name="description" content="Share your feedback or report bugs to help us improve" />
      </Head>

      <div className={styles.container}>
        <div className={styles.feedbackCard}>
          
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>We Value Your Input</h1>
            <p className={styles.subtitle}>
              Help us improve by sharing your feedback or reporting issues
            </p>
          </div>

          {/* Type Selector */}
          <div className={styles.typeSelector}>
            <button
              className={`${styles.typeButton} ${formType === 'feedback' ? styles.activeType : ''}`}
              onClick={() => setFormType('feedback')}
            >
              <span className={styles.typeIcon}>💬</span>
              <div>
                <div className={styles.typeTitle}>Feedback</div>
                <div className={styles.typeDesc}>Share suggestions or comments</div>
              </div>
            </button>
            
            <button
              className={`${styles.typeButton} ${formType === 'bug' ? styles.activeType : ''}`}
              onClick={() => setFormType('bug')}
            >
              <span className={styles.typeIcon}>🐛</span>
              <div>
                <div className={styles.typeTitle}>Bug Report</div>
                <div className={styles.typeDesc}>Report technical issues</div>
              </div>
            </button>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className={styles.successMessage}>
              <span className={styles.successIcon}>✓</span>
              <div>
                <div className={styles.successTitle}>Thank you!</div>
                <div className={styles.successText}>
                  Your {formType === 'feedback' ? 'feedback' : 'bug report'} has been received. 
                  We appreciate your help in making our platform better.
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            
            {/* Personal Information */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>👤</span>
                Your Information
              </h3>
              
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Category & Details */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>
                  {formType === 'feedback' ? '📝' : '🔍'}
                </span>
                {formType === 'feedback' ? 'Feedback Details' : 'Bug Details'}
              </h3>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Category <span className={styles.required}>*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="">Select a category</option>
                  {(formType === 'feedback' ? feedbackCategories : bugCategories).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {formType === 'bug' && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Priority <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.priorityOptions}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="priority"
                        value="low"
                        checked={formData.priority === 'low'}
                        onChange={handleChange}
                      />
                      <span className={`${styles.priorityBadge} ${styles.lowPriority}`}>
                        Low
                      </span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="priority"
                        value="medium"
                        checked={formData.priority === 'medium'}
                        onChange={handleChange}
                      />
                      <span className={`${styles.priorityBadge} ${styles.mediumPriority}`}>
                        Medium
                      </span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="priority"
                        value="high"
                        checked={formData.priority === 'high'}
                        onChange={handleChange}
                      />
                      <span className={`${styles.priorityBadge} ${styles.highPriority}`}>
                        High
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Subject <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder={formType === 'feedback' ? 
                    'Brief description of your feedback' : 
                    'Brief description of the issue'
                  }
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  {formType === 'feedback' ? 'Your Feedback' : 'Describe the Issue'} 
                  <span className={styles.required}>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  rows="6"
                  placeholder={formType === 'feedback' ? 
                    'Tell us what you think, what could be improved, or what features you\'d like to see...' : 
                    'Please provide detailed steps to reproduce the bug, what you expected to happen, and what actually happened...'
                  }
                  required
                />
                <div className={styles.charCount}>
                  {formData.message.length} characters
                </div>
              </div>
            </div>

            {/* Technical Details (Bug Reports Only) */}
            {formType === 'bug' && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.sectionIcon}>💻</span>
                  Technical Information
                </h3>

                <div className={styles.infoBox}>
                  <strong>Tip:</strong> This helps us identify and fix the issue faster
                </div>

                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Browser</label>
                    <input
                      type="text"
                      name="browser"
                      value={formData.browser}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="e.g., Chrome 120, Safari 17, Firefox 121"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Device</label>
                    <input
                      type="text"
                      name="device"
                      value={formData.device}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="e.g., iPhone 14, Windows PC, Android Tablet"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className={styles.submitSection}>
              <button type="submit" className={styles.submitButton}>
                <span className={styles.submitIcon}>
                  {formType === 'feedback' ? '📤' : '🚀'}
                </span>
                Submit {formType === 'feedback' ? 'Feedback' : 'Bug Report'}
              </button>

              <button 
                type="button" 
                onClick={copyToClipboard}
                className={styles.copyButton}
              >
                📋 Copy to Clipboard
              </button>
            </div>

            <div className={styles.privacyNote}>
              <span className={styles.lockIcon}>🔒</span>
              Your information is kept private and will only be used to address your submission.
            </div>
          </form>

          {/* Additional Help */}
          <div className={styles.helpSection}>
            <h3 className={styles.helpTitle}>Need Immediate Help?</h3>
            <div className={styles.helpGrid}>
              <div className={styles.helpCard}>
                <span className={styles.helpIcon}>📚</span>
                <div className={styles.helpContent}>
                  <div className={styles.helpCardTitle}>Documentation</div>
                  <p className={styles.helpText}>Check our guides and FAQs</p>
                  <Link href="/faq" className={styles.helpLink}>View FAQ →</Link>
                </div>
              </div>
              
              <div className={styles.helpCard}>
                <span className={styles.helpIcon}>💬</span>
                <div className={styles.helpContent}>
                  <div className={styles.helpCardTitle}>Community</div>
                  <p className={styles.helpText}>Connect with other users</p>
                  <Link href="/about" className={styles.helpLink}>Learn More →</Link>
                </div>
              </div>
              
              <div className={styles.helpCard}>
                <span className={styles.helpIcon}>📧</span>
                <div className={styles.helpContent}>
                  <div className={styles.helpCardTitle}>Direct Contact</div>
                  <p className={styles.helpText}>Reach out to our team</p>
                  <Link href="mailto:support@example.com" className={styles.helpLink}>Email Us →</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default FeedbackPage;