import { FutureStatic } from "./types/future-static";

// ramda-fantasy не типизированая взял типизацию из https://github.com/ramda/ramda-fantasy/issues/154
export const Future: FutureStatic = require("ramda-fantasy").Future;
