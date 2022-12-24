import { HashRouter, Route, Routes } from "react-router-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Home from "./screen/homeScreen/Home";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ReportPotm from "./screen/components/ReportPotm";
import LogScreen from "./screen/logScreen/LogScreen";
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
            
                <Route path="/home" element={<Home />} />
                <Route path="/potm" element={<ReportPotm />} />
                <Route path="/log" element={<LogScreen />} />
              </Routes>
            </HashRouter>
          </Box>
        </Provider>
      </ChakraProvider>
    </>
  );
};

export default App;
