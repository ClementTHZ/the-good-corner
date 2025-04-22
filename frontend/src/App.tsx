import { Route, Routes } from "react-router";
import { RecentsAds } from "./components/RecentsAds";
import "./App.css";
import { Layout } from "./pages/Layout";
import { About } from "./pages/About";
import { AdDetailsPage } from "./pages/AdDetailsPage";
import { NewAdForm } from "./pages/NewAdForm";
import { NewCategoryForm } from "./pages/NewCategoryForm";
import { NewTagForm } from "./pages/NewTagForm";
import { SearchPage } from "./pages/SearchPage";
import { UpdateAdForm } from "./pages/UpdateAdForm";

export const App = function () {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentsAds />} />
        <Route path="about" element={<About />} />
        <Route path="ad/new" element={<NewAdForm />} />
        <Route path="category/new" element={<NewCategoryForm />} />
        <Route path="ad/:id" element={<AdDetailsPage />} />
        <Route path="tag/new" element={<NewTagForm />} />
        <Route path="search/:keyword" element={<SearchPage />} />
        <Route path="ad/:id/edit" element={<UpdateAdForm />} />
      </Route>
    </Routes>
  );
};
