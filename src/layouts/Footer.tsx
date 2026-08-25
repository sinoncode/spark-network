export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-14 items-center justify-between text-sm text-muted-foreground">
        <a href="https://2morrow-re.ch/" rel="noopener noreferrer" className="hover:underline">
         <span>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-foreground">Spark Network</span>. All
            rights reserved.
          </span>
        </a>
        <span>
          Built  by{" "}
          <span className="font-medium text-foreground"><a href="https://www.networsys.com/" rel="noopener noreferrer" className="hover:underline">Networsys Technologies</a></span>
        </span>
      </div>
    </footer>
  )
}
