import { HashRouter, Route, Routes } from "react-router-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";
import MainScreen from "./screen/mainScreen/MainScreen";
import Home from "./screen/homeScreen/Home";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const App = () => {
  return (
    <>
      <style>
        {`
         *{
          -webkit-user-select: none; 
         }
        `}
      </style>
      <ChakraProvider>
        <Provider store={store}>
          <Box height="100vh" margin="0 auto" overflowY="hidden">
            <HashRouter>
              <Routes>
                <Route path="/homeWindow" element={<MainScreen />} />
                <Route path="/home" element={<Home />} />
              </Routes>
            </HashRouter>
          </Box>
        </Provider>
      </ChakraProvider>
    </>
  );
};

export default App;
