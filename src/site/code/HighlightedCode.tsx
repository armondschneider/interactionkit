const keywords = new Set([
  "import", "export", "from", "default", "function", "return", "const", "let", "var",
  "if", "else", "async", "await", "new", "throw", "try", "catch", "type", "interface",
  "extends", "typeof", "as", "in", "of", "for", "while", "class",
]);

const colors = {
  keyword: "text-violet-700 dark:text-violet-400",
  string: "text-emerald-700 dark:text-emerald-400",
  name: "text-blue-700 dark:text-blue-400",
  value: "text-amber-700 dark:text-amber-300",
  comment: "text-neutral-500 dark:text-neutral-500",
  plain: "text-neutral-700 dark:text-neutral-300",
};

export default function HighlightedCode({ code, terminal = false }: { code: string; terminal?: boolean }) {
  if (terminal) {
    return code.split(/(\s+)/).map((token, index) => (
      <span key={index} className={index === 0 ? colors.keyword : token.startsWith("--") ? colors.value : colors.plain}>{token}</span>
    ));
  }

  // Tokenize strings and comments first so their contents aren't highlighted
  // as code. Render text nodes rather than injecting HTML.
  const tokens = [...code.matchAll(/\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$]*|\s+|./g)];

  return tokens.map((match, index) => {
    const token = match[0];
    const rest = code.slice(match.index + token.length);
    let color = colors.plain;
    if (token.startsWith("//") || token.startsWith("/*")) color = colors.comment;
    else if (/^["'`]/.test(token)) color = colors.string;
    else if (keywords.has(token)) color = colors.keyword;
    else if (/^(true|false|null|undefined|\d+(?:\.\d+)?)$/.test(token)) color = colors.value;
    else if (/^[A-Z]/.test(token) || (/^[A-Za-z_$]/.test(token) && /^\s*\(/.test(rest))) color = colors.name;
    else if (/^[A-Za-z_$]/.test(token) && /^\s*=(?!=|>)/.test(rest)) color = colors.value;
    return <span key={index} className={color}>{token}</span>;
  });
}
