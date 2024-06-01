
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import MainRoutes from './routes/MainRoutes'

function App() {


  return (
    <>
    {/* Common header for all pages  */}
      <Header 
          color='light' 
          light={true} 
          expand='md' 
          container='md' 
      />

    {/* router based rendering */}
      <MainRoutes/>
    {/* Common footer for all pages */}
      <Footer/>
    </>
  )
}

export default App
