'use client';
import { useState, useEffect } from 'react';
import styles from '../../styles/ArabicCalligraphy.module.css';

const ArabicCalligraphy = ({ text = 'default', position = 'center' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const calligraphyText = {
    bismillah: 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
    alhamdulillah: 'ٱلْحَمْدُ لِلَّٰهِ',
    mashallah: 'مَا شَاءَ ٱللَّٰهُ',
    barakallah: 'بَارَكَ ٱللَّٰهُ فِيكَ',
    zakat: 'زَكَاة',
    sadaqah: 'صَدَقَة',
    default: 'ٱللَّٰهُ أَكْبَرُ'
  };

  return (
    <div className={`${styles.calligraphyContainer} ${styles[position]} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.calligraphyWrapper}>
        <p className={styles.arabicText}>
          {calligraphyText[text]}
        </p>
        <div className={styles.decorativeLine}>
          <span className={styles.ornament}>✦</span>
        </div>
      </div>
    </div>
  );
};

export default ArabicCalligraphy;