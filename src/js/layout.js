import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import injectContext from "./store/appContext";

import Contactos from "./pages/contacts.jsx";
import AddContact from "./pages/addContact.jsx";

const Layout = () => {
	return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contactos />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/4geeks" element={<h1>Estoy en la vista de 4Geeks</h1>} />
          <Route element={<h1>Not found! 404</h1>} path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
