import React from "react"
import { Helmet } from "react-helmet"

const Seo = ({ title }) => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="Fuorievento milanese della fiera che non c'è"></meta>
      <meta name="viewport"    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
      <meta property="og:url"           content="https://daam.it/" />
      <meta property="og:type"          content="website" />
      <meta property="og:title"         content={title} />
      <meta property="og:description"   content="Fuorievento milanese della fiera che non c'è" />
      <meta property="og:image"         content="/apple-touch-icon.png" />
      <meta name="msapplication-TileColor" content="#82e0fb"/>
      <meta name="theme-color" content="#82e0fb"></meta>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
    </Helmet>
  </div>
)

export default Seo
