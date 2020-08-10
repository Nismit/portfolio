import Head from 'next/head';

const ComponentHead = (props) => {
    return (
        <div>
            <Head>
                <title>{props.headTitle} | Michinobu Nishimoto</title>
            </Head>
        </div>
    );
}

export default ComponentHead;
