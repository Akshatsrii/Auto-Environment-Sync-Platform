const API_URL = "http://localhost:4000/api/environment-growth";

const token = () => localStorage.getItem("token");

export async function getEnvironmentGrowth() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  return res.json();
}