import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { read } from "../../functions/user";
import { update } from "../../functions/user";

const FormEditUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    age: "",
    id_number: "",
    phone_number: "",
    role: "",
  });

  useEffect(() => {
    loadData(params.id);
  }, []);

  const loadData = async (id) => {
    read(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    //code
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    //code
    e.preventDefault(); //ห้ามรีเฟส
    console.log(data);
    update(params.id, data)
      .then((res) => {
        console.log(res);
        navigate("/data");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      FormEditUser
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          placeholder="name"
          value={data.name}
        />{" "}
        <br />
        <input
          type="text"
          name="age"
          placeholder="age"
          value={data.age}
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        <input
          type="text"
          name="id_number"
          placeholder="ID"
          value={data.id_number}
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone"
          value={data.phone_number}
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={data.role}
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FormEditUser;
