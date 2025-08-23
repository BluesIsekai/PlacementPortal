/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: false,         // optional: no semicolons
  singleQuote: true,   // optional: use single quotes
  tailwindFunctions: ['clsx', 'cva'] // optional, helps with Tailwind utils
}
