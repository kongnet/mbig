const { Big } = require('./index.js')
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
