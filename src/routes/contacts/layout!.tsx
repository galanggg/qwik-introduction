import { component$, Slot } from '@builder.io/qwik';
import { RequestHandler } from '@builder.io/qwik-city';
import Header from '../../components/header/header';

export const onRequest: RequestHandler = async ({cookie, response, request}) => {
    if(!cookie.get('contact-login')) {
        throw response.redirect("/login/?redirect=" + request.url)
    }
}

export default component$(() => {
  return (
    <>
      <main>
          <h1>Contacts Demo</h1>
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer>
    </>
  );
});
