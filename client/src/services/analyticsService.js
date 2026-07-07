const API_URL = "http://localhost:4000/api/analytics";

const token = () => localStorage.getItem("token");

export async function getAnalytics() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  return res.json();
}

export async function exportPDF() {
  const res = await fetch(`${API_URL}/export/pdf`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  const blob = await res.blob();

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "analytics-report.pdf";
  a.click();

  URL.revokeObjectURL(url);
}

export async function exportExcel() {
  const res = await fetch(`${API_URL}/export/excel`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  const blob = await res.blob();

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "analytics-report.xlsx";
  a.click();

  URL.revokeObjectURL(url);
}