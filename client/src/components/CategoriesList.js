import React, { useState, useEffect } from "react";
import CategoryService from "@/services/CategoryService";
import { Link } from "react-router-dom";
import { AddCategory } from "./AddCategory";

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    retrieveCategories();
  }, []);

  const retrieveCategories = () => {
    CategoryService.getAll()
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };

  const refreshList = () => {
    retrieveCategories();
    setCurrentCategory(null);
    setCurrentIndex(-1);
  };

  const setActiveCategory = (category, index) => {
    setCurrentIndex(index);
    setCurrentCategory(category);
  };

  const removeAllCategories = () => {
    CategoryService.removeAll()
      .then((res) => {
        console.log(res.data);
        refreshList();
      })
      .catch((e) => console.log(e));
  };

  const findByName = (id) => {
    CategoryService.findByName(searchName)
      .then((res) => {
        setCategories(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="list row bg-slate-700 px-12 py-5 rounded-2xl">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Name"
            value={searchName}
            onChange={onChangeSearchName}
          />

          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col md-6">
        <h4>Categories List</h4>

        <ul className="list-group">
          {categories &&
            categories.map((category, index) => {
              return (
                <li
                  key={index}
                  className={`list-group-items ${
                    index === currentIndex && "active"
                  }`}
                  onClick={() => setActiveCategory(category, index)}
                  style={{ cursor: "pointer" }}
                >
                  {category.name}
                </li>
              );
            })}
        </ul>
        <div className="btns">
          {categories.id && (
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={removeAllCategories}
            >
              Remove All
            </button>
          )}
          <button
            className="rounded-full p-5"
            onClick={() => setShowAdd(!showAdd)}
          >
            Add
          </button>
        </div>
      </div>

      <div className="col md-6">
        {currentCategory ? (
          <div>
            <h4>Category</h4>
            <div className="">
              <label>
                <strong>Name: </strong>
              </label>
              {currentCategory.name}
            </div>
            <div>
              <label>
                <strong>Url:</strong>
              </label>
              {currentCategory.url}
            </div>

            <Link
              className="badge badge-warning text-black"
              to={`/categories/${currentCategory.id}`}
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Category...</p>
          </div>
        )}
      </div>

      {showAdd && (
        <div>
          <AddCategory />
        </div>
      )}
    </div>
  );
};
