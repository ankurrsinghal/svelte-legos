export interface FetchWithTimeoutAndRetryParams {
	timeout?: number;
	retryCount?: number;
	onRetry?: () => void;
}

export async function fetchWithTimeoutAndRetry(
	input: RequestInfo | URL,
	options: RequestInit & FetchWithTimeoutAndRetryParams = {}
): ReturnType<typeof fetch> {
	const { timeout = 5000, retryCount = 3, onRetry } = options;
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => {
			controller.abort();
		}, timeout);
		const response = await fetch(input, { ...options, signal: controller.signal });
		clearTimeout(timeoutId);
		if (!response.ok) {
			throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
		}
		return response;
	} catch (error) {
		if (retryCount > 0) {
			console.error(`Fetch error: ${error}. Retrying in 1 second...`);
			onRetry && onRetry();
			await new Promise((resolve) => setTimeout(resolve, 1000));
			return fetchWithTimeoutAndRetry(input, { ...options, retryCount: retryCount - 1 });
		}
		throw error;
	}
}
