import Head from 'next/head';

const ComponentHead = (props) => {
    return (
        <Head>
            <title>{props.headTitle} | Michinobu Nishimoto</title>
        </Head>
    );
}

export default ComponentHead;
