export declare abstract class abstractLogConfig<T> {
    protected path: string;
    constructor(path: string);
    abstract handler(): this;
    abstract get(): T | null;
}
