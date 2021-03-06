/// <reference types="node" />
/// <reference lib="esnext.asynciterable" />
import { Agent } from 'http';
import { SecureContextOptions } from 'tls';
import { Methods } from './methods';
import { LogLevel, Logger } from './logger';
import { RetryOptions } from './retry-policies';
/**
 * A client for Slack's Web API
 *
 * This client provides an alias for each {@link https://api.slack.com/methods|Web API method}. Each method is
 * a convenience wrapper for calling the {@link WebClient#apiCall} method using the method name as the first parameter.
 */
export declare class WebClient extends Methods {
    /**
     * The base URL for reaching Slack's Web API. Consider changing this value for testing purposes.
     */
    readonly slackApiUrl: string;
    /**
     * Authentication and authorization token for accessing Slack Web API (usually begins with `xoxp` or `xoxb`)
     */
    readonly token?: string;
    /**
     * Configuration for retry operations. See {@link https://github.com/tim-kos/node-retry|node-retry} for more details.
     */
    private retryConfig;
    /**
     * Queue of requests in which a maximum of {@link WebClientOptions.maxRequestConcurrency} can concurrently be
     * in-flight.
     */
    private requestQueue;
    /**
     * Axios HTTP client instance used by this client
     */
    private axios;
    /**
     * Configuration for custom TLS handling
     */
    private tlsConfig;
    /**
     * Preference for immediately rejecting API calls which result in a rate-limited response
     */
    private rejectRateLimitedCalls;
    /**
     * The name used to prefix all logging generated from this object
     */
    private static loggerName;
    /**
     * This object's logger instance
     */
    private logger;
    /**
     * @param token - An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`)
     */
    constructor(token?: string, { slackApiUrl, logger, logLevel, maxRequestConcurrency, retryConfig, agent, tls, rejectRateLimitedCalls, headers, }?: WebClientOptions);
    /**
     * Generic method for calling a Web API method
     *
     * @param method the Web API method to call {@see https://api.slack.com/methods}
     * @param options options
     */
    apiCall(method: string, options?: WebAPICallOptions): Promise<WebAPICallResult>;
    /**
     * Iterate over the result pages of a cursor-paginated Web API method. This method can return two types of values,
     * depending on which arguments are used. When up to two parameters are used, the return value is an async iterator
     * which can be used as the iterable in a for-await-of loop. When three or four parameters are used, the return
     * value is a promise that resolves at the end of iteration. The third parameter, `shouldStop`, is a function that is
     * called with each `page` and can end iteration by returning `true`. The fourth parameter, `reduce`, is a function
     * that is called with three arguments: `accumulator`, `page`, and `index`. The `accumulator` is a value of any type
     * you choose, but it will contain `undefined` when `reduce` is called for the first time. The `page` argument and
     * `index` arguments are exactly what they say they are. The `reduce` function's return value will be passed in as
     * `accumulator` the next time its called, and the returned promise will resolve to the last value of `accumulator`.
     *
     * The for-await-of syntax is part of ES2018. It is available natively in Node starting with v10.0.0. You may be able
     * to use it in earlier JavaScript runtimes by transpiling your source with a tool like Babel. However, the
     * transpiled code will likely sacrifice performance.
     *
     * @param method the cursor-paginated Web API method to call {@see https://api.slack.com/docs/pagination}
     * @param options options
     * @param shouldStop a predicate that is called with each page, and should return true when pagination can end.
     * @param reduce a callback that can be used to accumulate a value that the return promise is resolved to
     */
    paginate(method: string, options?: WebAPICallOptions): AsyncIterable<WebAPICallResult>;
    paginate(method: string, options: WebAPICallOptions, shouldStop: PaginatePredicate): Promise<void>;
    paginate<R extends PageReducer, A extends PageAccumulator<R>>(method: string, options: WebAPICallOptions, shouldStop: PaginatePredicate, reduce?: PageReducer<A>): Promise<A>;
    /**
     * Low-level function to make a single API request. handles queuing, retries, and http-level errors
     */
    private makeRequest;
    /**
     * Transforms options (a simple key-value object) into an acceptable value for a body. This can be either
     * a string, used when posting with a content-type of url-encoded. Or, it can be a readable stream, used
     * when the options contain a binary (a stream or a buffer) and the upload should be done with content-type
     * multipart/form-data.
     *
     * @param options arguments for the Web API method
     * @param headers a mutable object representing the HTTP headers for the outgoing request
     */
    private serializeApiCallOptions;
    /**
     * Processes an HTTP response into a WebAPICallResult by performing JSON parsing on the body and merging relevent
     * HTTP headers into the object.
     * @param response - an http response
     */
    private buildResult;
}
export default WebClient;
export interface WebClientOptions {
    slackApiUrl?: string;
    logger?: Logger;
    logLevel?: LogLevel;
    maxRequestConcurrency?: number;
    retryConfig?: RetryOptions;
    agent?: Agent;
    tls?: TLSOptions;
    rejectRateLimitedCalls?: boolean;
    headers?: object;
}
export declare type TLSOptions = Pick<SecureContextOptions, 'pfx' | 'key' | 'passphrase' | 'cert' | 'ca'>;
export declare enum WebClientEvent {
    RATE_LIMITED = "rate_limited"
}
export interface WebAPICallOptions {
    [argument: string]: unknown;
}
export interface WebAPICallResult {
    ok: boolean;
    error?: string;
    response_metadata?: {
        warnings?: string[];
        next_cursor?: string;
        scopes?: string[];
        acceptedScopes?: string[];
        retryAfter?: number;
        messages?: string[];
    };
    [key: string]: unknown;
}
export interface PaginatePredicate {
    (page: WebAPICallResult): boolean | undefined | void;
}
interface PageReducer<A = any> {
    (accumulator: A | undefined, page: WebAPICallResult, index: number): A;
}
declare type PageAccumulator<R extends PageReducer> = R extends (accumulator: (infer A) | undefined, page: WebAPICallResult, index: number) => infer A ? A : never;
//# sourceMappingURL=WebClient.d.ts.map