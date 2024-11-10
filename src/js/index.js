function importAll(r) {
  let d = {};
  r.keys().map((item, index) => { d[item.replace('./', '')] = r(item); });
  return d;
}

const IMAGES = importAll(require.context('../media', false, /\.(png|jpe?g|svg)$/));

import { it_data  } from "./data/it.js"
import { en_data  } from "./data/en.js"

import { LOCALE, initLocale, setLocale } from "./states/locale.js"
import { CURR_MENU, setCurrMenu } from "./states/current.js"

let full_data = { it: it_data, en: en_data }
let data = full_data[LOCALE]

function main() {
  initLocaleSwitches()
  initLocale(handleLocaleChange)
  setTimeout(() => document.querySelector(".loader").remove(), 450)
}

function handleLocaleChange() {
  LOCALE_SWITCHES.forEach(s => {
    s.classList[
      s.dataset.locale == LOCALE ? "add" : "remove"
    ]("active")
  })

  data = full_data[LOCALE]

  renderMenu()
}

function initLocaleSwitches() {
  LOCALE_SWITCHES.forEach(s => {
    s.addEventListener("click", () => setLocale(
      s.dataset.locale,
      handleLocaleChange
    ))
  })
}

function renderMenu() {
  MAIN.innerHTML = ""
  MENU_TYPES.innerHTML = ""

  data.menus.forEach((m, i) => {
    MENU_TYPES.append(createMenusSwitch(m.title, i))
  })

  data.menus[CURR_MENU].sections.forEach(section => {
    MAIN.append(createSection(section))
  })
}

/**
 * @param {string} title 
 * @returns {HTMLDivElement}
 */
function createMenusSwitch(title, i) {
  let _wrapper = document.createElement("div")
  _wrapper.innerHTML = `<h3>${title}</h3>`
  _wrapper.className = CURR_MENU === i ? 'menu-type active' : 'menu-type'
  _wrapper.addEventListener("click", () => {
    document.querySelectorAll(".menu-type.active").forEach(el => {
      el.classList.remove("active")
    })
    _wrapper.classList.add("active")
    setCurrMenu(i, renderMenu)
  })
  return _wrapper
}

/**
 * @param {(typeof it_data)["menus"]["sections"][0]} section 
 * @returns {HTMLDivElement}
 */
function createSection({ title, description, image, items }) {
  const _wrapper = document.createElement("div")
  _wrapper.className = "section"

  const _head = document.createElement("div")
  _head.className = "title"
  _head.innerHTML = `<h3>${title}</h3>`

  const _desc = document.createElement("div")
  _desc.className = "description"
  _desc.innerHTML = image ? `
    <div class="image-wrapper">
      <img src="" alt="${title}" />
    </div> ` : "" + `
    <p>${description ?? ""}</p>
  `

  _head.addEventListener("click", () => {
    let is_active = _wrapper.classList.contains("active")

    document.querySelectorAll(".section.active").forEach(s => {
      s.classList.remove("active")
    })

    if (image) {
      _desc.querySelector("img").src = IMAGES[image]
    }

    if (!is_active) {
      _wrapper.classList.add("active")
    }

    // setTimeout(() => {
    //   window.scrollTo({ top: _wrapper.getBoundingClientRect().y + 200, behavior: "smooth" })
    // }, 150)
  })

  const _items = document.createElement("div")
  _items.setAttribute("style", `--max-h: ${items.length * 54}px`)
  _items.className = "items"

  items.forEach(item => _items.append(createItem(item)))

  _wrapper.append(_head)
  _wrapper.append(_desc)
  _wrapper.append(_items)

  return _wrapper
}

/**
 * @param {(typeof it_data)["menus"]["sections"][0]["items"][0]} item 
 * @returns {HTMLDivElement}
 */
function createItem({ title, description, price }) {
  const elem = document.createElement("div")
  elem.className = "item"

  elem.innerHTML = `
    <div>
      <h4>${title}</h4>
      <p>${description}</p>
    </div>
    <b>${formatPrice(price)}</b>
  `

  return elem
}

/**
 * @param {number} cents 
 * @returns {string}
 */
function formatPrice(cents) {
  let eur = (cents / 100).toLocaleString(LOCALE, { style: "currency", currency: "EUR" })
  return `<b>${eur.replace("€", "")} <small>€</small></b>`
}

const MAIN = document.querySelector("#main")
const MENU_TYPES = document.querySelector("#menu-types")
const LOCALE_SWITCHES = document.querySelectorAll("#switches>div")

main()
