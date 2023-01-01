import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { Contact, CONTACTS } from "../../fake-db";

interface ContactForm {
    contact: Contact;
    errors:  {[P in keyof Contact]?: string }
}

export const onGet: RequestHandler<ContactForm> = async (ctx) => {
    return  {
        contact: CONTACTS.filter((c) => c.id === ctx.params.contactId)[0],
        errors: {}
    }
}

export const onPost: RequestHandler<ContactForm> = async ({request, response}) => {
    const formData = await request.formData()
    const contact: Contact = {
        id: formData.get("id") as string,
        avatar: formData.get('avatar') as string,
        name: formData.get('name') as string,
        twitter: formData.get('twitter') as string,
        github: formData.get('github') as string,
        linkedin: formData.get('linkedin') as string,
    }
    const data = {
        contact: contact,
        errors: {}
    }

    const hasErrors = isRequired(contact, "name", data.errors)
    if(!hasErrors) {
        //save contact to db for example
        const existingContact = CONTACTS.find((c) => c.id === contact.id)
        existingContact && Object.assign(existingContact, contact)
        throw response.redirect("/contacts/" + contact.id  + "/")
    }
    return data
}

function isRequired(contact: Contact, field: keyof Contact, errors: Record<string, string>) {
    if(!contact [field]) {
        errors[field] = `The ${field} is Required  `
        return true
    }
    return false
}

export default component$(() => {
    const endpoint = useEndpoint<typeof onGet>()
    return (
        <div>
            <Resource
                value={endpoint}
                onPending={() => <>Loading...</>}
                onResolved={(data) => {
                    const c = data.contact
                    const errors = data.errors
                    return (
                        <form method="POST">
                            <input type="hidden" name="id" value={c.id} />
                            <input type="hidden"  name="avatar" value={c.avatar} />
                            <div>
                                [<a href={`/contacts/${c.id}/`}>Cancel</a>]
                                <div>
                                    {errors.name && <span>{errors.name}</span>}
                                    <img src={c.avatar} />
                                    <input name="name" value={c.name} />
                                    <input name="twitter" value={c.twitter} />
                                    <input name="github" value={c.github}   />
                                    <input name="linkedin" value={c.linkedin} />
                                </div>
                            </div>
                            <button>Submit </button>
                        </form>
                    )
                }}
            />
        </div>
    )
})
