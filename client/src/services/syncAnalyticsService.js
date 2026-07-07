const API_URL = "http://localhost:4000/api/sync-analytics";

const token = () => localStorage.getItem("token");

export async function getSyncAnalytics(period = 30) {
  const res = await fetch(`${API_URL}?period=${period}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  return res.json();
}