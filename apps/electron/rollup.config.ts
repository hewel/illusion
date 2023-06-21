import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sucrase from "@rollup/plugin-sucrase";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import { builtinModules } from "module";
import pkg from "./package.json" assert { type: "json" };
import tsconfig from "./tsconfig.json" assert { type: "json" };

import { createOptions } from "../../rollup.config";

export default createOptions({
	filename: "main",
	outdir: tsconfig.compilerOptions.outDir,
	formats: ["cjs"],
	external: [...builtinModules, "electron"].concat(
		Object.entries(pkg.dependencies)
			.filter(([key, version]) => !version.includes("workspace"))
			.map(([key, version]) => key),
	),
	plugins: [
		nodeResolve({ extensions: [".js", ".ts"] }),
		commonjs(),
		json(),
		sucrase({ exclude: tsconfig.exclude, transforms: ["typescript"] }),
	],
});
