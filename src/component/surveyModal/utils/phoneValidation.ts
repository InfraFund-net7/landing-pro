export const isPhoneNumberComplete = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  if (!cleaned.startsWith('44')) return false;
  const digitsAfter44 = cleaned.slice(2);
  return digitsAfter44.length === 10;
};
