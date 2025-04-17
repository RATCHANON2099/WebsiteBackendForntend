// src/pages/Data.jsx
import React, { useState, useEffect } from "react";
import { Table, Button, Space, message } from "antd";
import { Link } from "react-router-dom";
import { remove, getdata } from "../functions/user";
import deleteEffect from "../components/DeleteEffect";
import { useNavigate } from "react-router-dom";

const Data = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const [userHasInfo, setUserHasInfo] = useState(false); // ตรวจสอบว่าผู้ใช้กรอกข้อมูลแล้วหรือยัง

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    getdata()
      .then((res) => {
        const allData = res.data;

        // หาข้อมูลของ user ที่ login อยู่
        const currentUserData = allData.find((item) => item.id === userId);

        // ตรวจสอบว่า user มีข้อมูลเพิ่มเติมหรือยัง เช่น age, เบอร์, เลขบัตร
        const hasInfo =
          currentUserData?.age &&
          currentUserData?.phone_number &&
          currentUserData?.id_number;
        setUserHasInfo(!!hasInfo); // แปลงให้เป็น boolean แล้วเซตค่า

        // กรองข้อมูล: ถ้ายังไม่มีข้อมูล → ไม่แสดงของ user นี้ในตาราง
        const filteredData = allData.filter(
          (item) => item.id !== userId || (item.id === userId && hasInfo)
        );

        setData(filteredData); // เซตข้อมูลที่จะแสดงในตาราง
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    const confirmed = await deleteEffect(); // รอการยืนยันก่อนลบ
    if (confirmed) {
      remove(id)
        .then(() => {
          message.success("User deleted successfully");
          loadData(); // โหลดข้อมูลใหม่หลังลบ
          navigate("/"); //พาไปหน้า Home หลังลบเสร็จ
        })
        .catch((err) => {
          message.error("Failed to delete user");
          console.error(err);
        });
    }
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
          {record.id === userId && userHasInfo ? (
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
          {record.id === userId && userHasInfo ? (
            <Link to={`/edit/${record.id}`}>
              <Button
                type="primary"
                style={{ borderRadius: "5px", fontWeight: "bold" }}
              >
                Edit
              </Button>
            </Link>
          ) : (
            "-"
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px 50px" }}>
      {/* ปุ่ม Add Your Information */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        {userHasInfo ? (
          // ปุ่มสีเทา เมื่อผู้ใช้กรอกข้อมูลแล้ว
          <Button
            type="default"
            disabled
            style={{
              borderRadius: "8px",
              fontWeight: "bold",
              backgroundColor: "#f0f0f0",
              borderColor: "#d9d9d9",
              color: "#999",
              cursor: "not-allowed",
              boxShadow: "none",
            }}
          >
            ✅ Information Submitted
          </Button>
        ) : (
          // ปุ่มปกติเมื่อยังไม่กรอกข้อมูล
          <Link to={`/edit/${userId}`}>
            <Button
              type="primary"
              style={{
                backgroundColor: "#1677ff",
                borderColor: "#1677ff",
                borderRadius: "8px",
                fontWeight: "bold",
                boxShadow: "0 4px 8px rgba(22, 119, 255, 0.3)",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Add Your Information
            </Button>
          </Link>
        )}
      </div>

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
