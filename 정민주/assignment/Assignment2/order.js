function order(id, name, menus){
    console.log('주문번호: ' + id)
    console.log('주문자: ' + name)
    for (menu of menus){
        console.log(menu[0] + '\t' + menu[1] + '개\t')
    }
    console.log('\n')
}
module.exports = order;