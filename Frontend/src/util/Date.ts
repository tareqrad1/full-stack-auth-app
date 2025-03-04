export const formatDate = (dateString: Date | string | number | undefined) => {
	const date = dateString ? new Date(dateString) : new Date();
	if (isNaN(date.getTime())) {
		return "Invalid Date";
	}

	return date.toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};