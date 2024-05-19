import { Footer, Navbar } from "@/component/layout";
import { Benefit, DataCount, Hero } from "@/component/page/home";
import Head from "next/head";

export default function Index() {

  return (<>
    <Head>
      <title>{process.env.NEXT_PUBLIC_NAME_WEBSITE}</title></Head>
    <Navbar /><Hero /><DataCount /><Benefit /><Footer /></>)
}