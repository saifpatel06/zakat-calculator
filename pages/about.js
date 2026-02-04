import Head from 'next/head';
import Layout from '../src/components/Layout';
import styles from '../styles/About.module.css';
import Link from 'next/link';
import Meta from '../src/components/Meta';

const About = () => {
  return (
    <Layout>
      <Meta />

      <div className={styles.aboutPage}>
        <section className={styles.hero}>
          <div className={styles.heroBackground}></div>
          <div className={styles.container}>
            <h1 className={styles.title}>Understanding Zakat</h1>
            <p className={styles.subtitle}>
              Purifying Wealth, Empowering Communities
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.container}>
            
            {/* Section: What is Zakat & Niyyah */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>What is Zakat?</h2>
              <p className={styles.text}>
                Zakat is an obligatory form of charity and one of the Five Pillars of Islam. 
                It is a religious duty for all Muslims who meet the necessary criteria of wealth 
                to donate <strong>2.5%</strong> of their qualifying savings each year. The word "Zakat" means both <strong>'purification'</strong> and <strong>'growth'</strong>. 
                As an act of worship, it requires <strong>Niyyah (Intention)</strong>; you must intend in 
                your heart that the payment is specifically for Zakat to fulfill the obligation.
              </p>
            </div>

            {/* Section: Importance */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>The Importance of Zakat</h2>
              <div className={styles.importanceGrid}>
                <div className={styles.card}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>🤲</span>
                  </div>
                  <h3 className={styles.cardTitle}>Spiritual Purification</h3>
                  <p className={styles.cardText}>Removes greed and fosters detachment from worldly possessions.</p>
                </div>
                <div className={styles.card}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>❤️</span>
                  </div>
                  <h3 className={styles.cardTitle}>Social Justice</h3>
                  <p className={styles.cardText}>Redistributes wealth to provide a safety net for the vulnerable.</p>
                </div>
                <div className={styles.card}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>📈</span>
                  </div>
                  <h3 className={styles.cardTitle}>Economic Circulation</h3>
                  <p className={styles.cardText}>Prevents hoarding and stimulates the economy by helping the poor.</p>
                </div>
                <div className={styles.card}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>🌟</span>
                  </div>
                  <h3 className={styles.cardTitle}>Eternal Reward</h3>
                  <p className={styles.cardText}>Fulfilling this command brings immense blessings from Allah (SWT).</p>
                </div>
              </div>
            </div>

            {/* Section: Handling Interest (Riba) */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Handling Bank Interest (Riba)</h2>
              <p className={styles.text}>
                Interest earned from banks is strictly <strong>Prohibited (Haram)</strong>. It cannot be counted as part of your wealth for Zakat, nor can it be used to pay your Zakat.
              </p>
              <blockquote className={styles.warningNote}>
                <strong>What to do:</strong> You must dispose of 100% of interest by giving it to charity 
                without the intention of receiving a spiritual reward. You must remove this amount entirely 
                from your calculations.
              </blockquote>
            </div>

            {/* Section: Rules of Eligibility */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Rules of Eligibility</h2>
              <p className={styles.text}>
                A Muslim is required to pay Zakat if they meet the following conditions:
              </p>
              <div className={styles.eligibilityGrid}>
                <div className={styles.eligibilityCard}>
                  <div className={styles.eligibilityNumber}>1</div>
                  <h3 className={styles.eligibilityTitle}>Sahib-e-Nisaab</h3>
                  <p className={styles.eligibilityText}>
                    Your qualifying wealth must exceed the Nisaab threshold (the value of 612.32g of Silver or 87.48g of Gold).
                  </p>
                </div>
                <div className={styles.eligibilityCard}>
                  <div className={styles.eligibilityNumber}>2</div>
                  <h3 className={styles.eligibilityTitle}>Hawl (Lunar Year)</h3>
                  <p className={styles.eligibilityText}>
                    You must have held that wealth for one full Islamic lunar year.
                  </p>
                </div>
                <div className={styles.eligibilityCard}>
                  <div className={styles.eligibilityNumber}>3</div>
                  <h3 className={styles.eligibilityTitle}>Full Ownership</h3>
                  <p className={styles.eligibilityText}>
                    You must have absolute ownership and possession of the assets.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Zakatable vs Non-Zakatable */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Standard Assets (2.5%)</h2>
              <div className={styles.assetsGrid}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Include ✅</h3>
                  <p className={styles.cardText}>
                    Cash, Gold & Silver, <strong>Cryptocurrency</strong>, Shares/Stocks, Money owed to you, <strong>Provident Funds (PF)</strong>, and Business Inventory.
                  </p>
                </div>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Exclude ❌</h3>
                  <p className={styles.cardText}>
                    Your primary home, personal car, clothing, furniture, and precious stones like diamonds or pearls (unless held for trade).
                  </p>
                </div>
              </div>
              <blockquote className={styles.debtNote}>
                <strong>Important Note on Debts:</strong> Deduct immediate liabilities and <strong>up to 12 months</strong> of long-term debt installments (e.g., Home Loan EMIs) from your assets before calculating.
              </blockquote>
            </div>

            {/* IN-DEPTH SPECIAL CATEGORIES */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Special Asset Categories</h2>
              
              {/* 1. AGRICULTURE PRODUCE (USHR) */}
              <div className={styles.specialCategory}>
                <h3 className={styles.categoryTitle}>
                  <span className={styles.categoryIcon}>🌾</span> 1. Agriculture Produce (Ushr)
                </h3>
                <p className={styles.text}>
                  Zakat on crops is called <strong>Ushr (Tenth)</strong>. Unlike other assets, there is <strong>no one-year waiting period (Hawl)</strong>; you pay it on the day of harvest.
                </p>
                <div className={styles.tableWrapper}>
                  <table className={styles.zakatTable}>
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
                        <td className={styles.rateCell}>10%</td>
                        <td rowSpan="2">653 kg of Produce</td>
                      </tr>
                      <tr>
                        <td>Artificial (Irrigation/Pumps)</td>
                        <td className={styles.rateCell}>5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={styles.actionNote}>
                  <strong>What to do:</strong> Calculate your total harvest weight. If it exceeds 653kg, set aside either 5% or 10% of the crop immediately after harvest.
                </div>
              </div>

              {/* 2. LIVESTOCK (AN'AM) */}
              <div className={styles.specialCategory}>
                <h3 className={styles.categoryTitle}>
                  <span className={styles.categoryIcon}>🐑</span> 2. Livestock (An'am)
                </h3>
                <p className={styles.text}>
                  This applies only to animals that graze on open pasture for most of the year. Animals kept for personal meat or as "pets" are exempt.
                </p>
                <div className={styles.livestockGrid}>
                  <div className={styles.livestockCard}>
                    <strong>Sheep & Goats</strong>
                    <div className={styles.minAmount}>Min: 40 Animals</div>
                    <div className={styles.rateInfo}>1 animal per 40</div>
                  </div>
                  <div className={styles.livestockCard}>
                    <strong>Cows & Buffalo</strong>
                    <div className={styles.minAmount}>Min: 30 Animals</div>
                    <div className={styles.rateInfo}>1 yearling calf per 30</div>
                  </div>
                  <div className={styles.livestockCard}>
                    <strong>Camels</strong>
                    <div className={styles.minAmount}>Min: 5 Animals</div>
                    <div className={styles.rateInfo}>Scaled rate applies</div>
                  </div>
                </div>
                <blockquote className={styles.debtNote}>
                  <strong>What to do:</strong> If you are a commercial farmer where animals are stall-fed (not grazing), treat the business as "Trade Stock" and pay <strong>2.5% on the value</strong> of the animals.
                </blockquote>
              </div>

              {/* 3. BURIED TREASURE (RIKAZ) */}
              <div className={styles.specialCategory}>
                <h3 className={styles.categoryTitle}>
                  <span className={styles.categoryIcon}>💎</span> 3. Buried Treasure & Mines (Rikaz)
                </h3>
                <p className={styles.text}>
                  Refers to natural resources (oil/gold) or ancient treasure found on your land.
                </p>
                <div className={styles.listItem}><strong>The Rate:</strong> 20% (One-fifth or Khums) due immediately.</div>
                <div className={styles.listItem}><strong>The Rule:</strong> No Nisaab and no one-year waiting period apply because this wealth required little labor.</div>
                <blockquote className={styles.debtNote}>
                  <strong>What to do:</strong> If you discover treasure or a mineral deposit, 20% of its value is due immediately.
                </blockquote>
              </div>
            </div>

            {/* Section: Recipients */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Who Receives Zakat?</h2>
              <p className={styles.text}>
                Zakat must be distributed to the 8 categories defined in the Quran (9:60), primarily the poor, the needy, those in debt, and wayfarers.
              </p>
              <div className={styles.assetsGrid}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Eligible Relatives</h3>
                  <p className={styles.cardText}>Giving to a poor brother, sister, uncle, or aunt is highly encouraged and carries double reward.</p>
                </div>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Ineligible Relatives</h3>
                  <p className={styles.cardText}>You <strong>cannot</strong> give Zakat to your spouse, parents, grandparents, or children.</p>
                </div>
              </div>
            </div>

            <div className={styles.methodologyNote}>
              <p>
                <strong>Note on Methodology:</strong> Information and reference for this tool are guided by 'Zakat Simplified by Abdul Rahim.' Market rates for Gold and Silver are updated via real-time 2026 spot prices.
              </p>
            </div>

            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>Ready to Calculate Your Zakat?</h2>
              <Link href="/calculator" className={styles.ctaButton}>
                Calculate Now →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;