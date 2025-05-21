import 'normalize.css'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import './system-ui/styles/index.css'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<App />)

