import { router } from '@/main'
import { notification } from '@/utils'
import { Api } from './__generated'

const BASE_URL = '/api'

// 导出全局变量`api`
export const api = new Api(async ({ uri, method, headers, body }) => {
  const tenant = (window as any).__tenant as string | undefined
  const response = await fetch(`${BASE_URL}${uri}`, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      ...headers,
      ...(tenant !== undefined && tenant !== '' ? { tenant } : {}),
    },
  })
  if (response.status === 401) {
    await router.navigate({ to: '/sign-in', search: { redirect: location.pathname } })
    notification.error({ message: '登录已过期，请重新登录' })
    return
  }

  if (response.status !== 200) {
    throw await response.json()
  }
  const text = await response.text()
  if (text.length === 0) {
    return null
  }
  return JSON.parse(text)
})

export * from './__generated'
