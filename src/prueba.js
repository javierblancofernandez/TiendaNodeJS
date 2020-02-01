const fecha = new Date();
let mes = fecha.getMonth();
console.log(mes);
var n=0;
if (mes === 0) {
    n = 0;
  }
setInterval(function() {
  console.log(n);
  n++;
}, 1500);

