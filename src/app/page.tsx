import { Metadata } from 'next';
import styles from "./page.module.css";
import IndexFooter from './index/footer';
import IndexImageCard from './index/image-cards';
import FeaturedContainer from './index/featured-containers';

export const generateMetadata = (): Metadata => {
  return {
    title: "Ukan 29 - Whatever it takes, U can wear the best outfit here",
    description: "Ukan Wears hoists the e-platform for our fashion places across North and South America, Central Europe and West Africa",
  };
};

export default function Home() {
  return (
    <div className={styles.page}>
      <IndexImageCard />
      <main className={styles.main}>
        <FeaturedContainer id={1} />
        <FeaturedContainer id={2} />
      </main>
      <footer className={styles.footer}>
        <IndexFooter />
      </footer>
    </div>
  );
}
