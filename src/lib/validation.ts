export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) errors.push('Şifre en az 8 karakter olmalıdır');
  if (!/[A-Z]/.test(password)) errors.push('Şifre en az bir büyük harf içermelidir');
  if (!/[a-z]/.test(password)) errors.push('Şifre en az bir küçük harf içermelidir');
  if (!/[0-9]/.test(password)) errors.push('Şifre en az bir rakam içermelidir');
  if (!/[!@#$%^&*]/.test(password)) errors.push('Şifre en az bir özel karakter içermelidir');
  
  return { valid: errors.length === 0, errors };
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+90|0)[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateIBAN = (iban: string): boolean => {
  const ibanRegex = /^TR\d{2}\d{4}\d{1}\d{3}\d{1}\d{8}\d{10}$/;
  return ibanRegex.test(iban.replace(/\s/g, ''));
};

export const validateAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 1000000;
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim();
};
