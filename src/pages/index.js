import { Inter } from "next/font/google";
import ChatComponent from "./components/ChatComponent";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <Head>
          <title>Chat App </title>
        </Head>
        <h1>Chat App Next</h1>
        <hr/>
        <ChatComponent />
        <br/>

        <a href='http://localhost:3000/chart' class="button" >Acesse o Gráfico</a>
      </div>
    </main>
  );
}
