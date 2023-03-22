/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './storage/framework/views/*.php',
      './resources/views/app.blade.php',
      './resources/js/**/*.vue',
      './resources/js/**/*.js',
      "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
      require('flowbite/plugin')

  ],
}
