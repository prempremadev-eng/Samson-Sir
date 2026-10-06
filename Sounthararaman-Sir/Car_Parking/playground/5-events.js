const EventEmitter = require('events');
const hotel = new EventEmitter();

hotel.on('customer', () => {
  console.log('Vanakkam! 🙏');
});

console.log('Hotel open');
hotel.emit('customer');


hotel.on('order', (food) => {
  console.log('Order vandhuchu:', food);
});

hotel.emit('order', '🥞 Dosai');
hotel.emit('order', '🍚 Idli');

const req = new EventEmitter();
let box='';

req.on('data',(chunk)=>{
    console.log('Thundu vanthuchu:', chunk)
    box +=chunk;
})
req.on('end',(chunk)=>{
    console.log('Ellam vanthuchu full :', box)
})

req.emit('data', '{"name":');
req.emit('data', '"prem"}')
req.emit('end');