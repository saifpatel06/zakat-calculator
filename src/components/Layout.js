import Header from './Header';
import styles from '../../styles/Layout.module.css';
import Image from 'next/image';

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      <Header />
      <main className={styles.mainContent}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <Image 
              src="/website-logo.png" 
              alt="Zakat Calculator Logo" 
              width={100}
              height={100} 
              className={styles.footerLogo} 
            />
            <p className={styles.footerText}>
              Calculate your Zakat accurately according to Islamic principles.
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><a href="/">Home</a></li>
              <li><a href="/calculator">Calculator</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/articles">Articles</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Resources</h4>
            <ul className={styles.footerLinks}>
              <li><a href="/about">About Zakat</a></li>
              <li><a href="#guide">Calculation Guide</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2026 Universal Zakat Calculator | Secure & Universal Calculation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;