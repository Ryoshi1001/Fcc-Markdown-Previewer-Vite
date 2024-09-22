import { marked } from 'marked';
import { useEffect, useState } from 'react';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import { FaCompressAlt } from 'react-icons/fa';
import { SiFreecodecamp } from 'react-icons/si';

import './App.css';

function App() {
  const [markdown, setMarkDown] = useState(``);
  const [editorFullScreen, setEditorFullScreen] = useState(false);
  const [previewFullScreen, setPreviewFullScreen] = useState(false);

  useEffect(() => {
    //bonus question to add breaks with setOptions()
    marked.setOptions({
      breaks: true,
    });
    pageLoad();
  }, []);

  const pageLoad = () => {
    const markdown = `# Heading for H1
## H2

### H3

#### H4

websiteLink for learning: 
[FreeCodeCamp](https://www.freecodecamp.org)

Inline code: \`console.log(data.error)\`

\`\`\`
const fetchData = async () => {
    try {
        const res = await fetch(api); 
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error)
    }
    return data; 
    } catch (error) {
      throw new Error(error.message);
    }
  }
\`\`\`

- List item 1
- List item 2

> This is a blockquote.

![Image](vite.svg)

**Bold text**`;
    setMarkDown(markdown);
  };
  const handleChange = (e) => {
    const text = e.target.value;
    setMarkDown(text);
  };

  const handleEditorResize = () => {
    setEditorFullScreen((prev) => !prev);
  };

  const handlePreviewResize = () => {
    setPreviewFullScreen((prev) => !prev);
  };

  return (
    <div className="appContainer">
      <div
        className="editorContainer"
        style={{
          height: editorFullScreen ? '100vh' : '180px',
          display: previewFullScreen ? 'none' : 'block',
        }}
      >
        <div className="editorLabel">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '.4em',
            }}
          >
            <SiFreecodecamp />
            Editor
          </div>
          <div>
            {editorFullScreen ? (
              <FaCompressAlt
                onClick={handleEditorResize}
                style={{ cursor: 'pointer' }}
                className="icon"
              />
            ) : (
              <FaExpandArrowsAlt
                onClick={handleEditorResize}
                style={{ cursor: 'pointer' }}
                className="icon"
              />
            )}
          </div>
        </div>
        <div className="textdiv">
          <textarea
            value={markdown}
            onChange={handleChange}
            className="editor"
            name="editor"
            id="editor"
          ></textarea>
        </div>
      </div>

      <div
        className="previewContainer"
        style={{
          display: editorFullScreen ? 'none' : 'block',
          height: previewFullScreen ? '100%' : 'auto',
        }}
      >
        <div className="previewLabel">
          <div>
            <SiFreecodecamp />
            Preview
          </div>
          <div>
            {previewFullScreen ? (
              <FaCompressAlt
                onClick={handlePreviewResize}
                style={{ cursor: 'pointer' }}
                className="icon"
              />
            ) : (
              <FaExpandArrowsAlt
                onClick={handlePreviewResize}
                style={{ cursor: 'pointer' }}
                className="icon"
              />
            )}
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
          className="preview"
          id="preview"
        ></div>
      </div>
    </div>
  );
}

export default App;
