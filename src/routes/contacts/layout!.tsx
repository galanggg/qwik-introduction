import { component$, Slot } from '@builder.io/qwik';
import Header from '../../components/header/header';

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
