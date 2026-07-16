import * as BuildsAPI from "./api/builds.js";
import * as PartiesAPI from "./api/parties.js";
import * as CyclesAPI from "./api/cycles.js";
import * as SimulateAPI from "./api/simulate.js";

const routes = {
    "/api/builds": BuildsAPI.handler,
    "/api/parties": PartiesAPI.handler,
    "/api/cycles": CyclesAPI.handler,
    "/api/simulate": SimulateAPI.handler
};