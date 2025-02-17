export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export const startsWithRoute = (pathname: string, href: string) => {
  return pathname.startsWith(href)
}
