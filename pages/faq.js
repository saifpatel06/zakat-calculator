import Head from 'next/head';
import Layout from '../src/components/Layout';
import FAQSection from '../src/components/FAQSection';
import Meta from '../src/components/Meta';

const FAQ = () => {
  return (
    <Layout>
      <Meta />
      <FAQSection />
    </Layout>
  );
};

export default FAQ;