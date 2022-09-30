import { checkCookies, getCookie, removeCookies } from 'cookies-next'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const getCategories = async () => {
  let headers = new Headers();

  headers.set('Authorization', 'Bearer ' + getCookie('token'));

  const response = await fetch('https://fe.dev.dxtr.asia/api/category', {
    method: 'GET',
    headers: headers,
  })

  if (response.status !== 200) {
    throw new Error(await response.text())
  }

  return response.json();
}

const getProducts = async () => {
  let headers = new Headers();

  headers.set('Authorization', 'Bearer ' + getCookie('token'));

  const response = await fetch('https://fe.dev.dxtr.asia/api/products', {
    method: 'GET',
    headers: headers,
  })

  if (response.status !== 200) {
    throw new Error(await response.text())
  }

  return response.json();
}

const Home: NextPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();

      setCategories(data)
    }

    const fetchProducts = async () => {
      const data = await getProducts();

      setProducts(data)
    }

    fetchCategories()
    fetchProducts()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Mifx Test</title>
        <meta name="description" content="mifx test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-row gap-3 mt-4 w-full">
          <div className="flex flex-col gap-2 w-1/4">
            <p className="text-xl text-gray-700 font-semibold mb-1">Categories</p>
            <div className="flex flex-col gap-3 border-transparent shadow-md rounded-md py-4 px-4">
              <ul>
                {categories && categories.map((category: any) => <li className="py-3 px-2 cursor-pointer hover:bg-slate-500 hover:text-white rounded-md" key={category.id}>{category.name}</li>)}
              </ul>
            </div>
          </div>
          <div className="px-3 w-4/5">
            <p className="text-xl text-gray-700 font-semibold mb-3">Products</p>
            <div className="flex flex-wrap gap-x-8 gap-y-5">
              {products && products.map((product: any) => (
                <Link href={`/product/${product.id}`} key={product.id}>
                  <div className="border flex flex-col gap-2 hover:border-gray-300 border-transparent shadow-md rounded-md py-4 px-3 w-1/5 cursor-pointer">
                    <div className="text-center">
                      <Image
                        className="rounded-md"
                        src={product.image}
                        alt={product.name}
                        width={150}
                        height={150}
                        layout='fixed' />
                    </div>
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p style={{ WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', display: '-webkit-box', }} className="text-ellipsis overflow-hidden h-full">{product.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps({ req, res }: any) {
  let tokenFromCookie;
  if (checkCookies("token", { req, res })) {
    tokenFromCookie = getCookie("token", { req, res });

  } else {
    return {
      redirect: { destination: "/auth/login", permanent: false },
    };
  }
  if (req.cookies) {
    return {
      props: { cookies: req.cookies },
    };
  } else {
    removeCookies("token", {
      req,
      res,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    return {
      redirect: { destination: "/auth/login", permanent: false },
    };
  }
}

export default Home
