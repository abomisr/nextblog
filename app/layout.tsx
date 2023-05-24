import "@styles/globals.css"

import Nav from "@components/Nav"
import Provider from "@components/Provider"

export const metadata = {
  title: "NextBlog",
  description: "NextBlog",
}


const RootLayout = ({children}:{children:JSX.Element})=>{
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/assets/images/logo.png" type="image/x-icon" />
      <body>
      <Provider>
        <>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
        </>
      </Provider>
      </body>
    </html>
  )
}


export default RootLayout