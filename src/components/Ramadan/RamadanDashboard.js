import { useState, useEffect } from 'react';
import styles from '../../../styles/Ramadan/RamadanDashboard.module.css';

const RamadanDashboard = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [cityLabel, setCityLabel] = useState("Detecting...");
  const [deed, setDeed] = useState("Loading your daily inspiration...");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hijriDate, setHijriDate] = useState(null);
  const [ramadanDay, setRamadanDay] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeToNextPrayer, setTimeToNextPrayer] = useState('');

  const deeds = [
    "Make a sincere Dua for your parents.",
    "Share a meal with a neighbor.",
    "Practice Sabr (patience) in a difficult moment today.",
    "Give charity (Sadaqah) even if it's just a small amount.",
    "Recite 'SubhanAllah' 100 times today.",
    "Remove an obstacle from a path people walk on.",
    "Read one page of the Quran with its meaning."
  ];

  const PUNE_LAT = 18.5204;
  const PUNE_LON = 73.8567;

  const formatTime12 = (time24) => {
    if (!time24) return "--:--";
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatGregorianDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentTime.toLocaleDateString('en-US', options);
  };

  const calculateTimeToNextPrayer = () => {
    if (!prayerTimes) return;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const prayers = [
      { name: 'Fajr', time: prayerTimes.Fajr },
      { name: 'Dhuhr', time: prayerTimes.Dhuhr },
      { name: 'Asr', time: prayerTimes.Asr },
      { name: 'Maghrib', time: prayerTimes.Maghrib },
      { name: 'Isha', time: prayerTimes.Isha }
    ];

    for (let prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':');
      const prayerMinutes = parseInt(hours) * 60 + parseInt(minutes);
      
      if (prayerMinutes > currentMinutes) {
        const diff = prayerMinutes - currentMinutes;
        const hoursLeft = Math.floor(diff / 60);
        const minutesLeft = diff % 60;
        
        setNextPrayer(prayer.name);
        setTimeToNextPrayer(`${hoursLeft}h ${minutesLeft}m`);
        return;
      }
    }

    const [hours, minutes] = prayers[0].time.split(':');
    const fajrMinutes = parseInt(hours) * 60 + parseInt(minutes);
    const diff = (24 * 60) - currentMinutes + fajrMinutes;
    const hoursLeft = Math.floor(diff / 60);
    const minutesLeft = diff % 60;
    
    setNextPrayer('Fajr');
    setTimeToNextPrayer(`${hoursLeft}h ${minutesLeft}m`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      calculateTimeToNextPrayer();
    }, 1000);
    return () => clearInterval(timer);
  }, [prayerTimes]);

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
          
          const hijri = data.data.date.hijri;
          setHijriDate({
            day: hijri.day,
            month: hijri.month.en,
            year: hijri.year,
            weekday: hijri.weekday.en
          });

          if (hijri.month.number === 9) {
            setRamadanDay(parseInt(hijri.day));
          }
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
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* Hero Section with Dates */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.islamicDateCard}>
              <div className={styles.moonCrescent}>🌙</div>
              {hijriDate ? (
                <>
                  <div className={styles.hijriMain}>
                    {hijriDate.day} {hijriDate.month} {hijriDate.year}H
                  </div>
                  <div className={styles.hijriSub}>{hijriDate.weekday}</div>
                </>
              ) : (
                <div className={styles.loadingText}>Loading...</div>
              )}
            </div>

            <div className={styles.timeDateCard}>
              <div className={styles.liveTime}>{formatCurrentTime()}</div>
              <div className={styles.gregorianFull}>{formatGregorianDate()}</div>
              <div className={styles.locationBadge}>
                <span className={styles.pinIcon}>📍</span>
                {cityLabel}
              </div>
            </div>
          </div>

          {ramadanDay && (
            <div className={styles.ramadanBanner}>
              <div className={styles.ramadanText}>
                <span className={styles.ramadanIcon}>☪️</span>
                Ramadan Day {ramadanDay} of 30
              </div>
              <div className={styles.progressTrack}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${(ramadanDay / 30) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Main Dashboard Grid */}
        <div className={styles.dashboardGrid}>
          
          {/* Prayer Times Card */}
          <div className={styles.prayerTimesCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <span className={styles.titleIcon}>🕌</span>
                Prayer Times
              </h2>
              {nextPrayer && (
                <div className={styles.nextPrayerBadge}>
                  <div className={styles.nextLabel}>Next</div>
                  <div className={styles.nextName}>{nextPrayer}</div>
                  <div className={styles.nextTime}>{timeToNextPrayer}</div>
                </div>
              )}
            </div>

            <div className={styles.prayersGrid}>
              {[
                { name: 'Fajr', time: prayerTimes?.Fajr, icon: '🌅', label: 'Dawn' },
                { name: 'Dhuhr', time: prayerTimes?.Dhuhr, icon: '☀️', label: 'Noon' },
                { name: 'Asr', time: prayerTimes?.Asr, icon: '🌤️', label: 'Afternoon' },
                { name: 'Maghrib', time: prayerTimes?.Maghrib, icon: '🌆', label: 'Sunset', highlight: true },
                { name: 'Isha', time: prayerTimes?.Isha, icon: '🌃', label: 'Night' }
              ].map((prayer, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.prayerItem} ${prayer.highlight ? styles.iftarHighlight : ''} ${nextPrayer === prayer.name ? styles.active : ''}`}
                >
                  <div className={styles.prayerIcon}>{prayer.icon}</div>
                  <div className={styles.prayerInfo}>
                    <div className={styles.prayerName}>{prayer.name}</div>
                    <div className={styles.prayerTime}>{formatTime12(prayer.time)}</div>
                    <div className={styles.prayerLabel}>{prayer.label}</div>
                  </div>
                  {prayer.highlight && <div className={styles.iftarTag}>Iftar</div>}
                </div>
              ))}
            </div>

            <div className={styles.suhoorAlert}>
              <span className={styles.alertIcon}>🌄</span>
              <div className={styles.alertContent}>
                <div className={styles.alertLabel}>Suhoor ends</div>
                <div className={styles.alertTime}>{formatTime12(prayerTimes?.Fajr)}</div>
              </div>
            </div>
          </div>

          {/* Right Side Column */}
          <div className={styles.sideColumn}>
            
            {/* Today's Deed */}
            <div className={styles.deedCard}>
              <div className={styles.deedBadge}>
                <span className={styles.starIcon}>⭐</span>
                Good Deed of the Day
              </div>
              <div className={styles.deedQuote}>"{deed}"</div>
              <div className={styles.deedFooter}>
                <span className={styles.sparkle}>✨</span>
                Small acts, great rewards
              </div>
            </div>

            {/* Hadith */}
            <div className={styles.hadithCard}>
              <div className={styles.hadithIcon}>📖</div>
              <div className={styles.hadithText}>
                "Whoever fasts Ramadan out of faith and seeking reward, his previous sins will be forgiven."
              </div>
              <div className={styles.hadithRef}>— Prophet Muhammad ﷺ</div>
            </div>

            {/* Daily Dhikr */}
            <div className={styles.dhikrCard}>
              <h3 className={styles.dhikrTitle}>
                <span className={styles.beadsIcon}>📿</span>
                Daily Dhikr
              </h3>
              <div className={styles.dhikrList}>
                {[
                  { arabic: 'سُبْحَانَ اللَّهِ', trans: 'SubhanAllah', count: '33x' },
                  { arabic: 'الْحَمْدُ لِلَّهِ', trans: 'Alhamdulillah', count: '33x' },
                  { arabic: 'اللَّهُ أَكْبَرُ', trans: 'Allahu Akbar', count: '34x' }
                ].map((dhikr, idx) => (
                  <div key={idx} className={styles.dhikrRow}>
                    <div className={styles.dhikrArabic}>{dhikr.arabic}</div>
                    <div className={styles.dhikrDetails}>
                      <span className={styles.dhikrTrans}>{dhikr.trans}</span>
                      <span className={styles.dhikrCount}>{dhikr.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ramadan Essentials */}
        <div className={styles.essentialsSection}>
          <h3 className={styles.essentialsTitle}>
            <span className={styles.essIcon}>🌟</span>
            Ramadan Essentials
          </h3>
          <div className={styles.essentialsGrid}>
            {[
              { icon: '📖', title: 'Quran', desc: 'Read one Juz daily' },
              { icon: '🤲', title: 'Taraweeh', desc: '20 rak\'ahs nightly' },
              { icon: '💰', title: 'Zakat', desc: 'Purify your wealth' },
              { icon: '✨', title: 'Laylatul Qadr', desc: 'Last 10 nights' }
            ].map((item, idx) => (
              <div key={idx} className={styles.essentialCard}>
                <div className={styles.essIcon}>{item.icon}</div>
                <div className={styles.essTitle}>{item.title}</div>
                <div className={styles.essDesc}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RamadanDashboard;