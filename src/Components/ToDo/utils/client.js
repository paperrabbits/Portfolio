// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import axios from 'axios';

export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  console.log('body', body)
  console.log('config', customConfig)
  const config = {
    body: body ? body : {},
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }
  console.log(config)

  // if (body) {
  //   config.body = body
  // }

  let data
  // console.log('data', data)
  console.log('axios', axios)
  console.log('config', config)
  // let obj = {...body}
  try {
    // console.log(response)
    const response = await axios(endpoint, config)
    console.log(response)
    data = await response.json()
    console.log('data', data)
    if (response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
  console.log(endpoint, body, customConfig)
  return client(endpoint, { ...customConfig, body })
}
