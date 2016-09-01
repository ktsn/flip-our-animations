export function range (length) {
  const list = []
  for (let i = 0; i < length; ++i) {
    list.push(i)
  }
  return list
}

export function shuffle (list) {
  const from = list.slice()
  const to = []
  for (let i = list.length; i >= 0; --i) {
    to.push(from.splice(randomInt(i), 1)[0])
  }
  return to
}

export function randomInt (length) {
  return Math.floor(Math.random() * length)
}

let uid = 0
export function genId () {
  return ++uid
}
