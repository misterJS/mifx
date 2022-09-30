import { checkCookies, setCookie } from "cookies-next";
import Link from "next/link";
import Router from "next/router";
import { memo, useState } from "react"
import Textfield from "../../components/textfield";

const signin = async (email: string, password: string) => {
    const response = await fetch('https://fe.dev.dxtr.asia/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    if (response.status !== 200) {
        throw new Error(await response.text())
    }

    return response.json();
}

const LoginMemo = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        setError("");

        const emailValue = email
        const passwordValue = password

        try {
            const signIn = await signin(emailValue, passwordValue)
            setCookie('token', signIn.token)
            
            Router.push('/')
        } catch (error: any) {
            console.error(error)
            setError(error.message)
        }
    }

    return (
        <div className="flex justify-center h-screen">
            <div className="border border-solid border-gray-300 rounded-md self-center px-6 py-4 text-center">
                <h1>Login</h1>
                <form className="flex-col flex gap-5 my-3" onSubmit={handleSubmit}>
                    <Textfield label="Email" type="text" onChange={setEmail} value={email} />
                    <Textfield label="Password" type="password" onChange={setPassword} value={password} />
                    <button className="bg-cyan-600 text-gray-50 py-2 rounded-md" type="submit">Sign In</button>
                </form>
                {error &&
                    <p className="text-red-700">{error}</p>
                }
                <p>doesn't have an account? register <Link href="/auth/register">here</Link></p>
            </div>
        </div>
    )
}

export async function getServerSideProps({ req, res }: any) {
    if (checkCookies("token", { req, res })) {
        return {
            redirect: { destination: "/", permanent: false },
        };
    } else {
        return {
            props: {},
        };
    }
}

export default memo(LoginMemo);