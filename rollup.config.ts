import { RollupOptions, InputPluginOption, ModuleFormat } from "rollup";
import { resolve } from "path";

export const createOptions = (
	opt: {
		outdir: string;
		filename: string;
		formats: ((isDev: boolean) => ModuleFormat[]) | ModuleFormat[];
		plugins:
			| ((isDev: boolean) => Array<InputPluginOption>)
			| Array<InputPluginOption>;
	} & RollupOptions,
): RollupOptions => {
	const isDev = process.env.ROLLUP_WATCH === "true";
	const { input, outdir, filename, formats, plugins, ...restOpt } = opt;

	return {
		input: input ?? `src/${filename}.ts`,
		output: (Array.isArray(formats) ? formats : formats(isDev))
			.filter(Boolean)
			.map((format) => ({
				file: resolve(outdir, `${filename}.${format === "cjs" ? "cjs" : "js"}`),
				format,
			})),
		plugins: Array.isArray(plugins) ? plugins : plugins?.(isDev),
		...restOpt,
	};
};
