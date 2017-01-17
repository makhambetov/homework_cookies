var now = new Date();
var backet = document.getElementById('backet');
var btnBuy = document.querySelectorAll('.block button');
var backetText = document.getElementById('backet');
var price = document.getElementsByClassName('price');
var cur = document.getElementsByClassName('cur');

console.log(price[0].innerText)
function buy(btns){
    btns = btns || [];
    for(var i = 0; i < btns.length; i++){
        btns[i].onclick = function(){
            var bvalue = this.getAttribute('value')+ ";" + this.previousElementSibling.innerText;
            console.log(bvalue);
            set_cookie(this.getAttribute('name'), bvalue,
                now.getFullYear(), now.getMonth(), now.getDate()+2);
            count++;
            backetText.children[0].children[0].innerText = 'В корзине товаров: ' + count;
            this.setAttribute('disabled', '');
            this.innerText = 'В корзине';
            this.previousElementSibling.innerText = '';
            this.previousElementSibling.previousElementSibling.innerText = '';
        }
    }
}

buy(btnBuy);

//получаем значения куки в массив

var cookies = [];
for(var i = 0; i < btnBuy.length; i++){
    cookies.push(get_cookie('buy' + (i+1) ));
}

//если есть куки
var count = 0;
    for(var i = 0; i < cookies.length; i++) {
        if((typeof cookies[i]) == 'string') {
            btnBuy[i].setAttribute('disabled', '');
            btnBuy[i].innerText = 'В корзине';
            price[i].innerText = '';
            cur[i].innerText = '';
            count++;
            backetText.children[0].children[0].innerText = 'В корзине товаров: ' + count;
        }
    }
console.log(cookies);

