function StatsCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">

      <p className="text-slate-500 text-sm font-medium">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>

    </div>
  );
}

export default StatsCard;