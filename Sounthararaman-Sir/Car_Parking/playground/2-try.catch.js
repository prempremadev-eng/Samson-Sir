const badText='{"name":"prem"}';
console.log('Start');

try {
  const obj = JSON.parse(badText);
  console.log(obj.name);
} catch (err) {
  console.log('JSON thappu:', err.message);
}

console.log('End');