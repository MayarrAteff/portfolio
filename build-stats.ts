import { gzipSync } from 'node:zlib';

import type { Plugin, Rollup } from 'vite';

// Writes build-stats.json next to the build so the X-ray performance panel shows the real gzip size of what ships.
// "Initial" is the entry chunk plus everything it imports statically; dynamic imports count as lazy.
export function buildStats(): Plugin {
  return {
    name: 'build-stats',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const files = Object.values(bundle);
      const chunks = files.filter((file): file is Rollup.OutputChunk => file.type === 'chunk');
      const gzip = (source: string | Uint8Array) => gzipSync(source).length;
      const sum = (sizes: number[]) => sizes.reduce((total, size) => total + size, 0);

      const initial = new Set<string>();
      const visit = (fileName: string) => {
        if (initial.has(fileName)) return;
        initial.add(fileName);
        (bundle[fileName] as Rollup.OutputChunk).imports.forEach(visit);
      };
      chunks.filter((chunk) => chunk.isEntry).forEach((chunk) => visit(chunk.fileName));

      const stats = {
        initialJs: sum(chunks.filter((chunk) => initial.has(chunk.fileName)).map((chunk) => gzip(chunk.code))),
        lazyJs: sum(chunks.filter((chunk) => !initial.has(chunk.fileName)).map((chunk) => gzip(chunk.code))),
        css: sum(
          files
            .filter((file): file is Rollup.OutputAsset => file.type === 'asset' && file.fileName.endsWith('.css'))
            .map((file) => gzip(file.source)),
        ),
        builtAt: new Date().toISOString(),
      };

      this.emitFile({ type: 'asset', fileName: 'build-stats.json', source: JSON.stringify(stats) });
    },
  };
}
