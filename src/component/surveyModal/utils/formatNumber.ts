export const formatPhoneNumber = (value: string): string => {
  let cleaned = value.replace(/[^+\d]/g, '');
  if (!cleaned.startsWith('+44')) {
    if (cleaned.startsWith('44')) {
      cleaned = '+' + cleaned;
    } else if (cleaned.startsWith('+')) {
      cleaned = '+44' + cleaned.slice(1);
    } else {
      cleaned = '+44' + cleaned;
    }
  }
  const digits = cleaned.slice(3);
  const len = digits.length;
  let formatted = '+44 ';
  if (len === 0) return formatted;
  if (len <= 3) {
    formatted += `(${digits}`;
  } else {
    formatted += `(${digits.slice(0, 3)})`;
    if (len > 3) {
      const part2 = digits.slice(3, 6);
      if (part2) formatted += ` ${part2}`;
    }
    if (len > 6) {
      const part3 = digits.slice(6, 10);
      if (part3) formatted += `-${part3}`;
    }
  }
  return formatted;
};
