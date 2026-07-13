const fs = require('fs');

const command = process.argv[2];

try {
  if (command === 'cat') {
    const filename = process.argv[3];
    const content = fs.readFileSync(filename, 'utf8');

    console.log(content);
  }

  else if (command === 'wc') {
    const filename = process.argv[3];
    const content = fs.readFileSync(filename, 'utf8');
    let lines = content.split('\n');

    if (content.endsWith('\n')) {
      lines.pop();
    }

    console.log('Number of lines: ' + lines.length);
  }

  else if (command === 'ls') {
    const folder = process.argv[3] || '.';
    const items = fs.readdirSync(folder);

    items.forEach((item) => {
      console.log(item);
    });
  }

  else if (command === 'head') {
    const number = Number(process.argv[3]);
    const filename = process.argv[4];
    const content = fs.readFileSync(filename, 'utf8');
    const lines = content.split('\n');

    const firstLines = lines.slice(0, number);

    console.log(firstLines.join('\n'));
  }

  else if (command === 'tail') {
    const number = Number(process.argv[3]);
    const filename = process.argv[4];
    const content = fs.readFileSync(filename, 'utf8');
    let lines = content.split('\n');

    if (content.endsWith('\n')) {
      lines.pop();
    }

    const lastLines = lines.slice(lines.length - number);

    console.log(lastLines.join('\n'));
  }

  else if (command === 'grep') {
    const word = process.argv[3];
    const filename = process.argv[4];
    const content = fs.readFileSync(filename, 'utf8');
    const lines = content.split('\n');

    const matches = lines.filter((line) => {
      return line.includes(word);
    });

    console.log(matches.join('\n'));
  }

  else if (command === 'tee') {
    const filename = process.argv[3];
    const text = process.argv.slice(4).join(' ');

    fs.writeFileSync(filename, text);

    console.log(text);
  }

  else if (command === 'findsave') {
    const word = process.argv[3];
    const inputFile = process.argv[4];
    const outputFile = process.argv[5];

    const content = fs.readFileSync(inputFile, 'utf8');
    const lines = content.split('\n');

    const matches = lines.filter((line) => {
      return line.includes(word);
    });

    const results = matches.join('\n');

    fs.writeFileSync(outputFile, results);

    console.log(results);
    console.log('Results saved to ' + outputFile);
  }

  else {
    console.log('Command not recognized.');
    console.log('Available commands: cat, wc, ls, head, tail, grep, tee, findsave');
  }
} catch (error) {
  console.log('Error: ' + error.message);
}
