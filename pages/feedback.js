import Head from 'next/head';
import Layout from '../src/components/Layout';
import Feedback from '../src/components/Feedback';
import Meta from '../src/components/Meta';

const FAQ = () => {
  return (
    <Layout>
      <Meta />
      <Feedback />
    </Layout>
  );
};

export default FAQ;