import { useEffect, useRef, useState } from "react";
import Linkify from "linkify-react";

interface Props {
  content: string;
}

function PostContent({ content }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const linkifyOptions = {
    attributes: {
      class:
        "text-blue-600 hover:text-blue-800 font-semibold underline transition-colors duration-200",
    },
    target: "_blank",
    rel: "noopener noreferrer",
  };

  useEffect(() => {
    if (!contentRef.current) return;

    setShowButton(
      contentRef.current.scrollHeight > contentRef.current.clientHeight,
    );
  }, [content]);

  return (
    <>
      <div ref={contentRef} className={expanded ? "" : "line-clamp-4"}>
        <Linkify options={linkifyOptions}>{content}</Linkify>
      </div>
      {showButton && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
    </>
  );
}

export default PostContent;
