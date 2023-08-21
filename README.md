# mbig

- code only 100 rows
- easy bigdecimal use bigInt
- use Big.JS's tests pass all add,sub,mul. div RM only truncation mode
- Performance is twice of xx

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

> npm test
