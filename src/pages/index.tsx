import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import MainLayout from "../components/MainLayout";

import { api } from "../utils/api";

const Home: NextPage = () => {

  const handleSignIn = () => {
    void signIn('discord')
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit laudantium, ex quae obcaecati dolores dolorum expedita pariatur magnam autem excepturi nobis labore voluptate quia inventore mollitia molestiae quisquam fuga quidem!</div>

        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam incidunt dicta officia, labore eveniet tempore tenetur inventore veritatis sunt magni ratione sint ipsa quidem doloribus deserunt assumenda id quibusdam quia.
          Repellendus fugiat ratione temporibus id ea ad eum est odio! Corrupti mollitia vel tempore atque facilis fuga doloribus, impedit quidem quibusdam officiis distinctio, dicta aut aperiam nostrum quasi omnis commodi!
          Perspiciatis qui molestias repudiandae ducimus corporis fugit in? Beatae quam numquam enim saepe quibusdam cupiditate nam temporibus. Est numquam fuga tenetur eius omnis recusandae saepe rem eaque. Eum, hic quam.
          Expedita, possimus quis aut iure doloremque ullam quas fugiat pariatur dicta vitae harum, voluptatum amet dolorem incidunt est facere exercitationem, quae quibusdam enim explicabo provident totam labore. Repudiandae, perspiciatis officia.
          Nulla dolorem nisi eum. Assumenda, dolorem. Aspernatur sequi, at necessitatibus, nihil repudiandae nisi earum voluptatum impedit culpa cupiditate quidem veritatis tempore nobis. Voluptatem doloremque magnam facilis delectus, rerum quisquam deserunt.
          Cum omnis iste distinctio minus laborum, veritatis quos praesentium nobis consequuntur culpa, recusandae quia eos suscipit fugit natus molestiae dolor quis voluptate autem pariatur neque maxime ipsa fugiat corporis. Cumque.
          Quibusdam temporibus cupiditate enim at harum? Incidunt, autem quae, similique quos fuga consequuntur vero eos porro doloribus eligendi iusto non, recusandae cum sequi. Quam laudantium voluptatem itaque eaque tempora officia.
          Delectus ipsum, voluptate laudantium repellendus tempore voluptas provident odit praesentium omnis repudiandae voluptates quia expedita ratione similique deleniti id repellat sequi, debitis ab exercitationem! Necessitatibus at a autem id ducimus?
          Hic aliquid expedita voluptates! Esse incidunt velit ut maiores ratione rem sequi, rerum recusandae asperiores itaque aspernatur consequatur molestias mollitia quibusdam modi quas saepe necessitatibus! Voluptatibus accusantium voluptatum consectetur laboriosam?
          Eos dolore nihil corporis qui, quidem aliquam quas aperiam non voluptas cupiditate harum nobis ipsam magnam, ullam eveniet accusantium esse dignissimos quisquam quod quae. Nam laboriosam recusandae possimus similique provident?</div>
      </MainLayout>
    </>
  );
};

export default Home