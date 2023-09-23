import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from './routes/routes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider } from './context/LoadingContext';
import Error_404 from './components/pages/Error_404';


function App() {

  return (
    <LoadingProvider>

      <BrowserRouter>
        <ToastContainer />
        <Routes>
                
          {/* All Routes */}
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Error 404 */}
          <Route path="*" element={<Error_404 />} />

        </Routes>
      </BrowserRouter>

    </LoadingProvider>
  )
}

export default App
