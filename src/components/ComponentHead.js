import Head from 'next/head';

export default (props) => {
  return (
    <div>
      <Head>
        <title>{props.headTitle} | Michinobu Nishimoto</title>
      </Head>
    </div>
  );
}
