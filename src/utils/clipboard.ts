export async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch {
    const area = document.createElement('textarea')
    area.value = value
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.left = '-9999px'
    document.body.append(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }
}
