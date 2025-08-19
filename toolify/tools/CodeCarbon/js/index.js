class QBasicHelper {
  constructor() {
    this.keywords = new Set([
      "PRINT", "INPUT", "LINE INPUT", "LPRINT", "WRITE", "READ", "DATA", "RESTORE",
      "DIM", "LET", "CONST", "SHARED", "COMMON", "STATIC", "REDIM", "AS",
      "IF", "THEN", "ELSE", "ELSEIF", "ENDIF", "SELECT", "CASE", "FOR", "TO", "STEP", "NEXT",
      "DO", "LOOP", "WHILE", "WEND", "EXIT",
      "GOTO", "GOSUB", "RETURN", "ON", "END", "STOP", "RESUME", "CONTINUE",
      "SUB", "FUNCTION", "CALL", "END SUB", "END FUNCTION", "DECLARE",
      "MOD", "AND", "OR", "NOT", "XOR", "EQV", "IMP", "IS", "IN",
      "CHR$", "ASC", "LEFT$", "RIGHT$", "MID$", "LEN", "INSTR", "LTRIM$", "RTRIM$", "SPACE$",
      "STRING$", "VAL", "STR$", "UCASE$", "LCASE$",
      "ABS", "ATN", "COS", "EXP", "INT", "LOG", "RND", "SGN", "SIN", "SQR", "TAN", "FIX", "ROUND",
      "OPEN", "CLOSE", "INPUT#", "PRINT#", "WRITE#", "LINE INPUT#", "GET", "PUT", "EOF", "LOC",
      "LOF", "SEEK", "NAME", "KILL", "FILEATTR", "FIELD", "LOCK", "UNLOCK", "RESET",
      "BEEP", "CLS", "COLOR", "PSET", "LINE", "CIRCLE", "PAINT", "DRAW", "SCREEN",
      "VIEW", "WINDOW", "SOUND", "PLAY",
      "CLEAR", "CHAIN", "RUN", "SHELL", "TIMER", "TIME$", "DATE$", "FILES", "ENVIRON",
      "FRE", "PEEK", "POKE", "OUT", "INP",
      "REM", "TRACE", "ERROR", "ERL", "ERR"
    ]);
  }

  isKeyword(word) {
    return this.keywords.has(word.toUpperCase());
  }
}

CodeMirror.defineMode("qbasic-custom", function() {
  const qbasic = new QBasicHelper();

  return {
    startState: () => ({ inString: false, stringType: null }),
    token: function(stream, state) {
      if (state.inString) {
        if (stream.skipTo(state.stringType)) {
          stream.next();
          state.inString = false;
        } else {
          stream.skipToEnd();
        }
        return "string";
      }

      if (stream.eatSpace()) return null;

      if (stream.match(/REM\b/i, false) || stream.peek() === "'") {
        stream.skipToEnd();
        return "comment";
      }

      if (stream.peek() === '"') {
        stream.next();
        state.inString = true;
        state.stringType = '"';
        return "string";
      }

      if (stream.match(/^[0-9]+(\.[0-9]+)?/)) return "number";

      if (stream.match(/^[a-zA-Z_][\w\$]*/)) {
        const cur = stream.current().toUpperCase();
        return qbasic.isKeyword(cur) ? "keyword" : "variable";
      }

      stream.next();
      return null;
    },
    lineComment: "REM"
  };
});

const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "qbasic-custom",
  theme: "material",
  lineNumbers: true,
  lineWrapping: true,
  placeholder: "Write your QBasic code here..."
});

const container = document.getElementById("capture");

document.getElementById("bgColor").addEventListener("input", (e) => {
  const color = e.target.value;
  container.style.backgroundColor = color;
});

document.getElementById("font").addEventListener("change", (e) => {
  document.querySelector(".CodeMirror").style.fontFamily = e.target.value;
});

document.getElementById("exportBtn").addEventListener("click", () => {
  htmlToImage.toPng(container).then(dataUrl => {
    const link = document.createElement("a");
    link.download = "code.png";
    link.href = dataUrl;
    link.click();
  });
});

const copyBtn = document.getElementById("copyBtn");
copyBtn.addEventListener("click", () => {
  htmlToImage.toBlob(container).then(blob => {
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      copyBtn.disabled = true;
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.disabled = false;
      }, 2000);
    }).catch(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Failed!";
      copyBtn.disabled = true;
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.disabled = false;
      }, 2000);
    });
  });
});

let isResizing = false;
const resizeHandle = document.getElementById("resizeHandle");

resizeHandle.addEventListener('mousedown', () => isResizing = true);

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;

  const containerLeft = container.getBoundingClientRect().left;
  let newWidth = e.clientX - containerLeft;

  const minWidth = 340; // minimum width in px
  const maxWidth = window.innerWidth - 40; // max width with margin

  if (newWidth < minWidth) newWidth = minWidth;
  if (newWidth > maxWidth) newWidth = maxWidth;

  container.style.width = newWidth + 'px';
});

document.addEventListener('mouseup', () => {
  if (isResizing) isResizing = false;
});

const modeMap = {
  "javascript": "javascript",
  "python": "python",
  "htmlmixed": "htmlmixed",
  "css": "css",
  "xml": "xml",
  "text/x-basic": "vb",
  "vb": "vb",
  "text/x-csrc": "clike",
  "text/x-c++src": "clike",
  "text/x-java": "clike",
  "text/x-php": "php",
  "text/x-ruby": "ruby",
  "text/x-sql": "sql",
  "markdown": "markdown",
  "shell": "shell",
  "yaml": "yaml",
  "go": "go",
  "rust": "rust"
};

document.getElementById("language").addEventListener("change", async (e) => {
  const selected = e.target.value;
  if (selected === "qbasic-custom") {
    editor.setOption("mode", "qbasic-custom");
  } else {
    const modeScript = modeMap[selected];
    if (modeScript) {
      const scriptUrl = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/mode/${modeScript}/${modeScript}.min.js`;
      await loadScript(scriptUrl);
      editor.setOption("mode", selected);
    }
  }
});

function loadScript(url) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
