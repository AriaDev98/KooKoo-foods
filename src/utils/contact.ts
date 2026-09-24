const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: string): boolean {
  const v = value.trim();
  return v.length <= 254 && EMAIL.test(v) && !v.includes("..");
}

// Accepts the usual ways people write a number (spaces, dashes, dots, brackets,
// leading +), as long as what's left is 8-15 digits and not a run of one digit.
export function isPhone(value: string): boolean {
  const digits = value.trim().replace(/[\s().-]/g, "");
  return /^\+?\d{8,15}$/.test(digits) && !/^\+?(\d)\1+$/.test(digits);
}

export function isValidContact(value: string): boolean {
  return isEmail(value) || isPhone(value);
}
