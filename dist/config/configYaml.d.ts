import { abstractLogConfig } from "./abstractConfig";
import { ConfigI } from "./config";
export declare class LogConfigYaml extends abstractLogConfig<ConfigI> {
    private config?;
    constructor(path: string);
    init(): void;
    handler(): this;
    get(): ConfigI | null;
}
