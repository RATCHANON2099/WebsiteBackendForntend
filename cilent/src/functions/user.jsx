import axios from "axios";

export const remove = async (id) =>
  await axios.delete(import.meta.env.VITE_API_URL + "/user/" + id);

export const create = async (data) =>
  await axios.post(import.meta.env.VITE_API_URL + "/user/", data);

export const getdata = async () => {
  return await axios.get(import.meta.env.VITE_API_URL + "/user/");
};

export const read = async (id) => {
  return await axios.get(import.meta.env.VITE_API_URL + "/user/" + id);
};

export const update = async (id, data) => {
  return await axios.put(import.meta.env.VITE_API_URL + "/user/" + id, data);
};

export const register = async (data) => {
  return await axios.post(import.meta.env.VITE_API_URL + "/register/", data);
};
