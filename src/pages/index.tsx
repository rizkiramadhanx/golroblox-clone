import { Footer, Navbar } from "@/component/layout";
import { Benefit, DataCount, Hero } from "@/component/page/home";
import { Button } from "@mantine/core";

export default function Index() {

  return (<><Navbar /><Hero /><DataCount /><Benefit /><Footer/><Button/></>)
}