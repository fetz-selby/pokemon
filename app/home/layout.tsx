const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <h1>My App</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2025 My App</p>
      </footer>
    </div>
  )
}

export default Layout
