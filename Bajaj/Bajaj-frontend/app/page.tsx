import Head from "next/head";
import InputForm from "../components/InputForm";

export default function Home() {
  return (
    <div>
      <Head>
        <title>21BCE5383</title> 
      </Head>
      <main className="flex justify-center items-center min-h-screen">
        <InputForm />
      </main>
    </div>
  );
}
