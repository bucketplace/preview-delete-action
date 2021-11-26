import fetch from 'node-fetch'

function getBaseUrl(): string {
  let url = process.env.BASE_URL
  if (!url)
    throw ReferenceError('There is no url defined in the environment variables')
  if (url.endsWith('/')) url = url.slice(0, -1)
  return url
}

function getAuthToken(): string {
  const token = process.env.AUTH_TOKEN
  if (!token)
    throw ReferenceError(
      'There is no token defined in the environment variables'
    )
  return token
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getErrorMsg(obj: any): string {
  return obj.detail || JSON.stringify(obj, null, 2)
}

export async function deletePreview(
  application: string,
  branch: string
): Promise<void> {
  const res = await fetch(
    `${getBaseUrl()}/api/v1/applications/${application}/preview/?${new URLSearchParams(
      {
        branch
      }
    )}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${getAuthToken()}`
      }
    }
  )

  if (res.status !== 204) throw Error(getErrorMsg(await res.json()))
}
