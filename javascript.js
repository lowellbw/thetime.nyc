
function theTimeInNYC(){
    document.querySelector('h2').textContent = Date.now();
}

var bool = moment().tz("America-new_york")
console.log(bool);
