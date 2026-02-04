import Head from 'next/head';
import { useRouter } from 'next/router';

const Meta = () => {
  const router = useRouter();
  
  const rawPath = router.asPath.split('?')[0];
  const path = rawPath === '/' ? '/' : rawPath.replace(/\/$/, "");

  let title, description, keywords;

  if (path === '/') {
    title = 'Universal Zakat Calculator 2026 | Accurate & Secure';
    description = 'Calculate your Zakat for 2026 using real-time Gold and Silver rates. Accurate, private, and Shariah-compliant calculator for all assets.';
    keywords = 'zakat calculator 2026, calculate zakat online, nisab gold 2026, zakat on wealth, islamic charity calculator';
  } 
  else if (path === '/about') {
    title = 'Zakat Guide: Rules, Eligibility & Nisaab 2026';
    description = 'The complete 2026 guide to Zakat. Learn about Nisaab thresholds, Ushr on agriculture, livestock rules, and who is eligible to receive Zakat.';
    keywords = 'zakat rules, how is zakat calculated, what is nisaab, agricultural zakat ushr, zakat eligibility guide';
  } 
  else if (path === '/calculator') {
    title = 'Zakat Calculator - Step-by-Step Wealth Calculation';
    description = 'Interactive Zakat wizard. Calculate Zakat on Gold, Silver, Cash, Crypto, and Trade Stocks with automatic 2026 market price updates.';
    keywords = 'calculate zakat on gold, silver zakat calculator, zakat on cryptocurrency, business zakat calculator, zakat wizard';
  } 
  else if (path === '/faq') {
    title = 'Zakat FAQs: Common Questions & Shariah Answers';
    description = 'Find answers to common questions about Zakat on debt, 401k, PF, jewelry, and modern investments. Expert Shariah guidance.';
    keywords = 'zakat questions, zakat on jewelry faq, zakat on debt emi, is zakat due on 401k, zakat common doubts';
  } 
  else if (path === '/articles') {
    title = 'Islamic Wealth & Zakat Articles | 2026 Insights';
    description = 'Read the latest articles on Islamic finance, the impact of Zakat on society, and deep dives into contemporary Zakat issues.';
    keywords = 'islamic finance articles, zakat blog, importance of zakat, purification of wealth articles, zakat in 2026';
  } 
  else {
    title = 'Universal Zakat Calculator 2026';
    description = 'Fulfill your third pillar of Islam with our precise and secure Zakat calculation tools.';
    keywords = 'zakat, islam, charity, wealth purification';
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Search Engine Optimization */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={`https://zakat-calculator-psi.vercel.app/${path}`} />

      {/* Social Media (Open Graph) */}
      <meta property="og:site_name" content="Universal Zakat Calculator" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://zakat-calculator-psi.vercel.app/${path}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};

export default Meta;