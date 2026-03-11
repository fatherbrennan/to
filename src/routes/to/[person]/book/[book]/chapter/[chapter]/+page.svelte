<script lang="ts">
  import type { GetContent } from '$lib/utils/url';
  const { data } = $props<{ data: { content: GetContent } }>();
</script>

<h1>/to/{data.content.personName}/book/{data.content.bookNumber}/chapter/{data.content.chapterNumber}</h1>
<pre>{JSON.stringify(data.content, null, 2)}</pre>
