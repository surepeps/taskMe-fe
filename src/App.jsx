import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from './routes/routes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider } from './context/LoadingContext';
import Error_404 from './components/pages/Error_404';
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/components/LoadingSpinner";


function App() {
  const { loading } = useAuth();
  return (
    <LoadingProvider>

      <BrowserRouter>
        <ToastContainer />

        {loading ? (
            <LoadingSpinner />
          ) : (
            <Routes>
                    
              {/* All Routes */}
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}

              {/* Error 404 */}
              <Route path="*" element={<Error_404 />} />

            </Routes>
          )
        }
        
      </BrowserRouter>

    </LoadingProvider>
  )
}

export default App
