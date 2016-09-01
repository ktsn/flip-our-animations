export function range (length) {
  const list = []
  for (let i = 0; i < length; ++i) {
    list.push(i)
  }
  return list
}

export function randomInt (length) {
  return Math.floor(Math.random() * length)
}

let uid = 0
export function genId () {
  return ++uid
}

export function add (list, index, item) {
  const res = list.slice()
  res.splice(index, 0, item)
  return res
}

export function remove (list, index) {
  const res = list.slice()
  res.splice(index, 1)
  return res
}

export function sort (list, fn) {
  const res = list.slice()
  res.sort(fn)
  return res
}

export function shuffle (list) {
  const from = list.slice()
  const to = []
  for (let i = list.length; i > 0; --i) {
    to.push(from.splice(randomInt(i), 1)[0])
  }
  return to
}
