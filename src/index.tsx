import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import ThemeContextProvider from './context/ThemeContext'
import { persistor, store } from './reducer'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
// import i18n (needs to be bundled ;))
import './i18n'

function ErrorFallback(props: { error: Error; resetErrorBoundary: any }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{props?.error?.message}</pre>
      <button onClick={props?.resetErrorBoundary}>Try again</button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    {/* @ts-ignore */}
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <Provider store={store}>
        {/* @ts-ignore */}
        <PersistGate persistor={persistor}>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
