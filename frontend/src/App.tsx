import { BrowserRouter, Routes, Route } from "react-router-dom";
import Review from "./pages/Review";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
