import { checkCookies, getCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/router"
import { memo, useEffect, useState } from "react"
import { ShoppingCart } from "react-feather";
import ImageCollage from "../../components/image-collage";
import Rating from "../../components/rating";

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

const ProductDetailMemo = () => {
    const router = useRouter()
    const { id } = router.query
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            const filtered = data.filter((filteredProduct: any) => filteredProduct.id === id)
            setProducts(filtered)
        }

        fetchProducts()
    }, [])

    console.log(products);


    return (
        <div className="flex mx-6 my-6 flex-row gap-6 border-transparent shadow-md rounded-md py-6 px-6">
            <div className="w-5/6">
                <ImageCollage
                    images={products[0]?.images}
                />
            </div>
            <div className="w-2/5 py-6 px-6 flex flex-col gap-1">
                <p className="text-md text-red-600 font-semibold">SALE</p>
                <p className="font-bold text-xl mb-4">{products[0]?.name}</p>
                <div className="flex flex-row gap-1">
                    <Rating rating={products[0]?.rating} />
                    <p className="font-medium text-sm text-gray-500">[{products[0]?.reviewCount} reviews]</p>
                </div>
                <p className="font-bold text-xl mb-6">{products[0]?.price}</p>
                <div className="border-gray-200 border-t mb-10"></div>
                <div className="flex flex-row justify-between gap-3">
                    <button className="bg-yellow-300 font-semibold w-full py-2 px-3 rounded-md flex flex-row gap-2 justify-center"> <ShoppingCart size={25} /> Add to cart </button>
                    <button className="bg-green-600 text-white w-full font-semibold py-2 px-3 rounded-md"> Buy Now </button>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({ req, res }: any) {
    let tokenFromCookie;
    if (checkCookies("token", { req, res })) {
        // Check if there is a token between the browser and the server.
        // Get the cookie.
        // Set the session for Altogic's built in fetcher so we can send requests.
        // Get the current user from database.
        tokenFromCookie = getCookie("token", { req, res });

    } else {
        return {
            //If there is no token, redirect to sign-in page.
            redirect: { destination: "/auth/login", permanent: false },
        };
    }
    if (req.cookies) {
        //If a user is returned from database, pass it as props.
        return {
            props: { cookies: req.cookies },
        };
    } else {
        //If token is not active anymore, remove the cookie and redirect to sign-in page.
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

export default memo(ProductDetailMemo)