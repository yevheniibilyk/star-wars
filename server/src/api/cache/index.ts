import NodeCache from 'node-cache';

const FIVE_MIN = 5 * 60;
const cache = new NodeCache( { stdTTL: FIVE_MIN } );

type CacheModel = {
  key: string
};

function getCacheKey(model: CacheModel, arg: string | number) {
  return `${model.key}:${arg}`;
}

async function cachedOperation(
  model: CacheModel,
  arg: string | number,
  fallbackFunction: (arg: string | number) => Promise<any>
) {
  const cacheKey = getCacheKey(model, arg);

  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    console.log('Returning cache for: ', cacheKey);

    return cachedResult;
  }

  console.log('API request for: ', cacheKey);

  const result = await fallbackFunction(arg);

  cache.set(cacheKey, result);

  return result;
}

export default cachedOperation;
