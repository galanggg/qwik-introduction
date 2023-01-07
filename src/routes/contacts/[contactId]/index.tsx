import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { Contact, CONTACTS } from "../fake-db";

export const onGet: RequestHandler<Contact> = async (ctx) => {
    return  CONTACTS.filter((c) => c.id === ctx.params.contactId)[0]
}

export default component$(() => {
    const endpoint = useEndpoint<typeof onGet>()
    return (
        <div>
            <Resource
                value={endpoint}
                onPending={() => <>Loading...</>}
                onResolved={(c) => {
                    return (
                        <div>
                            <a href="/contacts/">[Back]</a>
                           [<a href={`/contacts/${c.id}/edit/ `}>Edit</a>]
                            <div>
                                <img src={c.avatar} />
                                <span> {c.name}</span>
                            </div>
                        </div>
                    )
                }}
            />
        </div>
    )
})
