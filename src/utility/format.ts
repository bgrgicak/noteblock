export function date(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function nlToBr(str: string): string {
  return str.replace(/(?:\r\n|\r|\n)/g, '<br>')
}
export function isLink(str: string): boolean {
  const pattern = new RegExp('^(https?:\\/\\/)?' +
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
  '((\\d{1,3}\\.){3}\\d{1,3}))' +
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
  '(\\?[;&a-z\\d%_.~+=-]*)?' +
  '(\\#[-a-z\\d_]*)?$', 'i')
  return pattern.test(str)
}