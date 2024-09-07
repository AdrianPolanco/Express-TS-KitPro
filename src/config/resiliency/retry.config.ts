import retry, { Options } from 'async-retry';

const retryOptions: Options = {
    retries: 3,
    factor: 2,
    minTimeout: 2000,
    maxTimeout: 10000
}

const retryOperation = async (operation: () => Promise<void>) => {
    await retry(operation, retryOptions);
}

export default retryOperation;