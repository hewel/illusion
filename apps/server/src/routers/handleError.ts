import { TRPCError } from "@trpc/server";

export const handleError = (err: string) => {
	throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err });
};
