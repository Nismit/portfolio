import { Provider } from 'react-redux';
import { useStore } from '../helpers/store';
import { useRouter } from 'next/router';
import { PageTransition } from 'next-page-transitions';
import Header from '../components/Header';
import MainVisual from '../components/MainVisual';
import GlobalStyle from '../components/GlobalStyle';

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <GlobalStyle />
            <Header />
            <MainVisual />
            <div className="page">
                <PageTransition timeout={1600} classNames="page-transition">
                    <Component {...pageProps} key={router.pathname} />
                </PageTransition>
            </div>
        </Provider>
    )
}
