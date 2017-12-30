const coinbinUrl = "https://coinbin.org/";
// API request objects
let top3Req = new XMLHttpRequest();

top3Req.open("GET", "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=3");
top3Req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let data = JSON.parse(this.responseText);
        let boxes = [ document.querySelector(".box-big"), document.querySelector(".box-medium"), document.querySelector(".box-small")];
        for ( let i=0; i<data.length; i++) {
            addDataToBox(data[i], boxes[i])
        };
        console.log(data);
    }
};
top3Req.send();

function addDataToBox (obj, box) {
    
    box.innerHTML =
    `<h3 class="box-title">${obj.name}</h3>
    <ul class="box-data">
        <li>Symbol: ${obj.symbol}</li>
        <li>Rank: ${obj.rank}</li>
        <li>Price $: ${Number(obj.price_usd).toFixed(2)}</li>
        <li>Price €: ${Number(obj.price_eur).toFixed(2)}</li>
        <li>Supply: ${obj.total_supply}</li>
    </ul>
    `
}
