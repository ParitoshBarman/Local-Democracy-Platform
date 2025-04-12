import { Provider } from "./components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import store from './redux/store.js'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider store={store}>
    <Provider>
      <App />
    </Provider>
    </ReduxProvider>
  </StrictMode>,
)
