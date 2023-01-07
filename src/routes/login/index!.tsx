import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";

export interface Login {
    username: string;
    password: string;
    error: string
}

export const onGet: RequestHandler<Login> = async() => {
    return {
        username: '',
        password: '',
        error: '',
    }
}

export const onPost: RequestHandler<Login> = async ({request, response, cookie}) => {
    const formData = await request.formData()
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    if(username === 'admin' && password === 'admin') {
        cookie.set('contact-login', 'true', {
            path: '/'
        })
        throw response.redirect("/contacts/")
    }
    return {
        username: username,
        password: password,
        error: 'invalid username or password'
    }
}

export default component$(() => {
    const endpoint = useEndpoint<typeof onGet>()
    return (
        <Resource
            value={endpoint}
            onResolved = {(login) => (
            <form method="POST">
                {login.error && <div>{login.error}</div>}
                <label>Username</label>
                <input type="text" name="username" value={login.username} placeholder="Username" />
                <label>Password</label>
                <input type="password" name="password" value={login.password} placeholder="Password" />
                <button>Login</button>
            </form>
        )}/>
    )
})
