// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const url = (url: string, params: Record<string, any>) => {
	const path = url.endsWith("/") ? url.slice(0, url.length - 1) : url;
	const search = new URLSearchParams(params);
	return `${path}?${search.toString()}`;
};
