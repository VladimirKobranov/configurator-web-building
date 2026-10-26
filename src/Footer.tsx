import { version } from "../package.json";

function Footer() {
  return (
    <>
      <footer className="fixed inset-x-0 bottom-3 z-20 text-center text-xs text-muted-foreground/70">
        <span className="absolute bottom-0 left-4">v{version}</span>
        <a
          className="underline-offset-4 hover:text-muted-foreground hover:underline"
          href="https://github.com/VladimirKobranov"
          target="_blank"
          rel="noreferrer"
        >
          VK {new Date().getFullYear()}
        </a>
      </footer>
    </>
  );
}

export default Footer;
