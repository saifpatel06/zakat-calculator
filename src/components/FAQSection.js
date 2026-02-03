'use client';
import { useState, useMemo } from 'react';
import styles from '../../styles/FAQSection.module.css';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      question: "What is Zakat and who must pay it?",
      answer: "Zakat is one of the Five Pillars of Islam and is a mandatory charitable contribution (2.5%). Every adult Muslim who possesses wealth above the Nisaab threshold for one full lunar year must pay it. The Nisaab is equivalent to 87.48 grams of gold (7.5 Tola) or 612.32 grams of silver (52.5 Tola)."
    },
    {
      question: "What types of wealth are subject to Zakat?",
      answer: "Zakat applies to cash, bank savings, gold, silver, business inventory (trade stock), stocks, mutual funds, and money owed to you. Modern assets like the premiums paid into LIC/Insurance or your portion of a Provident Fund (PF) are also zakatable. Personal items like your primary home, car, and diamonds are exempt."
    },
    {
      question: "Is it mandatory to pay Zakat specifically in Ramadan?",
      answer: "No. Zakat is due whenever your wealth has completed one full lunar year (Hawl) above the Nisaab threshold. Many Muslims choose to pay in Ramadan to seek multiplied rewards and for ease of memory, but if your Zakat anniversary falls before Ramadan, you should pay it on time rather than delaying it."
    },
    {
      question: "Is Zakat due on my wife's wedding jewelry (Mahr)?",
      answer: "Yes. Once the husband hands over the jewelry or the ownership is transferred to the wife, it becomes her personal asset. If its weight exceeds the Nisaab of gold/silver, she is responsible for paying Zakat on it annually. If she has no income, the husband can pay on her behalf as a gift, but the intention must be for her Zakat."
    },
    {
      question: "Do I pay Zakat on an empty plot of land I purchased?",
      answer: "It depends on your intention at the time of purchase. If you bought the land as a long-term investment to resell for profit, you must pay 2.5% on its current market value every year. If you bought it to build your own house or for personal use, no Zakat is due on the land value."
    },
    {
      question: "How do I calculate Zakat on my Retirement/Pension Fund (401k/EPF)?",
      answer: "You only pay Zakat on the portion of the fund that you have the right to withdraw. If the money is locked until retirement and you cannot access it, no Zakat is due yet. Once it becomes accessible, you pay Zakat on the total 'receivable' amount (the amount you would get if you closed the account today, minus any mandatory taxes/penalties)."
    },
    {
      question: "Is Zakat due on Rental Properties?",
      answer: "Zakat is not due on the market value of the building itself. However, you must include any net rental income (remaining profit) in your cash savings when calculating your Zakat on your anniversary date."
    },
    {
      question: "Is Zakat due on Digital Assets like NFTs or Utility Tokens?",
      answer: "Yes. Digital assets are treated like any other investment. If you hold NFTs or tokens with the intention of selling them for a higher price, they are treated as 'Trade Stock.' You must value them at their current market price (in ETH/SOL or USD) on your Zakat anniversary and pay 2.5%."
    },
    {
      question: "What should I do if my wealth fluctuates during the year?",
      answer: "As long as your wealth stays above the Nisaab threshold throughout the year, you don't need to track every increase or decrease. You simply calculate Zakat on the total qualifying wealth you possess on your Zakat anniversary date, even if you received some of that money just a few days prior."
    },
    {
      question: "How do I value my business 'Trade Stock'?",
      answer: "Trade stock—including raw materials, work-in-progress, and finished goods—must be valued at its current market selling price on your Zakat anniversary, not the original cost price you paid to buy it."
    },
    {
      question: "I own a factory/showroom. Do I pay Zakat on the building and machinery?",
      answer: "No. Fixed assets used to run your business—such as the factory building, showroom, machinery, tools, office furniture, and delivery vehicles—are exempt. You only pay Zakat on the 'circulating' assets like cash in business accounts and trade stock."
    },
    {
      question: "How do I calculate Zakat on my stock market shares and mutual funds?",
      answer: "If you are a long-term investor, you pay Zakat on the 'Zakatable Assets' portion of the company (Cash + Stock). However, if you are a short-term trader, the entire current market value of your portfolio is zakatable at 2.5%."
    },
    {
      question: "Do I pay the same rate for 22k and 24k gold?",
      answer: "No, Zakat is calculated on the weight of pure gold. For 22k gold, the value is 22/24 of the 24k market rate. For 18k, it is 18/24. You must ignore 'making charges' or design costs and value only the metal weight at current market prices."
    },
    {
      question: "How do I calculate Zakat if I am a partner in a business?",
      answer: "You must identify the firm’s total Zakatable assets (Cash + Stock) and deduct the firm’s immediate liabilities (Creditors). You then pay Zakat on your proportionate share of that net value. If your partner is a non-Muslim, Zakat is only due on your portion."
    },
    {
      question: "Can I deduct my debts before calculating Zakat?",
      answer: "Yes, you can deduct immediate debts (due within the lunar year) from your total zakatable wealth. This includes business creditors, personal loans, and the non-interest portion of EMI payments due. Long-term debt not due within the year is generally not deducted."
    },
    {
      question: "If I have a long-term loan (like a Home Loan), do I deduct the whole amount?",
      answer: "No. You should not deduct the entire outstanding balance of a long-term loan. You are only permitted to deduct the immediate liabilities—specifically the non-interest portion of the installments (EMIs) that are due for the current month or the immediate short-term."
    },
    {
      question: "How do I calculate Zakat on LIC, Health Insurance, or other policies?",
      answer: "For life insurance (LIC) or endowment policies, the total premiums you have paid into the policy are considered your 'stored' wealth and are zakatable. For general insurance like Health or Car insurance, these are usually not zakatable unless there is a 'surrender value'."
    },
    {
      question: "Who are the eligible recipients of Zakat?",
      answer: "The Quran specifies eight categories, primarily the poor (Faqeer) and the needy (Miskin). Note that Zakat cannot be given to non-Muslims or to your direct dependents like parents, children, or your spouse."
    },
    {
      question: "Can I give Zakat to my family members?",
      answer: "You cannot give Zakat to those you are already obligated to support (spouse, parents, children). However, giving Zakat to poor siblings, aunts, uncles, or cousins is highly encouraged."
    },
    {
      question: "Is it better to give small amounts to many people or a large amount to one?",
      answer: "The 'Effective Zakat' model suggests it is often better to provide a 'Livelihood' (e.g., tools or a machine) to help one person become self-sufficient."
    },
    {
      question: "What should I do with Interest (Riba) earned in my bank account?",
      answer: "Interest is not zakatable; it is impure. You must remove it from your wealth and give it to charity without expecting any spiritual reward (Thawab)."
    },
    {
      question: "Is Zakat due on decorative items or jewelry other than Gold and Silver?",
      answer: "No. Zakat is only due on Gold and Silver. Precious stones like Diamonds, Pearls, and Platinum are not zakatable unless they are items held for trade."
    },
    {
      question: "Do I pay Zakat on Platinum, Copper, or other metals?",
      answer: "Zakat is only mandatory on Gold and Silver as 'Currency Metals.' However, if you own Platinum, Copper, or Iron as **business inventory** for trading, you must pay 2.5% on their total market value. If you own them as personal jewelry or household items, no Zakat is due."
    },
    {
      question: "How do I calculate Zakat on Diamonds and Precious Stones if I am a trader?",
      answer: "For a jeweler or trader, Diamonds, Rubies, and Pearls are treated as **Trade Stock**. You must calculate the total market value of your entire stock on your Zakat anniversary and pay 2.5% of that value. For personal use, these stones remain exempt regardless of their value."
    },
    {
      question: "Can I pay Zakat in the form of goods instead of cash?",
      answer: "Yes, you can pay Zakat in the form of cash, cheques, or actual stock items. However, the items must be useful to the recipient and valued at current market rates."
    },
    {
      question: "Do I pay Zakat on animals I keep for my own food or as pets?",
      answer: "No. Livestock Zakat only applies to Sa’imah (pastured) animals kept for milk or breeding. Animals used for labor or personal consumption are exempt."
    },
    {
      question: "If I have 35 sheep, do I pay a percentage of their value?",
      answer: "No. For sheep and goats, the threshold is 40 animals. If you have 39 or fewer, no Zakat is due unless you are a commercial dealer."
    },
    {
      question: "Why is the Agriculture (Ushr) rate different (5% vs 10%)?",
      answer: "If land is watered naturally (rain), the rate is 10%. If you pay for irrigation (pumps/wells), the rate is reduced to 5% to account for your costs."
    },
    {
      question: "What do I do if I find 'Buried Treasure' (Rikaz) on my land?",
      answer: "You must pay 20% (one-fifth) of its value immediately to the poor. There is no one-year waiting period for Rikaz."
    },
    {
      question: "Can I use bank interest to pay my Zakat?",
      answer: "Absolutely not. Interest is 'unlawful wealth.' You must calculate Zakat from your Halal savings and dispose of interest separately."
    },
    {
      question: "If my herd of 30 cows has a new calf just before my Zakat date, do I count it?",
      answer: "Yes. Offspring are counted toward the total number as long as the original herd met the Nisaab at the start of the year."
    }
  ];

  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return faqData;

    const term = searchTerm.toLowerCase();
    
    return faqData
      .filter(faq => 
        faq.question.toLowerCase().includes(term) || 
        faq.answer.toLowerCase().includes(term)
      )
      .sort((a, b) => {
        // Priority 1: Search term is in the Question
        const aInTitle = a.question.toLowerCase().includes(term);
        const bInTitle = b.question.toLowerCase().includes(term);
        
        if (aInTitle && !bInTitle) return -1;
        if (!aInTitle && bInTitle) return 1;
        return 0;
      });
  }, [searchTerm]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Find answers to common questions about Zakat calculation and eligibility
          </p>
          
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search (e.g. 'Diamond', 'Gold', 'Business')..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActiveIndex(null); 
              }}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
        </div>

        <div className={styles.faqList}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              // Highlight keywords in the question text (optional but helpful)
              return (
                <div 
                  key={index} 
                  className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                >
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={activeIndex === index}
                  >
                    <span className={styles.questionText}>{faq.question}</span>
                    <span className={styles.icon}>
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  
                  <div 
                    className={styles.faqAnswer}
                    style={{
                      maxHeight: activeIndex === index ? '1000px' : '0',
                      opacity: activeIndex === index ? '1' : '0',
                      paddingBottom: activeIndex === index ? '1.5rem' : '0'
                    }}
                  >
                    <p className={styles.answerText}>{faq.answer}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noResults}>
              <p>No results found for "<strong>{searchTerm}</strong>".</p>
              <button onClick={() => setSearchTerm('')} className={styles.clearBtn}>Clear Search</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;