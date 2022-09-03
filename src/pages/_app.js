import { Provider } from 'react-redux'
import { store } from '../redux/store'
import '../styles/main.css'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

function MyApp({ Component, pageProps }) {
    const persistor = persistStore(store)
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    )
}

export default MyApp
