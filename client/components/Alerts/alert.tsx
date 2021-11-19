import { MessageType, ResponseMessage } from '../../lib/api'

export type AlertProps = {
  type?: MessageType
  message?: string
}

const Alert: React.FC<AlertProps> = ({ type, message }: AlertProps) => {
  if (!message) {
    return null
  }
  let alertType: string
  switch (type) {
    case ResponseMessage.ERROR:
      alertType = 'danger'
      break
    case ResponseMessage.WARNING:
      alertType = 'warning'
      break
    case ResponseMessage.SUCCESS:
      alertType = 'success'
      break
    default:
      alertType = 'light'
  }
  return (
    <div className={`alert alert-${alertType} m-0 p-1 fade show text-center`} role="alert">
      {message}
    </div>
  )
}

export default Alert
