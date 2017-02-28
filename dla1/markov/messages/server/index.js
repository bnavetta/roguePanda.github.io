const fs = require('fs');
const zlib = require('zlib');

const micro = require('micro');
const { MarkovGenerator } = require('./markov');

const json = micro.json;
const send = micro.send;

const generator = new MarkovGenerator(7, 100);

const sourceData = fs.readFileSync('./source.txt.gz');
zlib.inflate(sourceData, (err, buf) => {
    if (err) {
        console.error('Error deflating source data:', err);
    } else {
        generator.feed(buf.toString());
    }
});

const server = micro(async (req, res) => {
    let seed;
    try {
        const data = await json(req);
        seed = data['seed'];
    }
    catch (e) {}

    const message = generator.generate(seed);

    res.setHeader('Access-Control-Allow-Origin', '*');

    return { message };
});

server.listen(3000);
