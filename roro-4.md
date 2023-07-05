연습문제

DOM 업데이트와 비지니스 규칙은 분리되었는가?
- add_item에서 더이상 DOM 업데이트를 직접 하지 않음
전역변수가 없어졌는가?
- 전역변수 대신에 함수 인자로 값들을 넘기고 return값으로 업데이트 함
전역변수에 의존하지 않는가?
- 전역변수 대신에 함수 인자로 값들을 넘기고 return값으로 업데이트 함
DOM을 사용할 수 있는 곳에서 실행된다고 가정하면 안됩니다.
- DOM을 사용하지 않음 
함수가 결괏값을 리턴하는가?
- return함

계산 추출
1. 계산 코드를 찾아 빼냅니다.
2. 암묵적 입력과 출력을 찾습니다.
3. 압묵적 입력은 인자로 암묵적 출력은 리턴값으로 바꿉니다.

연습문제2
function update_tax_dom() {
    var tax = calc_tax(shopping_cart_total)
    set_tax_dom(tax)
}

function calc_tax(total) {
    return total * 0.1
}

연습문제3
function update_shipping_icons() {
    var buy_buttons = get_buy_buttons_dom()
    for(var i = 0; i< buy_buttons.length; i++>) {
        var button = buy_button[i]
        var item = button.item;
        if (is_show_free_shipping_icon(item, shopping_cart_total)) {
            button.show_free_shipping_icon();
        } else {
            button.hide_free_shipping_icon();
        }
    }
}

function is_show_free_shipping_icon(item, total) {
    return item.price + total > 20
}

array.slice()
배열의 복사 참조할 문서
https://medium.com/watcha/%EA%B9%8A%EC%9D%80-%EB%B3%B5%EC%82%AC%EC%99%80-%EC%96%95%EC%9D%80-%EB%B3%B5%EC%82%AC%EC%97%90-%EB%8C%80%ED%95%9C-%EC%8B%AC%EB%8F%84%EC%9E%88%EB%8A%94-%EC%9D%B4%EC%95%BC%EA%B8%B0-2f7d797e008a

slice 사용시 shallow copy가 일어나므로 중첩된 배열이나 객체에 대해서는 deep copy가 일어나지 않음
