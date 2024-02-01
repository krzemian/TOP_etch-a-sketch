
const currentBgColor = 'hsl(123, 34%, 123%)';


const currentRGBValues = currentBgColor.match(/\d+/g).map((v) => Number.parseInt(v));

console.log(currentRGBValues);