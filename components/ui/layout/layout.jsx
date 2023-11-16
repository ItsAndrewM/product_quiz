import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>PSL Product Finder</title>
        <meta name="description" content="Precision Sail Loft Product Finder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
