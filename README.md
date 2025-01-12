# mbig

- Code only 80 lines, can be shorter...
- Easy bigDecimal use bigInt.
- Use Big.JS's tests pass all add,sub,mul. div RM only truncation mode, support dp setting.
- Integer e+21, decmail e-7, use Scientific notation.
- Performance is twice of xx.

# Install

> npm i mbig

- add
- sub
- mul
- div

# Usage

$$
\frac{a}{b+c}+\frac{b}{a+c}+\frac{c}{a+b}=4
\text { ,find the smallest positive integer }
$$

```javascript
let [a, b, c] = [
  new Big('4373612677928697257861252602371390152816537558161613618621437993378423467772036'),
  new Big('36875131794129999827197811565225474825492979968971970996283137471637224634055579'),
  new Big('154476802108746166441951315019919837485664325669565431700026634898253202035277999')
  //=> a/(b+c) + b/(a+c) + c/(a+b) =  4
]
console.log(
  'a/(b+c) + b/(a+c) + c/(a+b) = ',
  +a
    .div(b.add(c))
    .add(b.div(a.add(c)))
    .add(c.div(a.add(b))) + ''
)
```

```javascript
let r = new Big(1) // new Big(Number or String ,dp as Decimal precision)
r.dp = 7
console.log(r.div('-45') + '', -0.0222222)
```

```javascript
let r = new Big('0.0000000000000000054711199148498021943923959', 48)
console.log(r.div('1272081315518854327.889613539682731') + '')
// 4.300919955434e-36
```

```javascript
const { Big } = require('mbig')

function compoundInterest(amount, apr, startTime) {
  let diff = ((new Date() - startTime) / 1000) | 0
  let minSpend = 7200
  let secOfYear = 31536000
  let spend = diff < minSpend ? minSpend : diff
  let subNum = new Big(apr).div(secOfYear).add(1)
  return new Big(amount).mul((+subNum) ** spend).mul(1e18) + ''
}
console.log(compoundInterest(1, 1, new Date() - 31536000 * 1000))
```

> npm test

> 5500+ pass
