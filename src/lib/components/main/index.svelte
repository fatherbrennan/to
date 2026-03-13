<script lang="ts">
  let { children } = $props();
</script>

<main class="grow min-h-main">
  {@render children?.()}
</main>
