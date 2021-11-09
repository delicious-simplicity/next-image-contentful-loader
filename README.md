# @delicious-simplicity/next-image-contentful-loader

A comprehensive [Contentful](https://www.contentful.com/developers/docs/references/images-api) image loader for the [Next.js Image component](https://nextjs.org/docs/api-reference/next/image).

### Features

- Allows for native Contentful image params/options
- Similar error boundaries as `next/image`
- Additional options for managing the aspect ratio of requested images

### Usage

```tsx
import Image from "next/image";
import { contentfulLoader } from "@delicious-simplicity/next-image-contentful-loader";

const Component = ({ image }) => {
  return (
    <>
      <Image
        loader={(props) => contentfulLoader(props, { fit: "crop", ar: "1:1" })}
        src={image.url}
        alt={image.title}
        width={image.width}
        height={image.height}
      />
    </>
  );
};
```

### Required packages

- [`next`](https://www.npmjs.com/package/next)
