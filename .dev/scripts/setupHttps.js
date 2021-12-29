require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const domainName = `spout.local`;

execSync('mkcert -install', {
	stdio: 'inherit',
});

fs.mkdirSync(path.join(process.cwd(), '.dev/config/certs'), { recursive: true });

execSync(
	`mkcert -cert-file .dev/config/certs/local-cert.pem -key-file .dev/config/certs/local-key.pem '${domainName}'`,
	{
		stdio: 'inherit',
		cwd: process.cwd(),
	},
);