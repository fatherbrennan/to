export const OpenGraph = {
  Description: 'description',
  Image: 'image',
  ImageAlt: 'image:alt',
  ImageHeight: 'image:height',
  ImageType: 'image:type',
  ImageWidth: 'image:width',
  Locale: 'locale',
  Title: 'title',
  Type: 'type',
  Url: 'url',
} as const;

export const openGraphMeta = <TProperty extends (typeof OpenGraph)[keyof typeof OpenGraph], TContent extends string>(
  property: TProperty,
  content: TContent,
) => ({
  content,
  property: `og:${property}` as const,
});
