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
	const wishlist = trpc.getWishlist.useQuery({
		category: "movie",
		page: 1,
	});

	return (
		<div className="card">
			{wishlist.data?.data?.map(({ item }) => item.title)}
		</div>
	);
};

export default Users;
