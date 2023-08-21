import "./App.css";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { WrongPath } from "./pages/WrongPath";
import { WomenPage } from "./pages/WomenPage";
import { MenPage } from "./pages/MenPage";
import { ProductInfoPage } from "./pages/ProductInfoPage";
import { Favorites } from "./pages/Favorites";
import { Cart } from "./pages/Cart";

function App() {
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/men" element={<MenPage />} />
          <Route path="/women/:id" element={<ProductInfoPage />} />
          <Route path="/men/:id" element={<ProductInfoPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<WrongPath />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
