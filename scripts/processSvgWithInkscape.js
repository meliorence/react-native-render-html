const { Readable } = require('stream');
const childProcess = require('child_process');

function promiseFromChildProcess(child) {
  let data = [];

  return new Promise(function (resolve, reject) {
    child.stdout.on('data', (c) => data.push(c));
    child.on('error', reject);
    child.on('exit', () => {
      resolve(data.join(''));
    });
    child.on('end', () => {
      resolve(data.join(''));
    });
  });
}

async function processSvgWithInkscape(svgSource) {
  const svgStream = Readable.from([svgSource]);
  const child = childProcess.exec(
    'inkscape -p -l -D --export-type=svg -T -o -'
  );
  svgStream.pipe(child.stdin);
  return promiseFromChildProcess(child);
}

module.exports = processSvgWithInkscape;
