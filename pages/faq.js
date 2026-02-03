import Head from 'next/head';
import Layout from '../src/components/Layout';
import FAQSection from '../src/components/FAQSection';

const FAQ = () => {
  return (
    <Layout>
      <Head>
        <title>FAQ - Frequently Asked Questions About Zakat</title>
        <meta name="description" content="Find answers to common questions about Zakat calculation and eligibility" />
      </Head>

      <FAQSection />
    </Layout>
  );
};

export default FAQ;