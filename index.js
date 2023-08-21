const abs = n => (n < 0n ? -n : n)
const sign = n => (n === 0n ? 0n : n > 0n ? 1n : -1n)
const numReg = /^(-?\d+)(\.\d+)?([eE][-+]?\d+)?$/
const expReg = /[eE]/
function BN (s) {
  let a = (s + '').match(numReg)
  // console.log(a)
  let [, a1, a2, a3] = a
  a2 = a2 || ''
  let zoom = a2.length - 1
  zoom = zoom < 0 ? 0 : zoom
  let exp = +(a3 || '').replace(expReg, '') || 0
  zoom = zoom + (exp < 0 ? abs(exp) : 0)
  // console.log('zoom', zoom)
  let bInt = BigInt(a1 + a2.replace('.', '') + (exp > 0 ? '0'.repeat(exp) : ''))
  let magnify = BigInt(zoom)
  // console.log('input:', s, '\na1:   ', a1, '\na2:    ', a2, '\na3:', a3, '\nzoom:', zoom, '\nexp:', exp)
  return {
    magnify,
    bInt
  }
}
class Big {
  constructor (s, dp = 40) {
    this.bn = BN(s)
    this.dp = dp
  }
  addSub (s, type = 1) {
    let bn1 = BN(s)
    let diff = abs(this.bn.magnify - bn1.magnify)
    if (bn1.magnify <= this.bn.magnify) {
      bn1.bInt = bn1.bInt * 10n ** diff
    } else {
      this.bn.bInt = this.bn.bInt * 10n ** diff
      this.bn.magnify = bn1.magnify
    }
    this.bn.bInt = this.bn.bInt + (type == 1 ? bn1.bInt : -bn1.bInt)
    return this
  }
  add = s => this.addSub(s, 1)
  sub = s => this.addSub(s, 0)
  mul (s) {
    let bn1 = BN(s)
    this.bn.bInt *= bn1.bInt
    this.bn.magnify += bn1.magnify
    return this
  }
  div (s, rm = 0) {
    if (+s === 0) throw Error('Not zero')
    let bn1 = BN(s)
    let dp = BigInt(this.dp)
    this.bn.magnify -= bn1.magnify
    let diff = dp - this.bn.magnify
    if (diff < 0) {
      // diff += (abs(diff) / dp + 1n) * dp
      diff = dp
    }
    this.bn.bInt *= 10n ** diff
    this.bn.magnify += diff
    this.bn.bInt /= bn1.bInt
    return this
  }
  toString () {
    let signCof = sign(this.bn.bInt)
    this.bInt = abs(this.bn.bInt)
    let z = this.bInt / 10n ** this.bn.magnify
    let f = this.bInt % 10n ** this.bn.magnify
    let signStr = ''
    let zoreCount =
      Number(this.bn.magnify) - (f + '').length < 0
        ? 0
        : Number(this.bn.magnify) - (f + '').length

    if (z === 0n && zoreCount > 5) {
      let fStr = f.toString() //.slice(0, this.dp)

      return (
        (signCof < 0 ? '-' : signStr) +
        fStr.at(0) +
        '.' +
        fStr.slice(1).replace(/[0]+$/, '') +
        'e-' +
        (zoreCount + 1)
      ).replace(/^0\.e[+-]\d+/, '0')
    }
    if (z >= 1000000000000000000000n) {
      f = '0'.repeat(zoreCount) + f
      return (
        (signCof < 0 ? '-' : signStr) +
        (
          z.toString().at(0) +
          '.' +
          z.toString().slice(1) +
          f.replace(/[0]+$/, '')
        ).replace(/[0]+$/, '') +
        'e+' +
        (z.toString().length - 1)
      )
    }
    f = '0'.repeat(zoreCount) + f
    // f = f.slice(0, this.dp)

    return ((signCof < 0 ? '-' : signStr) + z + '.' + f)
      .replace(/[0]+$/, '')
      .replace(/\.$/, '')
  }
}
module.exports = {
  Big
}
