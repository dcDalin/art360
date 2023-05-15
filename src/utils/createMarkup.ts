import DOMPurify from 'dompurify';

export default function createMarkup(html: string | Node) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}
