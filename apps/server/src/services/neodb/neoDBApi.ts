import { task as T, taskOption as TO } from "fp-ts";
import { pipe } from "fp-ts/function";
import got from "got";
import { pickConfig, configDB, configTask } from "../../config.js";

export const neoDBApi = got.extend({
	prefixUrl: configDB.data.neoDBUrl,
	responseType: "json",
	headers: { Authorization: `Bearer ${configDB.data.neoDBToken}` },
});
