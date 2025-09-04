// Utility to format dates cleanly
export const formatDateTime = (date: string | Date | undefined) => {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
