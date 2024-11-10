/**
 * @type {number}
 */
export let CURR_MENU = 0

/**
 * @param {number} to
 * @param {() => void} onChange
 */
export function setCurrMenu(to, onChange) {
  CURR_MENU = to
  onChange()
}
