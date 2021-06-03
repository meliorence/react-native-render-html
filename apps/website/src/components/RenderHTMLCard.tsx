import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import ReactModal from 'react-modal';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExpoSnippet from './ExpoSnippet';
import styles from './RenderHTMLCard.module.scss';

const ExpoLogo = ({ color, size }) => (
  <svg
    width="24"
    height="26"
    viewBox="0 0 24 26"
    style={{ width: size, height: size }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.069 10.075a2.273 2.273 0 00-.887-.74 2.296 2.296 0 00-2.237.16 2.265 2.265 0 00-.77.859 2.016 2.016 0 00.392 2.274 3.342 3.342 0 002.23-.63 3.289 3.289 0 001.271-1.923zM15.3 1.3l-1.45-.788-6.31 3.481.503.27.957.498 1.732-.954 4.569-2.523-.001.016zm.584-.24a.225.225 0 01.16.15l2.114 6.182a.205.205 0 01-.1.269 4.063 4.063 0 00-1.798 1.974 4.017 4.017 0 00-.175 2.655 4.283 4.283 0 001.755 2.332c.842.55 1.852.79 2.854.68a.269.269 0 01.262.16l2.184 6.345a.256.256 0 01-.101.278l-6.712 3.89a.253.253 0 01-.101.02.27.27 0 01-.181-.03L13.69 24.5a.234.234 0 01-.1-.1l-4.6-10.483-7.005 3.95a.327.327 0 01-.272.01l-1.592-.898a.23.23 0 01-.1-.299l6.805-12.8a.243.243 0 01.11-.099L13.721.03a.259.259 0 01.241 0l1.923 1.03zM7.47 4.499L7.14 4.33.58 16.71l1.197.668 5.657-7.335a.275.275 0 01.231-.1.282.282 0 01.201.149l6.16 14.066 1.646 1.007L9.06 6.005l-.281-.798-1.318-.718.01.01zm10.145 7.382a2.51 2.51 0 01.12-1.663 2.54 2.54 0 011.138-1.23 2.798 2.798 0 013.261.4 2.513 2.513 0 01.073 3.568l-.073.073a2.77 2.77 0 01-3.788.01 2.719 2.719 0 01-.731-1.158z"
      fill={color}
    />
  </svg>
);

const tabs = [
  { label: 'JSX Source', value: 'jsx' },
  { label: 'HTML Snippet', value: 'html' },
  { label: 'TRT Snapshot', value: 'snapshot' }
];

function ExpoModal({
  isOpen,
  onModalClose,
  ...props
}: {
  isOpen: boolean;
  onModalClose: any;
  expoSource: string;
  title: string;
  caption?: string;
  preferHtmlSrc: boolean;
  version: string;
  extraneousDeps: string[];
}) {
  const modalRef = useRef(null);
  useEffect(
    function fixClickOverlay() {
      const current = modalRef.current;
      current.node.addEventListener('click', onModalClose);
      return () => {
        current.node.removeEventListener('click', onModalClose);
      };
    },
    [onModalClose]
  );
  return (
    <ReactModal
      parentSelector={() => document.querySelector('body')}
      overlayClassName={styles.overlay}
      portalClassName={styles.portal}
      className={styles.modalContainer}
      isOpen={isOpen}
      onRequestClose={onModalClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      appElement={document.body}
      ref={modalRef}
      contentLabel="Expo Interactive Source">
      <ExpoSnippet className={styles.modalContent} {...props} />
      <button className={styles.modal__closeButton} onClick={onModalClose}>
        X
      </button>
    </ReactModal>
  );
}

export default function RenderHTMLCard({
  snippet,
  title,
  caption,
  html,
  preferHtmlSrc,
  snapshot,
  expoSource,
  ...props
}: PropsWithChildren<{
  snippet: string;
  expoSource: string;
  html: string;
  snapshot: string;
  title: string;
  caption?: string;
  preferHtmlSrc: boolean;
  version: string;
  extraneousDeps: string[];
}>) {
  const [isOpen, setIsOpen] = useState(false);

  const normalSnippet = decodeURIComponent(snippet);
  const normalExpoSource = decodeURIComponent(expoSource);
  const normalHtml = decodeURIComponent(html);
  const normalSnapshot = decodeURIComponent(snapshot);
  const onModalClose = useCallback(() => setIsOpen(false), []);

  return (
    <figure className={styles.figure}>
      <div className={styles.sourceContainer}>
        <div className={styles.sourceContainer__code}>
          {title && <div className={styles.figure__title}>{title}</div>}
          <div className={styles.sourceContainer__fixRadius}>
            <Tabs
              defaultValue={preferHtmlSrc ? 'html' : 'jsx'}
              title={title}
              values={tabs}>
              <TabItem value="html">
                <div className="codeblock--with-line-numbers">
                  <CodeBlock className="html">{normalHtml}</CodeBlock>
                </div>
              </TabItem>
              <TabItem value="jsx">
                <div className="codeblock--with-line-numbers">
                  <CodeBlock className="jsx">{normalSnippet}</CodeBlock>
                </div>
              </TabItem>
              <TabItem value="snapshot">
                <div className="codeblock--with-line-numbers">
                  <CodeBlock className="xml">{normalSnapshot}</CodeBlock>
                </div>
              </TabItem>
            </Tabs>
          </div>
        </div>
        <BrowserOnly>
          {() => (
            <ExpoModal
              isOpen={isOpen}
              onModalClose={onModalClose}
              {...props}
              expoSource={normalExpoSource}
              title={title}
              caption={caption}
              preferHtmlSrc={preferHtmlSrc}
            />
          )}
        </BrowserOnly>
        {caption && (
          <figcaption className={styles.caption}>{caption}</figcaption>
        )}
        <small
          style={!!caption ? { paddingTop: 'var(--ifm-leading)' } : {}}
          className={styles.notice}>
          Press on the button below to show how this code renders on your
          device.
        </small>
      </div>
      <div className={styles.expoBox}>
        <button
          onClick={() => setIsOpen(true)}
          className={`${styles.expoBox__button} button button--primary`}
          role="button">
          <ExpoLogo color="var(--ifm-button-color)" size={40} />
          <span className={styles.expoBox__span}>
            Run on Your Device with Expo
          </span>
        </button>
      </div>
    </figure>
  );
}
