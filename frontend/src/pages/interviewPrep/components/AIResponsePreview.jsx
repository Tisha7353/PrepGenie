import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { LuCopy, LuCheck } from 'react-icons/lu';
import { useState } from 'react';

SyntaxHighlighter.registerLanguage('javascript', js);

const AIResponsePreview = ({ content }) => {
  const [copied, setCopied] = useState(false);
  const [copiedCodeBlock, setCopiedCodeBlock] = useState(null);
  
  let markdownContent = '';
  
  if (typeof content === 'string') {
    markdownContent = content;
  } else if (content?.explanation) {
    markdownContent = typeof content.explanation === 'string' 
      ? content.explanation 
      : JSON.stringify(content.explanation);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  const handleCodeCopy = (code, index) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopiedCodeBlock(index);
        setTimeout(() => setCopiedCodeBlock(null), 2000);
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 prose prose-slate dark:prose-invert w-full relative">
      {/* Main copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
        title="Copy to clipboard"
      >
        
      </button>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            const index = node.position?.start.line; // Use line number as unique identifier
            
            return !inline && match ? (
              <div className="relative">
                <button
                  onClick={() => handleCodeCopy(codeString, index)}
                  className="absolute right-2 top-2 text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded flex items-center gap-1 transition-all"
                >
                  {copiedCodeBlock === index ? (
                    <>
                      <LuCheck className="text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <LuCopy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <SyntaxHighlighter
                  language={match[1]}
                  style={atomOneLight}
                  PreTag="div"
                  className="rounded-md p-3 bg-gray-100 mt-6"
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-gray-100 rounded px-1 relative group">
                {children}
                <button
                  onClick={() => handleCodeCopy(codeString, index)}
                  className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 text-xs bg-gray-200 hover:bg-gray-300 px-1 rounded flex items-center gap-1 transition-all"
                >
                  {copiedCodeBlock === index ? (
                    <LuCheck className="text-green-500 w-3 h-3" />
                  ) : (
                    <LuCopy className="w-3 h-3" />
                  )}
                </button>
              </code>
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
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default AIResponsePreview;