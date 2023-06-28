import {
	Alert,
	Card,
	Skeleton,
	SimpleGrid,
	Image,
	Button,
	Text,
	Badge,
} from "@mantine/core";
import { trpc } from "./App.tsx";

const Users = () => {
	const syncWishlist = trpc.wishlist.sync.useMutation();
	// const wishlist = trpc.getPopularMovieList.useQuery();

	return (
		<div className="card">
			<Button
				onClick={() => syncWishlist.mutate()}
				loading={syncWishlist.isLoading}
			>
				Sync {syncWishlist.status}
			</Button>
			{/* {wishlist.status} */}
		</div>
	);
};

export default Users;
