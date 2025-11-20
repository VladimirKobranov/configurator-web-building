import React from "react";
import { Link, Text } from "@chakra-ui/react";
import style from "./Footer.module.css";

const d = new Date();
let year = d.getFullYear();

const link = () => (
  <Link href="https://github.com/VladimirKobranov">copyright VK</Link>
);

function Footer() {
  return (
    <Text className={style.footer} w="auto">
      {link()}&nbsp;|&nbsp;{year}
    </Text>
  );
}

export default Footer;
