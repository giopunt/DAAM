module.exports = {
  siteMetadata: {
    title: `DAAM (dovevo andare al mia)`,
    description: `Fuorieventi milanesi della fiera che non c'è`,
    author: `@artebella`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Roboto Mono\:500`,
          `Averia Serif Libre`
        ],
        display: 'swap'
      }
    }
  ],
}
