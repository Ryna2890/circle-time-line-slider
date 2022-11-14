import Head from "next/head";
import styles from "../styles/Home.module.css";
import TimeLine from "../components/timeLine/timeLine";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <TimeLine />
    </div>
  );
}
