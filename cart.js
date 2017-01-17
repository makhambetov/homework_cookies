var list = document.getElementById('list');         //элемент для вывода списка товаров
var backetText = document.getElementById('backet'); //для вывода количества товаров в заголовке

//парсим куки. получаем массивы с именами, id товара и ценами:
var cookies = (document.cookie).split(';');
var names =  [];
var values = [];
var prices = [];
for (var i = 0; i < cookies.length; i++) {
    names[i] = (cookies[i].split('='))[0];
    values[i] = ((cookies[i].split('='))[1]).split('%3B')[0];
    prices[i] = ((cookies[i].split('='))[1]).split('%3B')[1];
}
/*console.log(cookies);
console.log(names);
console.log(values);
console.log(prices);*/

//если есть куки:
if(cookies.length) {
    count = cookies.length;
    var totalPrice = 0;
    for(var i = 0; i < cookies.length; i++) {
        //создаем список купленных товаров:
        var item = document.createElement('div');
        item.innerText = i+1 + ". Item id #" + values[i]+ " - " + '$' + prices[i];
        item.className = 'item';
        item.id = names[i] + '$' + prices[i];
        list.appendChild(item);
        totalPrice += +prices[i];

        //кнопка для удаления товара из корзины:
        var deleteItem = document.createElement('div');
        deleteItem.className = 'delete';
        item.appendChild(deleteItem);
        //обработчик клика на кнопку:
        deleteItem.onclick = function () {
            console.log(this.parentElement.parentElement);
            this.parentElement.remove();
            count--;
            backetText.children[0].children[0].innerText = 'В корзине товаров: ' + count;
            totalPrice -= +((this.parentElement.id).split('$')[1]);
            delete_cookie((this.parentElement.id).split('$')[0]);
            total.innerText = 'Итого: ' + '$' + totalPrice;
            if(!totalPrice) buy.setAttribute('disabled', '');
        }
    }

    //вывод итоговой суммы и кнопки для оплаты:
    var total = document.createElement('div');
    total.innerText = 'Итого: ' + '$' + totalPrice;
    total.className = 'total';
    list.appendChild(total);
    var buy = document.createElement('button');
    buy.innerText = 'Приступить к оплате';
    buy.id = 'buy';
    list.appendChild(buy);
    backetText.children[0].children[0].innerText = 'В корзине товаров: ' + cookies.length;
}


