import Head from 'next/head';
import Layout from '../src/components/Layout';
import styles from '../styles/About.module.css';
import Link from 'next/link';
import Meta from '../src/components/Meta';

const About = () => {
  return (
    <Layout>
      <Meta />

      <div className={styles.pageWrapper}>
        
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroPattern}></div>
          <div className={styles.heroContent}>
            <div className={styles.heroIcon}>🕌</div>
            <h1 className={styles.heroTitle}>Understanding Zakat</h1>
            <p className={styles.heroSubtitle}>
              Purifying Wealth, Empowering Communities
            </p>
          </div>
        </section>

        <div className={styles.container}>
          
          {/* What is Zakat */}
          <section className={styles.contentSection}>
            <div className={styles.sectionBadge}>
              <span className={styles.badgeIcon}>📖</span>
              Introduction
            </div>
            <h2 className={styles.sectionHeading}>What is Zakat?</h2>
            <div className={styles.textCard}>
              <p className={styles.bodyText}>
                Zakat is an obligatory form of charity and one of the Five Pillars of Islam. 
                It is a religious duty for all Muslims who meet the necessary criteria of wealth 
                to donate <strong>2.5%</strong> of their qualifying savings each year. The word "Zakat" means both <strong>'purification'</strong> and <strong>'growth'</strong>. 
                As an act of worship, it requires <strong>Niyyah (Intention)</strong>; you must intend in 
                your heart that the payment is specifically for Zakat to fulfill the obligation.
              </p>
            </div>
          </section>

          {/* Importance of Zakat */}
          <section className={styles.contentSection}>
            <div className={styles.sectionBadge}>
              <span className={styles.badgeIcon}>⭐</span>
              Core Values
            </div>
            <h2 className={styles.sectionHeading}>The Importance of Zakat</h2>
            <div className={styles.importanceGrid}>
              <div className={styles.importanceCard}>
                <div className={styles.cardIconBox}>🤲</div>
                <h3 className={styles.cardHeading}>Spiritual Purification</h3>
                <p className={styles.cardDescription}>Removes greed and fosters detachment from worldly possessions.</p>
              </div>
              <div className={styles.importanceCard}>
                <div className={styles.cardIconBox}>❤️</div>
                <h3 className={styles.cardHeading}>Social Justice</h3>
                <p className={styles.cardDescription}>Redistributes wealth to provide a safety net for the vulnerable.</p>
              </div>
              <div className={styles.importanceCard}>
                <div className={styles.cardIconBox}>📈</div>
                <h3 className={styles.cardHeading}>Economic Circulation</h3>
                <p className={styles.cardDescription}>Prevents hoarding and stimulates the economy by helping the poor.</p>
              </div>
              <div className={styles.importanceCard}>
                <div className={styles.cardIconBox}>🌟</div>
                <h3 className={styles.cardHeading}>Eternal Reward</h3>
                <p className={styles.cardDescription}>Fulfilling this command brings immense blessings from Allah (SWT).</p>
              </div>
            </div>
          </section>

          {/* Handling Riba */}
          <section className={styles.contentSection}>
            <div className={styles.sectionBadge}>
              <span className={styles.badgeIcon}>⚠️</span>
              Important
            </div>
            <h2 className={styles.sectionHeading}>Handling Bank Interest (Riba)</h2>
            <div className={styles.textCard}>
              <p className={styles.bodyText}>
                Interest earned from banks is strictly <strong>Prohibited (Haram)</strong>. It cannot be counted as part of your wealth for Zakat, nor can it be used to pay your Zakat.
              </p>
            </div>
            <div className={styles.warningBox}>
              <div className={styles.warningIcon}>🚫</div>
              <div className={styles.warningContent}>
                <strong>What to do:</strong> You must dispose of 100% of interest by giving it to charity 
                without the intention of receiving a spiritual reward. You must remove this amount entirely 
                from your calculations.
              </div>
            </div>
          </section>

          {/* Rules of Eligibility */}
          <section className={styles.contentSection}>
            <div className={styles.sectionBadge}>
              <span className={styles.badgeIcon}>✅</span>
              Requirements
            </div>
            <h2 className={styles.sectionHeading}>Rules of Eligibility</h2>
            <div className={styles.textCard}>
              <p className={styles.bodyText}>
                A Muslim is required to pay Zakat if they meet the following conditions:
              </p>
            </div>
            <div className={styles.eligibilityGrid}>
              <div className={styles.eligibilityCard}>
                <div className={styles.numberBadge}>1</div>
                <h3 className={styles.eligibilityHeading}>Sahib-e-Nisaab</h3>
                <p className={styles.eligibilityDescription}>
                  Your qualifying wealth must exceed the Nisaab threshold (the value of 612.32g of Silver or 87.48g of Gold).
                </p>
              </div>
              <div className={styles.eligibilityCard}>
                <div className={styles.numberBadge}>2</div>
                <h3 className={styles.eligibilityHeading}>Hawl (Lunar Year)</h3>
                <p className={styles.eligibilityDescription}>
                  You must have held that wealth for one full Islamic lunar year.
                </p>
              </div>
              <div className={styles.eligibilityCard}>
                <div className={styles.numberBadge}>3</div>
                <h3 className={styles.eligibilityHeading}>Full Ownership</h3>
                <p className={styles.eligibilityDescription}>
                  You must have absolute ownership and possession of the assets.
                </p>
              </div>
            </div>
          </section>

          {/* Standard Assets */}
          <section className={styles.contentSection}>
            <div className={styles.sectionBadge}>
              <span className={styles.badgeIcon}>💰</span>
              Asset Types
            </div>
            <h2 className={styles.sectionHeading}>Standard Assets (2.5%)</h2>
            <div className={styles.assetGrid}>
              <div className={styles.assetCard}>
                <h3 className={styles.assetCardHeading}>
                  <span className={styles.checkIcon}>✅</span> Include
                </h3>
                <p className={styles.assetCardText}>
                  Cash, Gold & Silver, <strong>Cryptocurrency</strong>, Shares/Stocks, Money owed to you, <strong>Provident Funds (PF)</strong>, and Business Inventory.
                </p>
              </div>
              <div className={styles.assetCard}>
                <h3 className={styles.assetCardHeading}>
                  <span className={styles.crossIcon}>❌</span> Exclude
                </h3>
                <p className={styles.assetCardText}>
                  Your primary home, personal car, clothing, furniture, and precious stones like diamonds or pearls (unless held for trade).
                </p>
              </div>
            </div>
            <div className={styles.infoBox}>
              <div className={styles.infoIcon}>ℹ️</div>
              <div className={styles.infoContent}>
                <strong>Important Note on Debts:</strong> Deduct immediate liabilities and <strong>up to 12 months</strong> of long-term debt installments (e.g., Home Loan EMIs) from your assets before calculating.
              </div>
            </div>
          </section>

          {/* Special Categories */}
          <section className={styles.contentSection}>
            <div className={styles.sectionBadge}>
              <span className={styles.badgeIcon}>🔍</span>
              Special Cases
            </div>
            <h2 className={styles.sectionHeading}>Special Asset Categories</h2>
            
            {/* Agriculture */}
            <div className={styles.specialCard}>
              <h3 className={styles.specialHeading}>
                <span className={styles.specialIcon}>🌾</span> 1. Agriculture Produce (Ushr)
              </h3>
              <div className={styles.specialContent}>
                <p className={styles.bodyText}>
                  Zakat on crops is called <strong>Ushr (Tenth)</strong>. Unlike other assets, there is <strong>no one-year waiting period (Hawl)</strong>; you pay it on the day of harvest.
                </p>
                <div className={styles.tableContainer}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>Watering Method</th>
                        <th>Zakat Rate</th>
                        <th>Threshold (Nisaab)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Natural (Rain/Springs)</td>
                        <td className={styles.highlightCell}>10%</td>
                        <td rowSpan="2">653 kg of Produce</td>
                      </tr>
                      <tr>
                        <td>Artificial (Irrigation/Pumps)</td>
                        <td className={styles.highlightCell}>5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={styles.actionBox}>
                  <strong>What to do:</strong> Calculate your total harvest weight. If it exceeds 653kg, set aside either 5% or 10% of the crop immediately after harvest.
                </div>
              </div>
            </div>

            {/* Livestock */}
            <div className={styles.specialCard}>
              <h3 className={styles.specialHeading}>
                <span className={styles.specialIcon}>🐑</span> 2. Livestock (An'am)
              </h3>
              <div className={styles.specialContent}>
                <p className={styles.bodyText}>
                  This applies only to animals that graze on open pasture for most of the year. Animals kept for personal meat or as "pets" are exempt.
                </p>
                <div className={styles.livestockGrid}>
                  <div className={styles.livestockBox}>
                    <strong>Sheep & Goats</strong>
                    <div className={styles.minThreshold}>Min: 40 Animals</div>
                    <div className={styles.rateDetail}>1 animal per 40</div>
                  </div>
                  <div className={styles.livestockBox}>
                    <strong>Cows & Buffalo</strong>
                    <div className={styles.minThreshold}>Min: 30 Animals</div>
                    <div className={styles.rateDetail}>1 yearling calf per 30</div>
                  </div>
                  <div className={styles.livestockBox}>
                    <strong>Camels</strong>
                    <div className={styles.minThreshold}>Min: 5 Animals</div>
                    <div className={styles.rateDetail}>Scaled rate applies</div>
                  </div>
                </div>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>ℹ️</div>
                  <div className={styles.infoContent}>
                    <strong>What to do:</strong> If you are a commercial farmer where animals are stall-fed (not grazing), treat the business as "Trade Stock" and pay <strong>2.5% on the value</strong> of the animals.
                  </div>
                </div>
              </div>
            </div>

            {/* Buried Treasure */}
            <div className={styles.specialCard}>
              <h3 className={styles.specialHeading}>
                <span className={styles.specialIcon}>💎</span> 3. Buried Treasure & Mines (Rikaz)
              </h3>
              <div className={styles.specialContent}>
                <p className={styles.bodyText}>
                  Refers to natural resources (oil/gold) or ancient treasure found on your land.
                </p>
                <div className={styles.pointsList}>
                  <div className={styles.pointItem}>
                    <strong>The Rate:</strong> 20% (One-fifth or Khums) due immediately.
                  </div>
                  <div className={styles.pointItem}>
                    <strong>The Rule:</strong> No Nisaab and no one-year waiting period apply because this wealth required little labor.
                  </div>
                </div>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>ℹ️</div>
                  <div className={styles.infoContent}>
                    <strong>What to do:</strong> If you discover treasure or a mineral deposit, 20% of its value is due immediately.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recipients */}
          <section className={styles.contentSection}>
            <div className={styles.sectionBadge}>
              <span className={styles.badgeIcon}>👥</span>
              Distribution
            </div>
            <h2 className={styles.sectionHeading}>Who Receives Zakat?</h2>
            <div className={styles.textCard}>
              <p className={styles.bodyText}>
                Zakat must be distributed to the 8 categories defined in the Quran (9:60), primarily the poor, the needy, those in debt, and wayfarers.
              </p>
            </div>
            <div className={styles.assetGrid}>
              <div className={styles.recipientCard}>
                <h3 className={styles.recipientHeading}>
                  <span className={styles.checkIcon}>✅</span> Eligible Relatives
                </h3>
                <p className={styles.recipientText}>Giving to a poor brother, sister, uncle, or aunt is highly encouraged and carries double reward.</p>
              </div>
              <div className={styles.recipientCard}>
                <h3 className={styles.recipientHeading}>
                  <span className={styles.crossIcon}>❌</span> Ineligible Relatives
                </h3>
                <p className={styles.recipientText}>You <strong>cannot</strong> give Zakat to your spouse, parents, grandparents, or children.</p>
              </div>
            </div>
          </section>

          {/* Methodology Note */}
          <div className={styles.methodologyCard}>
            <p>
              <strong>Note on Methodology:</strong> Information and reference for this tool are guided by 'Zakat Simplified by Abdul Rahim.' Market rates for Gold and Silver are updated via real-time 2026 spot prices.
            </p>
          </div>

          {/* CTA Section */}
          <section className={styles.ctaContainer}>
            <div className={styles.ctaBox}>
              <h2 className={styles.ctaHeading}>Ready to Calculate Your Zakat?</h2>
              <p className={styles.ctaSubheading}>Use our calculator to determine your Zakat obligation accurately</p>
              <Link href="/calculator" className={styles.ctaButton}>
                <span className={styles.ctaIcon}>🧮</span>
                Calculate Now
                <span className={styles.ctaArrow}>→</span>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
};

export default About;