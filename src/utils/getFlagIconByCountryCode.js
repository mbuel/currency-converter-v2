import getUnicodeFlagIcon from 'country-flag-icons/unicode'

export default function getFlagIconByCountryCode(code) {
  if (code && code.length === 3) {
    code.substring(0,2);
    const flag = getUnicodeFlagIcon(code.toUpperCase());
    return flag;
  }
  return '';
}