// const now = new Date
// const buildVersion = `${now.getFullYear() - 2000}.${now.getMonth() + 1}.${now.getDate()}`

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  linux: {
    icon: 'buildResources/wolfram_cloud.svg',
    category: 'Science;Education;Math;NumericalAnalysis;DataVisualization;',
    target: [
      'deb',
      'pacman',
    ],
  },
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: [
    'packages/**/dist/**',
  ],
  // extraMetadata: {
  //   version: buildVersion,
  // },
}

module.exports = config
