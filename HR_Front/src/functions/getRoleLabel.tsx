export default function getRoleLabel(role: string) {
  switch (role) {
    case 'II':
      return 'USER'
    case 'III':
      return 'ADMIN'
    case 'IV':
      return 'ADMIN_MASTER'
    case 'USER':
      return 'II'
    case 'ADMIN':
      return 'III'
    case 'ADMIN_MASTER':
      return 'IV'
    default:
      return ''
  }
}
