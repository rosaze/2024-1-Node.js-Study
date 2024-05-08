const order = require('./order')
const orderData = require('./orderData.json').Orders

for (data of orderData){
    order(data.id, data.orderer, data.menu)
}

