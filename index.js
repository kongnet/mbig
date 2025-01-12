const abs = n => (n < 0n ? -n : n)
const sign = n => (n === 0n ? 0n : n > 0n ? 1n : -1n)
const numReg = /^(-?\d+)(\.\d+)?([eE][-+]?\d+)?$/
const expReg = /[eE]/
function BN (s) {
  if (s instanceof Big) {
    return { magnify: s.bn.magnify, bInt: s.bn.bInt }
  }
  let a = (s + '').match(numReg)
  let [, a1, a2, a3] = a
  a2 = a2 || ''
  let zoom = a2.length - 1
  zoom = zoom < 0 ? 0 : zoom
  let exp = +(a3 || '').replace(expReg, '') || 0
  zoom = zoom + (exp < 0 ? abs(exp) : 0)
  let bInt = BigInt(a1 + a2.replace('.', '') + (exp > 0 ? '0'.repeat(exp) : ''))
  let magnify = BigInt(zoom)
  return { magnify, bInt }
}
function big2Str (bInt, magnify) {
  let signCof = sign(bInt)
  bInt = abs(bInt)
  let z = bInt / 10n ** magnify
  let f = bInt % 10n ** magnify
  let signStr = ''
  let zoreCount = Number(magnify) - (f + '').length < 0 ? 0 : Number(magnify) - (f + '').length
  if (z === 0n && zoreCount > 5) {
    let fStr = f.toString() //.slice(0, this.dp)
    return ((signCof < 0 ? '-' : signStr) + fStr.at(0) + '.' + fStr.slice(1).replace(/[0]+$/, '') + 'e-' + (zoreCount + 1)).replace(/^0\.e[+-]\d+/, '0')
  }
  if (z >= 1000000000000000000000n) {
    f = '0'.repeat(zoreCount) + f
    return (signCof < 0 ? '-' : signStr) + (z.toString().at(0) + '.' + z.toString().slice(1) + f.replace(/[0]+$/, '')).replace(/[0]+$/, '') + 'e+' + (z.toString().length - 1)
  }
  f = '0'.repeat(zoreCount) + f
  // f = f.slice(0, this.dp)
  return ((signCof < 0 ? '-' : signStr) + z + '.' + f).replace(/[0]+$/, '').replace(/\.$/, '')
}
class Big {
  constructor (s, dp = 40) {
    this.bn = BN(s)
    this.dp = dp
  }
  addSub (s, type = 1) {
    let [_bInt, _magnify] = [this.bn.bInt, this.bn.magnify]
    let bn1 = BN(s)
    let diff = abs(_magnify - bn1.magnify)
    if (bn1.magnify <= _magnify) {
      bn1.bInt = bn1.bInt * 10n ** diff
    } else {
      _bInt = _bInt * 10n ** diff
      _magnify = bn1.magnify
    }
    _bInt = _bInt + (type == 1 ? bn1.bInt : -bn1.bInt)
    return new Big(big2Str(_bInt, _magnify), this.dp)
  }
  add = s => this.addSub(s, 1)
  sub = s => this.addSub(s, 0)
  mul (s) {
    let [_bInt, _magnify] = [this.bn.bInt, this.bn.magnify]
    let bn1 = BN(s)
    _bInt = _bInt * bn1.bInt
    _magnify = _magnify + bn1.magnify
    return new Big(big2Str(_bInt, _magnify), this.dp)
  }
  div (s, rm = 0) {
    if (+s === 0) throw Error('Not zero')
    let [_bInt, _magnify] = [this.bn.bInt, this.bn.magnify]
    let bn1 = BN(s)
    let dp = BigInt(this.dp)
    _magnify = _magnify - bn1.magnify
    let diff = dp - _magnify
    if (diff < 0) {
      diff = dp // diff += (abs(diff) / dp + 1n) * dp
    }
    _bInt = _bInt * 10n ** diff
    _magnify = _magnify + diff
    _bInt = _bInt / bn1.bInt
    return new Big(big2Str(_bInt, _magnify), this.dp)
  }
  toString () {
    return big2Str(this.bn.bInt, this.bn.magnify)
  }
}
module.exports = { Big }
