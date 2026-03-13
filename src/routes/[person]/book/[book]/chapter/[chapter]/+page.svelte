<script lang="ts">
  import { Heading } from '$lib/components';
  const { data } = $props();
  const content = $derived(data.content);
</script>

<Heading level={1}>to {content.personName}</Heading>

<Heading level={2}>book {content.bookNumber}</Heading>
<Heading level={2}>chapter {content.chapterNumber}</Heading>
