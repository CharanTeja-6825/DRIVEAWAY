export const isHtmlResponse = (value) => {
	if (typeof value !== "string") return false;
	const snippet = value.trim().slice(0, 200).toLowerCase();
	return (
		snippet.startsWith("<!doctype") ||
		snippet.includes("<html") ||
		snippet.includes("<body")
	);
};
