import { useState, useEffect } from 'react';
import styles from '../../styles/RamadanDashboard.module.css';
import Image from 'next/image';

const RamadanDashboard = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [cityLabel, setCityLabel] = useState("Detecting...");
  const [deed, setDeed] = useState("Loading your daily inspiration...");
  const [currentTime, setCurrentTime] = useState(new Date());

  const deeds = [
    "Share a meal with a neighbor.",
    "Practice Sabr (patience) in a difficult moment today.",
    "Give charity (Sadaqah) even if it's just a small amount.",
    "Recite 'SubhanAllah' 100 times today.",
    "Make a sincere Dua for your parents.",
    "Remove an obstacle from a path people walk on.",
    "Read one page of the Quran with its meaning."
  ];

  // Coordinates for Pune, Maharashtra, India
  const PUNE_LAT = 18.5204;
  const PUNE_LON = 73.8567;

  // Helper function to convert 24h to 12h format
  const formatTime12 = (time24) => {
    if (!time24) return "--:--";
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  // Format current time
  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const dayOfYear = new Date().getDate();
    setDeed(deeds[dayOfYear % deeds.length]);

    const fetchTimes = async (lat, lon, label) => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByAddress?address=${lat},${lon}`
        );
        const data = await response.json();
        if (data.code === 200) {
          setPrayerTimes(data.data.timings);
          setCityLabel(label);
        }
      } catch (error) {
        console.error("❌ Fetch Error:", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchTimes(position.coords.latitude, position.coords.longitude, "Your Location");
        },
        () => {
          fetchTimes(PUNE_LAT, PUNE_LON, "Pune, India");
        }
      );
    } else {
      fetchTimes(PUNE_LAT, PUNE_LON, "Pune, India");
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.dashboardCard}>
        <div className={styles.decorativePattern}></div>
        
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.moonIcon}>
              <span>🌙</span>
            </div>
            <div>
              <h2 className={styles.title}>Ramadan Dashboard</h2>
              <p className={styles.subtitle}>Blessed Month of 2026</p>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.currentTime}>{formatCurrentTime()}</div>
            <div className={styles.location}>
              <span className={styles.locationIcon}>📍</span>
              {cityLabel}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          
          {/* Prayer Times Section */}
          <div className={styles.prayerSection}>
            <h3 className={styles.sectionTitle}>
              <Image 
                className={styles.sectionIcon} 
                src="/website-logo.png" 
                width={50} height={50} 
                alt="Mosque Icon" 
              />
              Prayer Times
            </h3>
            
            <div className={styles.prayerGrid}>
              <div className={styles.prayerCard}>
                <div className={styles.prayerLabel}>Fajr</div>
                <div className={styles.prayerTime}>{formatTime12(prayerTimes?.Fajr)}</div>
                <div className={styles.prayerSubtext}>Dawn Prayer</div>
              </div>
              
              <div className={styles.prayerCard}>
                <div className={styles.prayerLabel}>Dhuhr</div>
                <div className={styles.prayerTime}>{formatTime12(prayerTimes?.Dhuhr)}</div>
                <div className={styles.prayerSubtext}>Noon Prayer</div>
              </div>
              
              <div className={styles.prayerCard}>
                <div className={styles.prayerLabel}>Asr</div>
                <div className={styles.prayerTime}>{formatTime12(prayerTimes?.Asr)}</div>
                <div className={styles.prayerSubtext}>Afternoon</div>
              </div>
              
              <div className={`${styles.prayerCard} ${styles.highlighted}`}>
                <div className={styles.prayerLabel}>Maghrib</div>
                <div className={styles.prayerTime}>{formatTime12(prayerTimes?.Maghrib)}</div>
                <div className={styles.prayerSubtext}>Iftar Time</div>
                <div className={styles.iftarBadge}>Break Fast</div>
              </div>
              
              <div className={styles.prayerCard}>
                <div className={styles.prayerLabel}>Isha</div>
                <div className={styles.prayerTime}>{formatTime12(prayerTimes?.Isha)}</div>
                <div className={styles.prayerSubtext}>Night Prayer</div>
              </div>
            </div>

            {/* Suhoor Reminder */}
            <div className={styles.suhoorReminder}>
              <span className={styles.reminderIcon}>🌅</span>
              <div className={styles.reminderContent}>
                <div className={styles.reminderTitle}>Suhoor ends at</div>
                <div className={styles.reminderTime}>{formatTime12(prayerTimes?.Fajr)}</div>
              </div>
            </div>
          </div>

          {/* Daily Deed Section */}
          <div className={styles.deedSection}>
            <div className={styles.deedHeader}>
              <span className={styles.deedBadge}>Today's Good Deed</span>
            </div>
            
            <div className={styles.deedCard}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.deedText}>{deed}</p>
              <div className={styles.deedFooter}>
                <span className={styles.deedEmoji}>✨</span>
                <span className={styles.deedSubtext}>Small acts, great rewards</span>
              </div>
            </div>

            {/* Hadith Quote */}
            <div className={styles.hadithQuote}>
              <div className={styles.hadithText}>
                "The best charity is that given in Ramadan."
              </div>
              <div className={styles.hadithSource}>— Prophet Muhammad ﷺ</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RamadanDashboard;