export default function getJobFormat(jobFormat: string | undefined) {
  switch (jobFormat) {
    case 'PJ':
      return false
    case 'COOPERADO':
      return false
    case 'CLT':
      return true
    case 'ESTAGIÁRIO':
      return true
    default:
      return ''
  }
}
