/** @type {import('next').NextConfig} */
const path = require('path')

const withTM = require('next-transpile-modules')([
    '@mui/material',
   '@mui/system',
    '@mui/icons-material', // If @mui/icons-material is being used
  ]);
  const TM = withTM({
    webpack: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
       '@mui/styled-engine': '@mui/styled-engine-sc',
       };
       return config;
     }
   });
module.exports = {
  ...TM,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
