import axios from "axios";

const getData = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_limit=10",
  );

  return response.data;
};

const postData = async () => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
    title: "연습",
    body: "연습용데이터",
    userId: 1,
  });

  return response.data;
};

const putData = async () => {
  const response = await axios.put("https://jsonplaceholder.typicode.com/posts/1", {
    title: "수정된 데이터",
    body: "연습용데이터",
    userId: 1,
  });

  return response.data;
};

const deleteData = async () => {
  const response = await axios.delete("https://jsonplaceholder.typicode.com/posts/1");

  return response.data;
};

const main = async () => {
  console.log(await deleteData());
};
main();
