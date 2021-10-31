const hostile = require('hostile');

const domainName = `spout.local`;

hostile.set('127.0.0.1', domainName, function (err) {
  if (err) {
    console.error(
      `We were unable to modify your hosts file to add "${domainName}"`,
    );
    console.error(err);
    process.exit(1);
  } else {
    console.log(`Successfully set up local domain "${domainName}"`);
    process.exit(0);
  }
});
