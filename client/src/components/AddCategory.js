import React, { useState } from "react";
import CategoryService from "@/services/CategoryService";

export const AddCategory = () => {
  const initialCategoryState = {
    name: "",
    shortName: "",
    description: "",
  };

  const [category, setCategory] = useState(initialCategoryState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const saveCategory = () => {
    let data = {
      name: category.name,
      shortName: category.shortName,
      description: category.description,
    };

    CategoryService.create(data)
      .then((res) => {
        setCategory(data);
        setSubmitted(true);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  const newCategory = () => {
    setCategory(initialCategoryState);
    setSubmitted(false);
  };
  return (
    <div>
      {submitted ? (
        <div className="text-center">
          <h4>Submitted Successfully</h4>
          <button className="bg-green-400" onClick={newCategory}>
            Add Category
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={category.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Short Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="shortName"
                  type="text"
                  name="shortName"
                  value={category.shortName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="url"
                >
                  Description
                </label>
                <textarea
                  rows="4"
                  cols="50"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  type="text"
                  name="description"
                  value={category.description}
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={saveCategory}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
