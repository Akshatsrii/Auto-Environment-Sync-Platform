const API_URL = "http://localhost:4000/api/top-users";

const token = () => localStorage.getItem("token");

export async function getTopUsers() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  return res.json();
}