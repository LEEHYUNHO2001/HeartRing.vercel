import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useRouter } from 'next/router';
import { ROUTES } from '../constants';

import Layout from '../components/layout/AppHeader';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [title, setTitle] = useState('');
  const pathName = useRouter().pathname;

  useEffect(() => {
    ROUTES.map((route) => {
      if (route.PATH === pathName) {
        setTitle(` - ${route.LABEL}`);
      }
    });
  });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>HeartRing{title}</title>
        </Helmet>
      </HelmetProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
