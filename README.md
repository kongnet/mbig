# mbig

- Code only 100 lines, can be shorter...
- Easy bigDecimal use bigInt.
- Use Big.JS's tests pass all add,sub,mul. div RM only truncation mode, support dp setting.
- Integer e+21, decmail e-7, use Scientific notation.
- Performance is twice of xx.

> npm i mbig

- add
- sub
- mul
- div

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

> npm test
