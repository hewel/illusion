import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import sucrase from "@rollup/plugin-sucrase";
import typescript from "@rollup/plugin-typescript";
import run from "@rollup/plugin-run";
import alias from "@rollup/plugin-alias";
import { builtinModules } from "module";
import pkg from "./package.json" assert { type: "json" };
import tsconfig from "./tsconfig.json" assert { type: "json" };

import { createOptions } from "../../rollup.config";

export default createOptions({
	filename: "server",
	outdir: tsconfig.compilerOptions.outDir,
	formats: ["esm"],
	context: "({})",
	moduleContext: () => "({})",
	external: builtinModules.concat(Object.keys(pkg.dependencies)),
	plugins: (isDev) => [
		json(),
		// alias({
		// 	entries: Object.entries(tsconfig.compilerOptions.paths).map(
		// 		([find, [replacement]]) => ({
		// 			find,
		// 			replacement,
		// 		}),
		// 	),
		// }),
		commonjs(),
		typescript(),
		nodeResolve({ extensions: [".ts"] }),
		sucrase({ exclude: tsconfig.exclude, transforms: ["typescript"] }),
		isDev &&
			run({
				env: {
					NODE_ENV: "development",
				},
			}),
	],
});
