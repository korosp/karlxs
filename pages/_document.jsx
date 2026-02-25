import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Dev Fullstack — Next.js, Express, Python" />
        <meta property="og:title" content="Dev Portfolio | Fullstack Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
