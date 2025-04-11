import React, { useState, useEffect } from "react";
import axios from "axios";
import { remove } from "../functions/user";
import { getdata } from "../functions/user";
import { Link } from "react-router-dom";

const Data = () => {
  //JavaScript
  const [data, setData] = useState([]);
  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = async () => {
    getdata()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  console.log(data);

  const handleRemove = async (id) => {
    remove(id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Phone</th>
            <th scope="col">ID</th>
            <th scope="col">Role</th>
            <th scope="col">action</th>
            <th scope="col">edit</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.id_number}</td>
                  <td>{item.role}</td>
                  <td onClick={() => handleRemove(item.id)}>delete</td>
                  <td>
                    <Link to={`/edit/${item.id}`}>edit</Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
