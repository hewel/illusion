import type { either as E } from "fp-ts";

export type LeftType<T> = Exclude<T, E.Right<unknown>> extends E.Left<infer L>
	? L
	: T extends E.Either<E.Left<infer L>, E.Right<unknown>>
	? L
	: never;

export type RightType<T> = Exclude<T, E.Left<unknown>> extends E.Right<infer R>
	? R
	: T extends E.Either<E.Left<unknown>, E.Right<infer R>>
	? R
	: never;
