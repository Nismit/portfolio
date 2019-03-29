import Head from 'next/head';

export default (props) => {
  return (
    <div>
      <Head>
        <title>{props.headTitle} | Michinobu Nishimoto</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></link>
        <style>{`body { font-family: 'Open Sans', sans-serif; }`}</style>
      </Head>
    </div>
  );
}
