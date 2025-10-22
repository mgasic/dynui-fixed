module.exports = {
  stories: [
    '../stories/**/*.stories.@(ts|tsx|mdx)',
    '!../stories/api/*.mdx'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  }
}
