# CS2Crosshair

CS2Crosshair is a simple package for decoding/encoding CS:GO (and CS2!) crosshairs using game share codes.
All share codes are fully compatible with CS:GO/CS2.

Find the best pro crosshairs using [CS2Flow](https://cs2flow.com/crosshairs)

```ts
import { Crosshair } from 'cs2crosshair';

const myCrosshair = Crosshair.decode('CSGO-ZEw8O-KGXNu-4TTUU-VyXbD-SBCtG');
console.log(myCrosshair.gap); // -3

myCrosshair.size += 5;
myCrosshair.recoil = true; // exclusive to CS2
console.log(myCrosshair.encode()); // CSGO-hbBNp-7jd43-34SWO-9ck6v-p4FyB

console.log(myCrosshair.csgoCommands); // ['cl_crosshairgap -3', ..., 'cl_crosshairdot 0', ...]
console.log(myCrosshair.cs2Commands);  // ['cl_crosshairgap -3', ..., 'cl_crosshairdot false', ...]
```
