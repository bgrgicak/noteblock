export function date(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function nlToBr(str: string): string {
  return str.replace(/(?:\r\n|\r|\n)/g, '<br>')
}