import { Footer, Navbar } from "@/component/layout";
import { Benefit, DataCount, Hero } from "@/component/page/home";
import ENV from "@/utils/env";
import Head from "next/head";

export default function Index() {

  return (<>
    <Head>
      <title>Partridge Castle</title>
    </Head>
    <Navbar /><Hero /><DataCount /><Benefit /><Footer /></>)
}