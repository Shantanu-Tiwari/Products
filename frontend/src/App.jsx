import React from 'react';
import {Box} from "@chakra-ui/react";
import HomePage from "@/pages/HomePage.jsx";
import CreatePage from "@/pages/CreatePage.jsx";
import Navbar from "@/parts/Navbar.jsx";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <Box minH={"100vh"}>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/create" element={<CreatePage/>}/>
            </Routes>
        </Box>
    );
}

export default App;