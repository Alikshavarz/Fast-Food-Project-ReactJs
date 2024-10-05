import { useEffect, useState } from "react";
import "./App.css";
import CategoryList from "./CategoryList/categoryList";
import Header from "./Header/header";
import axios from "./axios";
import Loading from "./Loading/loading";
import FastFoodList from "./FastFoodList/fastFoodList";
import SearchBar from "./SearchBar/searchBar";
import NotFound from "./assets/images/404.png"

function App() {
  const [loading, setLoading] = useState(false);
  const [fastFoodItems, setFastFood] = useState([]);

  const fetchData = async (categoryId = null) => {
    setLoading(true);
    const response = await axios.get(
      `/FastFood/list/${categoryId ? "?categoryId=" + categoryId : ""}`
    );

    setLoading(false);

    setFastFood(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterItems = (categoryId) => {
    fetchData(categoryId);
  };

  const SearchItems = async (term) => {
    setLoading(true);
    const response = await axios.get(
      `FastFood/search/${term ? "?term=" + term : ""}`
    );
    setLoading(false);
    setFastFood(response.data);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading theme="dark" />;
    }

    if(fastFoodItems.length === 0){
      return(
        <>
          <div className="alert alert-warning text-center">
            برای کلید واژه فوق هیچ آیتمی یافت نشد
          </div>
          <img className="mx-auto mt-5 d-block fade-in-horiz" src={NotFound}/>
        </>
      )
    }

    return <FastFoodList fastFoodItems={fastFoodItems} />;
  };

  return (
    <div className="wrapper bg-faded-dark">
      <Header></Header>
      <CategoryList filterItems={filterItems}>
        <SearchBar SearchItems={SearchItems}/>
      </CategoryList>
      <div className="container mt-4">{renderContent()}</div>
    </div>
  );
}

export default App;
