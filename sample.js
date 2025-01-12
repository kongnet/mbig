const { Big } = require('./index.js')
const $ = require('meeko')
let r = new Big('0.0000000000000000054711199148498021943923959', 48)
console.log(r.div('1272081315518854327.889613539682731') + '')

r = new Big(-99.99)
console.log(r.div(0.01) + '', -9999)
r = new Big(100)
console.log(r.div(100) + '', 1)
r = new Big(100)
console.log(r.div(0.01) + '', 10000)
r = new Big(0.001)
console.log(r.div(0.01) + '', 0.1)

r = new Big(-0.00023432495704937)
console.log(r.div(0.00023432495704937) + '', -1)

r = new Big(1)
r.dp = 7
console.log(r.div('-45') + '', -0.0222222)

r = new Big(-998.000001)
console.log(r.div(1) + '', -998.000001)

r = new Big('-5.54107604714186288144437e+7')
console.log(r.sub('-4.96270174556976430531733658389e+25') + '')

let [a, b, c] = [
  new Big('4373612677928697257861252602371390152816537558161613618621437993378423467772036'),
  new Big('36875131794129999827197811565225474825492979968971970996283137471637224634055579'),
  new Big('154476802108746166441951315019919837485664325669565431700026634898253202035277999')
]
console.log(
  'a/(b+c) + b/(a+c) + c/(a+b) = ',
  +a
    .div(b.add(c))
    .add(b.div(a.add(c)))
    .add(c.div(a.add(b))) + ''
)
