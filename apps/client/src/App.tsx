import { useState, useCallback } from "react";
import type { AppRouter } from "@illusion/server";
import { createTRPCReact } from "@trpc/react-query";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

import { Container } from "@mantine/core";

import Users from "./Users.tsx";

export const trpc = createTRPCReact<AppRouter>();

function App() {
	const [count, setCount] = useState(0);
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: "http://localhost:3000/trpc",
				}),
			],
		}),
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<Container>
					<h1>Rspack + React + TypeScript</h1>
					<div className="card">
						<button
							type="button"
							onClick={() => setCount((count) => count + 1)}
						>
							count is {count}
						</button>
						<p>
							Edit <code>src/App.tsx</code> and save to test HMR
						</p>
					</div>
					<Users />
					<p className="read-the-docs">
						Click on the Rspack and React logos to learn more
					</p>
				</Container>
			</QueryClientProvider>
		</trpc.Provider>
	);
}

export default App;
