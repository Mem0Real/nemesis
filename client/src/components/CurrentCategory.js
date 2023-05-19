import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryService from "../services/CategoryService";

export const CurrentCategory = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialCategoryState = {
    name: "",
    shortName: "",
    description: "",
  };

  const [currentCategory, setCurrentCategory] = useState(initialCategoryState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) getCategory(id);
  }, [id]);

  const getCategory = (id) => {
    CategoryService.get(id)
      .then((res) => {
        setCurrentCategory(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const updateCategory = () => {
    CategoryService.update(currentCategory.id, currentCategory)
      .then((res) => {
        setMessage("Category Updated Successfully!");
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  const deleteCategory = () => {
    CategoryService.remove(currentCategory.id)
      .then((res) => {
        console.log(res.data);
        navigate("/categories");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div
        className="toast text-white bg-success"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="mx-auto">Success</strong>
          <small>Just Now</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
      <h1 className="text-center">Hi</h1>
      {currentCategory ? (
        <div className="edit-form">
          <h4>Category</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCategory.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="url">Url</label>
              <input
                type="text"
                className="form-control"
                id="url"
                name="url"
                value={currentCategory.url}
                onChange={handleInputChange}
              />
            </div>

            <button
              className="badge badge-danger mr-2 text-black"
              onClick={deleteCategory}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success text-black"
              onClick={updateCategory}
            >
              Update
            </button>
            <br />
          </form>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Category...</p>
        </div>
      )}
    </div>
  );
};
