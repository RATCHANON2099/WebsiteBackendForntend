import React, { useState, useEffect } from "react";
import axios from "axios";

const FormUser = () => {
  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = async () => {
    await axios
      .get("http://localhost:5000/api/user")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return <div>FormUser</div>;
};

export default FormUser;
