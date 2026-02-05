'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Header.module.css';
import Image from 'next/image';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Zakat Guide', path: '/about' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Articles', path: '/articles' },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Image 
              src="/website-logo.png" 
              alt="Mercy Oceans Logo" 
              className={styles.logoImage} 
              priority 
              width={100}
              height={100}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className={styles.ctaContainer}>
            <Link href="/calculator" className={styles.ctaButton}>
              Calculate Zakat
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <span className={styles.closeIcon}>✕</span>
            ) : (
              <span className={styles.menuIcon}>☰</span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`${styles.mobileNavLink} ${isActive(link.path) ? styles.activeMobile : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/calculator"
              className={styles.mobileCtaButton}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calculate Zakat
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;