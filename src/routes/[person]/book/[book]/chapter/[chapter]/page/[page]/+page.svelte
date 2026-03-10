<script lang="ts">
let { data } = $props();
const { person, book, chapter, page } = data;
</script>

<h1>{page.title}</h1>

<pre>{JSON.stringify(
    {
      person: person,
      book: book,
      chapter: chapter,
      page: page,
    },
    null,
    2,
  )}</pre>

{#each page.content as paragraph}
  <p>{paragraph}</p>
{/each}

<nav>
  <a href="../">Back to chapter</a>
</nav>
