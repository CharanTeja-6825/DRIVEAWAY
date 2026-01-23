import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './shared/hooks/AuthProvider.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import theme from './theme/theme.js'

const emotionCache = createCache({
  key: 'mui',
  prepend: true,
})

createRoot(document.getElementById('root')).render(
  <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <AuthContext>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LocalizationProvider>
      </AuthContext>
    </ThemeProvider>
  </CacheProvider>,
)
