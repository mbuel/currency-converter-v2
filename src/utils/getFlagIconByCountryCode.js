import getUnicodeFlagIcon from 'country-flag-icons/unicode'

export default function getFlagIconByCountryCode(code) {
  if (code && code.length === 3) {
    code = code.toString().substring(0, 2).trim();
    console.log('Code: ' + code);
    const flag = getUnicodeFlagIcon(code.toUpperCase());
    return flag;
  }
  return '';
}