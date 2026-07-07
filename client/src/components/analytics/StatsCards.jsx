function StatsCards({ analytics }) {
  const cards = [
    {
      title: "Environments",
      value: analytics?.totalEnvironments ?? 0,
    },
    {
      title: "Variables",
      value: analytics?.totalVariables ?? 0,
    },
    {
      title: "Syncs",
      value: analytics?.totalSyncs ?? 0,
    },
    {
      title: "Success",
      value: analytics?.successfulSyncs ?? 0,
    },
    {
      title: "Failed",
      value: analytics?.failedSyncs ?? 0,
    },
    {
      title: "Drifted",
      value: analytics?.driftedEnvironments ?? 0,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #dbeafe",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h4
            style={{
              color: "#64748b",
              marginBottom: "12px",
            }}
          >
            {card.title}
          </h4>

          <h2
            style={{
              color: "#1e40af",
              margin: 0,
            }}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;