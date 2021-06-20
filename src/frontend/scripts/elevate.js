const sudo = require('sudo-prompt');

const [, , scriptName] = process.argv;

console.log(
  '\nThis script requires elevated access. We will now prompt you for your password...\n'
);

sudo.exec(`node ${scriptName}`, { name: 'Spout' }, (error, stdout, stderr) => {
  if (error) throw error;
  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);
});
