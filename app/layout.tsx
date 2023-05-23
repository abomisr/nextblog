import "@styles/globals.css"

export const metadata = {
  title: "NextBlog",
  description: "NextBlog"
}


const RootLayout = ({children}:{children:JSX.Element})=>{
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          {children}
        </main>
      </body>
    </html>
  )
}


export default RootLayout