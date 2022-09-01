import { ContentfulImageParams, contentfulLoader } from './nextContentfulLoader';

const urls = [
  'https://www.example.com',
  'https://www.example.com/',
  'https://www.example.com/picture',
  'https://www.example.com/picture.jpg',
  'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F220517073525-covid-home-test-us-050222-file.jpg',
  'https://firebase.google.com/static/images/products/test-lab/test-lab-2.png',
  'https://www.bhf.org.uk/-/media/images/information-support/heart-matters/2018/august-2018/medical/heartmatters_mental-test_wdi_0918_noexp_300x196.jpg',
  'https://1.cms.s81c.com/sites/default/files/2020-02-27/infosphere-optim-test-data-orchestrator-video.jpg',
];

const allParams: ContentfulImageParams = {
  ar: '16:9',
  bg: 'none',
  f: 'faces',
  fl: 'progressive',
  r: 'max',
  w: 1000,
  h: 400,
  fit: 'fill',
  fm: 'webp',
  q: 75,
};
const someParams: ContentfulImageParams = { w: 1000, h: 400, fit: 'fill', fm: 'webp', q: 75 };
const noParams: ContentfulImageParams = {};

const paramsSeries: ContentfulImageParams[] = [allParams, someParams, noParams];

describe('Contentful Loader', () => {
  let i = 0;
  for (const params of paramsSeries) {
    for (const url of urls) {
      test(`no duplicate query params in url: ${i + 1}`, () => {
        const loaderString = contentfulLoader({ src: url, width: params.w || 1000, quality: params.q || 50 }, params);

        const arr = loaderString.split('').filter((char) => char === '?');
        if (arr.length > 1) console.log(loaderString);

        expect(arr.length).toBe(1);
      });
      i++;
    }
  }

  test('`quality` property is properly set with default props', () => {
    const loaderString = contentfulLoader({ src: urls[0], width: 1000 });

    expect(loaderString.includes('q=75')).toBeTruthy();
  });

  test('`quality` property is properly set with non-default props', () => {
    const loaderString = contentfulLoader({ src: urls[0], width: 1000, quality: 50 });

    expect(loaderString.includes('q=50')).toBeTruthy();
  });

  test('quality property is properly set with additional quality options that are the same', () => {
    const loaderString = contentfulLoader({ src: urls[0], width: 1000, quality: 50 }, { q: 50 });

    expect(loaderString.includes('q=50')).toBeTruthy();
  });

  test('`quality` is not set, but `q` is in the Contentful params', () => {
    const loaderString = contentfulLoader({ src: urls[0], width: 1000 }, { q: 100 });

    expect(loaderString.includes('q=100')).toBeTruthy();
  });
});
