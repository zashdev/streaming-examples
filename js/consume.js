const WebSocket = require('ws');
var parquet = require('parquetjs-lite');

const wss = new WebSocket('wss://stream.zash.sh', {
  headers: { 'x-api-key': 'YOUR_API_KEY' },
});

function process(trades) {
  // insert here your own custom processor
  console.log(trades);
}

wss.addEventListener('message', function (event) {
  const raw = Buffer.from(event.data, 'base64');
  read(raw).then(process).catch(console.error);
});

async function read(buffer) {
  let reader = await parquet.ParquetReader.openBuffer(buffer);
  let cursor = reader.getCursor();
  let record = null;
  let results = [];
  while ((record = await cursor.next())) {
    results.push(record);
  }
  return results;
}
