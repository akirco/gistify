export function validateDate(dateString: string) {
  var pattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!pattern.test(dateString)) {
    return false;
  }
  return true;
}
