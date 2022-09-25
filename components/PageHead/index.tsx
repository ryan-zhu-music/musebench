import Head from "next/head";

const PageHead = () => {
  return (
    <Head>
      <title>MuseBench</title>
      <meta name="description" content="Train your ear with music!" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/styles.css" />
    </Head>
  );
};

export default PageHead;
