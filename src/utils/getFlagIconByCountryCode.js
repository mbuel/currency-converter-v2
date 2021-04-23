import getUnicodeFlagIcon from 'country-flag-icons/unicode'

export default function getFlagIconByCountryCode(code) {
  return getUnicodeFlagIcon(code.toUpperCase())
}