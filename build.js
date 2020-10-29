require('esbuild').build({
  entryPoints: ['src/app.jsx'],
  bundle: true,
  outfile: 'out.js',
}).catch(() => process.exit(1))
