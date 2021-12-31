require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const domainName = 'spout.dev';
const certsPath = '.dev/config/certs';

execSync('mkcert -install', {
	stdio: 'inherit',
});

fs.mkdirSync(path.join(process.cwd(), certsPath), { recursive: true });

execSync(
	`mkcert -cert-file ${certsPath}/local-cert.pem -key-file ${certsPath}/local-key.pem ${domainName}`,
	{
		stdio: 'inherit',
		cwd: process.cwd(),
	},
);