import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { CardContainer } from '../components/CardContainer';
import { Carousel } from '../components/Carousel/Carousel';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Heart Ring</h1>
      <Carousel />
      <CardContainer />
    </div>
  );
};

export default Home;
