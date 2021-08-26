import NodeCache from 'node-cache';

const cache = new NodeCache( { stdTTL: 100 } );

type CacheModel = {
  key: string
};

function getCacheKey(model: CacheModel, arg: string | number) {
  return `${model.key}:${arg}`;
}

async function cachedOperation(
  model: CacheModel,
  arg: string | number,
  fallbackFunction: (arg: string | number) => Promise<Object>
) {
  const cacheKey = getCacheKey(model, arg);

  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    console.log('Returning cache for: ', cacheKey);

    return cachedResult;
  }

  console.log('Making API request for: ', cacheKey);

  const result = await fallbackFunction(arg);

  cache.set(cacheKey, result);

  return result;
}

export default cachedOperation;
