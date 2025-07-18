import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

const AIResponsePreview = ({ content }) => {

console.log("Received content:", content);

  return (
    <div className="max-w-4xl mx-auto px-4 prose prose-slate dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={atomOneLight}
                PreTag="div"
                className="rounded-md p-3 bg-gray-100"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-100 rounded px-1">{children}</code>
            );
          },
          h2({ children }) {
            return <h2 className="text-xl font-bold mt-6">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-semibold mt-4">{children}</h3>;
          },
          ul({ children }) {
            return <ul className="list-disc ml-5 mt-2">{children}</ul>;
          },
          p({ children }) {
            return <p className="my-2 leading-relaxed">{children}</p>;
          }
        }}
      >
       {content.explanation}
      </ReactMarkdown>
    </div>
  );
};

export default AIResponsePreview;
