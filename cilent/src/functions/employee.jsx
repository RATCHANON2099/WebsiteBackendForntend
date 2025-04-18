import axios from "axios";

// ใช้ดึงข้อมูลทั้งหมดของ Employee
export const getAllEmployees = async () => {
  return await axios.get(`${API}/employee`);
};

// ใช้เพิ่มข้อมูล Employee ที่กรอกลงในฟอร์ม
export const createEmployee = async (data, token) => {
  console.log("Data being sent:", data); // ตรวจสอบว่า data ถูกต้องหรือไม่
  return await axios.post(import.meta.env.VITE_API_URL + "/employee/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ใช้แก้ไขข้อมูล Employee ที่กรอกลงในฟอร์ม
export const updateEmployee = async (id, data, token) => {
  return await axios.put(`${API}/employee/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ใช้ลบข้อมูล Employee ที่กรอกลงในฟอร์ม
export const deleteEmployee = async (id, token) => {
  return await axios.delete(`${API}/employee/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ใช้ดึงข้อมูลของ Employee จาก ID หรือก็คือเลือกเป็นรายบุคคล
export const getEmployeeById = async (id, token) => {
  return await axios.get(`${API}/employee/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
