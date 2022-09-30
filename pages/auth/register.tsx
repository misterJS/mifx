import Link from "next/link";
import { memo, useState } from "react"
import Textfield from "../../components/textfield";

const RegisterMemo = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex justify-center h-screen">
            <div className="border border-solid border-gray-300 rounded-md self-center px-6 py-4 text-center">
                <h1>Register</h1>
                <form className="flex-col flex gap-5 my-3">
                    <Textfield label="Email" type="text" onChange={setEmail} value={email} />
                    <Textfield label="Name" type="text" onChange={setName} value={name} />
                    <Textfield label="Password" type="password" onChange={setPassword} value={password} />
                    <button className="bg-cyan-600 text-gray-50 py-2 rounded-md" type="submit">Sign Up</button>
                </form>
                <p>already have an account? sign in <Link href="/auth/login">here</Link></p>
            </div>
        </div>
    )
}

export default memo(RegisterMemo);