export async function api(
  endpoint: string,
  { body, ...customConfig }: any = {}
) {
  const headers = {
    'Content-Type': 'application/json'
  };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,/*
    headers: {
      ...headers,
      ...customConfig.headers,
    },*/
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await fetch(endpoint, config)
    data = await response.json()
    if (response.ok) {
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      }
    }
    throw new Error(response.statusText)
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : data)
  }
}

api.get = function (endpoint: string, customConfig = {}) {
  return api(endpoint, { ...customConfig, method: 'GET' })
}

api.post = function (endpoint: string, body: any, customConfig = {}) {
  return api(endpoint, { ...customConfig, body })
}
