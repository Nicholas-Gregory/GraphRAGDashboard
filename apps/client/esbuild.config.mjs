import * as esbuild from 'esbuild';

let ctx = await esbuild.context({
  entryPoints: ['./src/main.tsx'],
  bundle: true,
  outdir: './dist',
});

let { hosts, port } = await ctx.serve({ servedir: './dist' });

await ctx.watch();
console.log('ESBuild is watching for changes...', `http://${hosts[0]}:${port}`);