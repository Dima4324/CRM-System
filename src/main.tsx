import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
  {/* <StrictMode> */}
    <App />
  {/* </StrictMode> */}
  </Provider>
)
