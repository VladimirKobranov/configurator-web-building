function Footer() {
  return (
    <footer className="fixed bottom-3 left-1/2 z-20 -translate-x-1/2 text-xs text-muted-foreground/70">
      <a
        className="underline-offset-4 hover:text-muted-foreground hover:underline"
        href="https://github.com/VladimirKobranov"
        target="_blank"
        rel="noreferrer"
      >
        VK {new Date().getFullYear()}
      </a>
    </footer>
  );
}

export default Footer;
