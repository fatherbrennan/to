<script>
  import { Footer, Header, Main } from '$lib/components';
  import '../app.css';

  const { children } = $props();
</script>

<Header />

<Main>
  {@render children()}
</Main>

<Footer />
