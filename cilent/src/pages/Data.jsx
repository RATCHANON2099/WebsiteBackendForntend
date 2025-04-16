import React, { useState, useEffect } from "react";
import { Table, Button, Space, message } from "antd";
import { Link } from "react-router-dom";
import { remove } from "../functions/user";
import { getdata } from "../functions/user";

const Data = () => {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    getdata()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    remove(id)
      .then((res) => {
        message.success("User deleted successfully");
        loadData();
      })
      .catch((err) => {
        message.error("Failed to delete user");
        console.log(err);
      });
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "ID",
      dataIndex: "id_number",
      key: "id_number",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.id === userId ? (
            <Button
              danger
              onClick={() => handleRemove(record.id)}
              style={{ borderRadius: "5px", fontWeight: "bold" }}
            >
              Delete
            </Button>
          ) : (
            "-"
          )}
        </Space>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/edit/${record.id}`}>
            {record.id === userId ? (
              <Button
                type="primary"
                style={{ borderRadius: "5px", fontWeight: "bold" }}
              >
                Edit
              </Button>
            ) : (
              "-"
            )}
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px 50px" }}>
      <h2>Users Data</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

export default Data;
