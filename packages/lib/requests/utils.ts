export const parseBlobError = async (blob: Blob, codeKey: string, messageKey: string) => {
  const text = await blob.text()
  try {
    const json = JSON.parse(text)
    return { code: json[codeKey], message: json[messageKey] || '下载失败' }
  } catch {
    return { code: undefined, message: text || '下载失败' }
  }
}
