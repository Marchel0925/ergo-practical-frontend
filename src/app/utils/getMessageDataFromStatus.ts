export function getMessageDataFromStatus(status: number, message: string) : any {
  if (status >= 400 && status < 600) {
    return {
      type: 'danger',
      text: message,
    };
  } else if (status >= 200 && status < 300) {
    return {
      type: 'success',
      text: message,
    };
  } else if (status >= 100 && status < 200) {
    return {
      type: 'info',
      text: message,
    };
  }
}