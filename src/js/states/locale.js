const _AVAIL_LOCALES = {
  it: true,
  en: true
}

/**
 * @type {keyof typeof _AVAIL_LOCALES}
 */
export let LOCALE = "it"

/**
 * @param {"it" | "en"} to
 * @param {() => void} onChange
 */
export function setLocale(to, onChange) {
  LOCALE = to
  onChange()
}

/**
 * @param {() => void} onChange
 */
export function initLocale(onChange) {
  let usr = navigator?.language.split("-")[0] ?? "it"
  setLocale(_AVAIL_LOCALES[usr] ? usr : "en", onChange)
}
