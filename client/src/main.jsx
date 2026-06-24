import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { ActiveFileTabProvider } from './context/ActiveFileTabContext.jsx'
import { FileMenuProvider } from './context/FileContextMenuContext.jsx'
import { FolderMenuProvider } from './context/FolderContextMenuContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ActiveFileTabProvider>
      <FolderMenuProvider>
        <FileMenuProvider>
          <App />
        </FileMenuProvider>
      </FolderMenuProvider>
    </ActiveFileTabProvider>
  </Provider>,
)
