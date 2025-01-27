"use client";

import MantineProvider from "./mantine";
import "@mantine/core/styles.css";

interface Props {
  children: React.ReactNode;
}

export default function Providers(props: Props) {
  return <MantineProvider>{props.children}</MantineProvider>;
}
