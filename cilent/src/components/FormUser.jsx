import React, { useState, useEffect } from "react";
import axios from "axios";
import { create } from "../functions/user";

const FormUser = () => {
  //JavaScript
  const [data, setData] = useState([]);
  const [form, setForm] = useState([]);
  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = async () => {
    await axios
      .get(import.meta.env.VITE_API_URL + "/user")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    //code
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    //code
    e.preventDefault(); //ห้ามรีเฟส
    create(form)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      FormUser
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          placeholder="name"
        />{" "}
        <br />
        <input
          type="text"
          name="age"
          placeholder="age"
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        <input
          type="text"
          name="id_number"
          placeholder="ID"
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone"
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        <input
          type="text"
          name="role"
          placeholder="Role"
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FormUser;
