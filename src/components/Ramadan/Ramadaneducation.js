import { useState, useEffect } from 'react';
import styles from '../../../styles/Ramadan/Ramadaneducation.module.css';

const RamadanEducation = () => {
  const [activeTab, setActiveTab] = useState('tips');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [expandedTerm, setExpandedTerm] = useState(null);
  const [dailyTip, setDailyTip] = useState('');
  const [dailyHadith, setDailyHadith] = useState(null);

  // Daily Tips Array
  const tips = [
    "Start your fast with dates and water, following the Sunnah of Prophet Muhammad ﷺ",
    "Recite Quran during Fajr time - it's the most blessed time for memorization",
    "Give charity every day, even if it's a small amount. Consistency matters!",
    "Make sincere Dua during the last third of the night - Allah descends to answer",
    "Maintain good character while fasting - anger and harsh words nullify rewards",
    "Increase your Istighfar (seeking forgiveness) throughout the day",
    "Break your fast on time and don't delay - it brings barakah",
    "Perform Taraweeh prayers - they cleanse the soul and bring peace",
    "Remember the poor and hungry while you fast - share your blessings",
    "Read the translation of Quran to understand its deeper meanings",
    "Practice patience (Sabr) - fasting teaches self-control in all aspects",
    "Make Dua before Iftar - it's a time when prayers are answered",
    "Avoid gossip, backbiting, and negative speech while fasting",
    "Wake up for Suhoor - there is barakah in the pre-dawn meal",
    "Perform extra voluntary prayers (Nafl) to maximize rewards",
    "Help others break their fast - you get equal reward without losing yours",
    "Seek Laylatul Qadr in the last 10 nights with sincerity",
    "Increase Salawat (blessings) upon the Prophet ﷺ during this month",
    "Reflect on your deeds and seek to improve yourself spiritually",
    "Recite Surah Al-Qadr and understand its significance",
    "Practice gratitude - thank Allah for the ability to fast",
    "Avoid overeating at Iftar - moderation is key to staying energized",
    "Invite others to join you for Iftar - build community bonds",
    "Read Islamic books and listen to beneficial lectures",
    "Make Dua for the Ummah and those suffering around the world",
    "Teach children about Ramadan - pass on the traditions",
    "Volunteer at local mosques or charity organizations",
    "Spend time in I'tikaf if possible during the last 10 days",
    "Plan your Zakat and pay it during Ramadan for maximum reward",
    "End Ramadan with renewed commitment to maintain good habits"
  ];

  // Hadith Collection
  const hadiths = [
    {
      arabic: "مَن صَامَ رَمَضَانَ إيمَانًا واحْتِسَابًا غُفِرَ له ما تَقَدَّمَ مِن ذَنْبِهِ",
      english: "Whoever fasts Ramadan out of faith and seeking reward, his previous sins will be forgiven.",
      source: "Sahih Bukhari 38"
    },
    {
      arabic: "الصِّيَامُ جُنَّةٌ",
      english: "Fasting is a shield (from Hell and from committing sins).",
      source: "Sahih Bukhari 1894"
    },
    {
      arabic: "إِذَا دَخَلَ رَمَضَانُ فُتِّحَتْ أَبْوَابُ الجَنَّةِ، وَغُلِّقَتْ أَبْوَابُ جَهَنَّمَ، وَسُلْسِلَتِ الشَّيَاطِينُ",
      english: "When Ramadan begins, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained.",
      source: "Sahih Bukhari 1899"
    },
    {
      arabic: "مَن فَطَّرَ صَائِمًا كانَ له مِثلُ أجرِهِ",
      english: "Whoever provides food for a fasting person to break his fast, he will have a reward like his.",
      source: "Sunan at-Tirmidhi 807"
    },
    {
      arabic: "الصَّوْمُ لِي وَأَنَا أَجْزِي بِهِ",
      english: "Fasting is for Me and I will reward for it.",
      source: "Sahih Bukhari 1904"
    },
    {
      arabic: "لِلصَّائِمِ فَرْحَتَانِ: فَرْحَةٌ عِنْدَ فِطْرِهِ، وَفَرْحَةٌ عِنْدَ لِقَاءِ رَبِّهِ",
      english: "The fasting person has two moments of joy: when he breaks his fast and when he meets his Lord.",
      source: "Sahih Muslim 1151"
    },
    {
      arabic: "إِنَّ فِي الجَنَّةِ بَابًا يُقَالُ لَهُ الرَّيَّانُ، يَدْخُلُ مِنْهُ الصَّائِمُونَ",
      english: "There is a gate in Paradise called Ar-Rayyan, through which only those who fast will enter.",
      source: "Sahih Bukhari 1896"
    },
    {
      arabic: "تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً",
      english: "Take Suhoor (pre-dawn meal), for there is blessing in Suhoor.",
      source: "Sahih Bukhari 1923"
    },
    {
      arabic: "مَن قَامَ رَمَضَانَ إيمانًا واحتِسابًا، غُفِرَ له ما تقدَّمَ مِن ذَنبِهِ",
      english: "Whoever stands (in prayer) in Ramadan out of faith and seeking reward, his previous sins will be forgiven.",
      source: "Sahih Bukhari 2009"
    },
    {
      arabic: "عُمْرَةٌ فِي رَمَضَانَ تَعْدِلُ حَجَّةً",
      english: "Umrah performed in Ramadan is equivalent to Hajj.",
      source: "Sahih Bukhari 1863"
    }
  ];

  // Dua Flashcards
  const duas = [
    {
      title: "Dua Before Iftar",
      arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
      transliteration: "Allahumma inni laka sumtu wa bika aamantu wa 'alayka tawakkaltu wa 'ala rizqika aftartu",
      translation: "O Allah! I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance.",
      when: "Said when breaking the fast"
    },
    {
      title: "Dua After Iftar",
      arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ",
      transliteration: "Dhahaba adh-dhama'u wabtallatil 'urooqu wa thabatal ajru insha Allah",
      translation: "The thirst is gone, the veins are moistened and the reward is confirmed, if Allah wills.",
      when: "Said after drinking water at Iftar"
    },
    {
      title: "Dua for Suhoor",
      arabic: "وَبِصَوْمِ غَدٍ نَوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
      transliteration: "Wa bisawmi ghadin nawaitu min shahri Ramadan",
      translation: "I intend to keep the fast for tomorrow in the month of Ramadan.",
      when: "Before sleeping after Suhoor"
    },
    {
      title: "Dua on Laylatul Qadr",
      arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
      transliteration: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni",
      translation: "O Allah, You are Most Forgiving, and You love forgiveness, so forgive me.",
      when: "Recommended by Prophet ﷺ for Laylatul Qadr"
    },
    {
      title: "Dua When Fasting",
      arabic: "إِنِّي صَائِمٌ، إِنِّي صَائِمٌ",
      transliteration: "Inni sa'im, inni sa'im",
      translation: "I am fasting, I am fasting.",
      when: "When faced with anger or provocation"
    },
    {
      title: "Dua for Forgiveness",
      arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
      transliteration: "Rabbana dhalamna anfusana wa il-lam taghfir lana wa tarhamna lanakoonanna minal-khasireen",
      translation: "Our Lord! We have wronged ourselves. If You forgive us not and bestow not upon us Your Mercy, we shall certainly be of the losers.",
      when: "Seeking forgiveness during Ramadan"
    },
    {
      title: "Dua for Acceptance",
      arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
      transliteration: "Rabbana taqabbal minna innaka antas-Samee'ul-'Aleem",
      translation: "Our Lord! Accept (this service) from us. Verily, You are the All-Hearer, the All-Knower.",
      when: "After completing worship or good deeds"
    },
    {
      title: "Dua Before Sleeping",
      arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
      transliteration: "Allahumma bismika amootu wa ahya",
      translation: "O Allah, in Your Name I die and I live.",
      when: "Before sleeping after Taraweeh"
    }
  ];

  // Islamic Terms Glossary
  const glossary = [
    {
      term: "Ramadan",
      definition: "The ninth month of the Islamic lunar calendar, during which Muslims fast from dawn to sunset. It commemorates the first revelation of the Quran to Prophet Muhammad ﷺ."
    },
    {
      term: "Sawm (صوم)",
      definition: "Fasting - abstaining from food, drink, and intimate relations from dawn (Fajr) until sunset (Maghrib). It is the fourth pillar of Islam."
    },
    {
      term: "Suhoor (سحور)",
      definition: "The pre-dawn meal eaten before beginning the daily fast. The Prophet ﷺ said there is blessing (barakah) in Suhoor."
    },
    {
      term: "Iftar (إفطار)",
      definition: "The meal eaten to break the fast at sunset (Maghrib time). The Prophet ﷺ recommended breaking the fast with dates and water."
    },
    {
      term: "Taraweeh (تراويح)",
      definition: "Special nightly prayers performed during Ramadan after Isha prayer. They can be 8, 11, or 20 rak'ahs depending on tradition."
    },
    {
      term: "Laylatul Qadr (ليلة القدر)",
      definition: "The Night of Power - the holiest night of the year, believed to fall on one of the odd nights in the last 10 days of Ramadan. Worship on this night is better than 1000 months."
    },
    {
      term: "I'tikaf (اعتكاف)",
      definition: "Spiritual retreat in the mosque, especially during the last 10 days of Ramadan. The person dedicates time for worship, Quran recitation, and remembrance of Allah."
    },
    {
      term: "Zakat al-Fitr (زكاة الفطر)",
      definition: "Obligatory charity given before Eid prayer at the end of Ramadan. It purifies the fast and helps the needy celebrate Eid."
    },
    {
      term: "Eid al-Fitr (عيد الفطر)",
      definition: "The Festival of Breaking the Fast - celebrated on the first day of Shawwal (the month after Ramadan). Muslims gather for prayer, give charity, and celebrate."
    },
    {
      term: "Niyyah (نية)",
      definition: "Intention - A silent intention in the heart to fast for the sake of Allah. It must be made before Fajr each day of Ramadan."
    },
    {
      term: "Fidyah (فدية)",
      definition: "Compensation paid by those who cannot fast due to chronic illness or old age. They must feed one poor person for each missed day."
    },
    {
      term: "Kaffarah (كفارة)",
      definition: "Expiation for deliberately breaking a fast without valid reason. It requires fasting 60 consecutive days or feeding 60 poor people."
    },
    {
      term: "Sahur (سحر)",
      definition: "The pre-dawn time period before Fajr. It's the blessed time for eating Suhoor and making Dua."
    },
    {
      term: "Qiyam al-Layl (قيام الليل)",
      definition: "Standing in prayer during the night. Highly recommended during Ramadan, especially in the last third of the night."
    },
    {
      term: "Sadaqah (صدقة)",
      definition: "Voluntary charity given beyond obligatory Zakat. The Prophet ﷺ said the reward for charity is multiplied in Ramadan."
    }
  ];

  // Set daily tip based on date
  useEffect(() => {
    const dayOfMonth = new Date().getDate();
    setDailyTip(tips[dayOfMonth % tips.length]);
  }, []);

  // Set daily hadith based on date
  useEffect(() => {
    const dayOfMonth = new Date().getDate();
    setDailyHadith(hadiths[dayOfMonth % hadiths.length]);
  }, []);

  // Flashcard navigation
  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % duas.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + duas.length) % duas.length);
  };

  // Toggle glossary term
  const toggleTerm = (index) => {
    setExpandedTerm(expandedTerm === index ? null : index);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={styles.heroHeader}>
          <div className={styles.headerIcon}>📚</div>
          <h1 className={styles.mainTitle}>Islamic Knowledge Hub</h1>
          <p className={styles.mainSubtitle}>Learn and grow during this blessed month of Ramadan</p>
        </div>

        {/* Modern Tab Navigation */}
        <div className={styles.tabNavigation}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'tips' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            <span className={styles.tabEmoji}>💡</span>
            <span className={styles.tabLabel}>Daily Tips</span>
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'hadith' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('hadith')}
          >
            <span className={styles.tabEmoji}>📖</span>
            <span className={styles.tabLabel}>Hadith</span>
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'duas' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('duas')}
          >
            <span className={styles.tabEmoji}>🤲</span>
            <span className={styles.tabLabel}>Duas</span>
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'glossary' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('glossary')}
          >
            <span className={styles.tabEmoji}>📝</span>
            <span className={styles.tabLabel}>Glossary</span>
          </button>
        </div>

        {/* Content Cards */}
        <div className={styles.contentWrapper}>
          
          {/* Daily Tip */}
          {activeTab === 'tips' && (
            <div className={styles.contentCard}>
              <div className={styles.badgeTag}>
                <span className={styles.badgeIcon}>⭐</span>
                Tip of the Day
              </div>
              <div className={styles.tipContainer}>
                <div className={styles.bulbIcon}>💡</div>
                <p className={styles.tipContent}>{dailyTip}</p>
              </div>
            </div>
          )}

          {/* Hadith of the Day */}
          {activeTab === 'hadith' && dailyHadith && (
            <div className={styles.contentCard}>
              <div className={styles.badgeTag}>
                <span className={styles.badgeIcon}>📿</span>
                Hadith of the Day
              </div>
              <div className={styles.hadithContainer}>
                <div className={styles.quoteDecor}>"</div>
                <div className={styles.hadithArabicText}>{dailyHadith.arabic}</div>
                <div className={styles.hadithEnglishText}>"{dailyHadith.english}"</div>
                <div className={styles.hadithSourceText}>— {dailyHadith.source}</div>
              </div>
              <div className={styles.rotateNote}>New Hadith every day</div>
            </div>
          )}

          {/* Dua Flashcards */}
          {activeTab === 'duas' && (
            <div className={styles.flashcardWrapper}>
              <div className={styles.duaCard}>
                <div className={styles.duaCardHeader}>
                  <span className={styles.duaCounter}>{currentCardIndex + 1} / {duas.length}</span>
                  <h3 className={styles.duaTitleText}>{duas[currentCardIndex].title}</h3>
                </div>
                
                <div className={styles.duaCardBody}>
                  <div className={styles.duaArabicText}>{duas[currentCardIndex].arabic}</div>
                  <div className={styles.duaTransliterationText}>{duas[currentCardIndex].transliteration}</div>
                  <div className={styles.duaTranslationText}>{duas[currentCardIndex].translation}</div>
                  <div className={styles.duaWhenBox}>
                    <span className={styles.clockIcon}>⏰</span>
                    {duas[currentCardIndex].when}
                  </div>
                </div>
              </div>

              <div className={styles.flashcardNav}>
                <button onClick={prevCard} className={styles.navBtn}>
                  ← Previous
                </button>
                <div className={styles.dotIndicators}>
                  {duas.map((_, index) => (
                    <button
                      key={index} 
                      className={`${styles.dotBtn} ${index === currentCardIndex ? styles.dotActive : ''}`}
                      onClick={() => setCurrentCardIndex(index)}
                    />
                  ))}
                </div>
                <button onClick={nextCard} className={styles.navBtn}>
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Glossary */}
          {activeTab === 'glossary' && (
            <div className={styles.glossaryWrapper}>
              <div className={styles.glossaryIntro}>
                <h3 className={styles.glossaryHeading}>Islamic Terms & Definitions</h3>
                <p className={styles.glossaryDesc}>Click on any term to expand its definition</p>
              </div>
              
              <div className={styles.glossaryGrid}>
                {glossary.map((item, index) => (
                  <div 
                    key={index} 
                    className={`${styles.glossaryCard} ${expandedTerm === index ? styles.glossaryExpanded : ''}`}
                    onClick={() => toggleTerm(index)}
                  >
                    <div className={styles.glossaryCardTop}>
                      <span className={styles.termName}>{item.term}</span>
                      <span className={styles.expandBtn}>
                        {expandedTerm === index ? '−' : '+'}
                      </span>
                    </div>
                    {expandedTerm === index && (
                      <div className={styles.termDefinition}>
                        {item.definition}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RamadanEducation;