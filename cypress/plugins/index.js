/// <reference types="cypress" />

// simple one-shot bundling mode
// https://esbuild.github.io/api/#js-specific-details
const esbuild = require('esbuild')

const timings = {}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', (inFile) => {
    // console.log('processing file %o', inFile)

    timings[inFile.filePath] = + new Date()

    return esbuild.build({
      entryPoints: [inFile.filePath],
      bundle: true,
      outfile: inFile.outputPath,
    }).then(value => {
      if (value.warnings && value.warnings.length) {
        console.warn(value.warnings)
      }

      const finished = + new Date()
      if (timings[inFile.filePath]) {
        const elapsed = finished - timings[inFile.filePath]
        console.log('bundling %s took %dms', inFile.filePath, elapsed)
      }
      return inFile.outputPath
    })
    .catch((err) => {
      console.error(err)
    })

  })
}
