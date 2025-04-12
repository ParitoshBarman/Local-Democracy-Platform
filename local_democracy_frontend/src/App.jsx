import { Button } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import MainLayout from "./MainLayout"
import NotificationComponent from "./components/NotificationComponent"


function App() {

  return (
    <>
      <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
    <NotificationComponent/>
    </>
  )
}

export default App
