import { either as E, task as T, taskEither as TE } from "fp-ts";

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

export type LeftTaskType<T, R = unknown> = T extends TE.TaskEither<infer L, R>
	? L
	: never;
export type RightTaskType<T, L = unknown> = T extends TE.TaskEither<L, infer R>
	? R
	: never;
