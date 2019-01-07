# custom
定制工程Demo

####通过format来自动校验并生成可以使用的流水号
```
block(
       contractID=attr("Node Name"),
       seq=format("{0,number,000}",
          uniqueKey(contractID)),contractID+seq
   )
```
