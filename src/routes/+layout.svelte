<script lang="ts">
import { onMount } from 'svelte';
import { iniApp, setApp, updAppWidth } from '$lib/contexts/app';
import { iniLocalStorage, rwLocalStorage, setLocalStorage, wLocalStorage } from '$lib/contexts/local-storage';
import '../app.css';
import type { LayoutProps } from './$types';

let { data, children }: LayoutProps = $props();
const local = $state(iniLocalStorage());
const app = $state(iniApp());
let innerWidth = $state(0);
setApp(app);
$effect(() => updAppWidth(innerWidth));
setLocalStorage(local);
$effect(() => wLocalStorage(local));
onMount(() => rwLocalStorage());
</script>

<svelte:head>
  <link href={page.url.href} rel="canonical" />
  <meta content={APP_NAME} name="apple-mobile-web-app-title" />
</svelte:head>

<svelte:window bind:innerWidth />

<Header />

<Main>
  {@render children()}
</Main>

<Footer />
