"use strict";

/*
  Econometrics Mastery annotations
  ---------------------------
  Local-only study annotations with resilient quote anchoring.
  - highlights
  - structured notes attached to selected passages
  - edit / delete / export handled by app.js
  - selections can span inline formatting inside one logical text block
*/
window.EM_Annotations = (() => {
  const KEY = "em_annotations_v1";
  const EXCLUDED = "mark,.lesson-tools,.source-chip,.lesson-source,.annotation-toolbar,.math-display,button,input,select,textarea,script,style";
  const BLOCK_SELECTOR = "p,li,h1,h2,h3,h4,blockquote,.example-scenario,.example-takeaway,.formula-guidance,.formula-trap,.priority-source-banner";

  const read = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch { return []; }
  };
  const write = rows => localStorage.setItem(KEY, JSON.stringify(rows));
  const all = () => read();
  const byLesson = lessonId => read().filter(x => x.lessonId === lessonId);
  const get = id => read().find(x => x.id === id) || null;

  const add = entry => {
    const rows = read();
    const now = new Date().toISOString();
    const item = {
      id: `A${Date.now()}${Math.random().toString(36).slice(2, 7)}`,
      createdAt: now,
      updatedAt: now,
      ...entry
    };
    rows.unshift(item);
    write(rows);
    return item;
  };

  const remove = id => write(read().filter(x => x.id !== id));
  const clear = () => write([]);
  const update = (id, patch) => {
    let updated = null;
    const rows = read().map(x => {
      if (x.id !== id) return x;
      updated = { ...x, ...patch, updatedAt: new Date().toISOString() };
      return updated;
    });
    write(rows);
    return updated;
  };

  function unwrapMarks(root) {
    if (!root) return;
    root.querySelectorAll("mark.fm-highlight").forEach(mark => {
      const frag = document.createDocumentFragment();
      while (mark.firstChild) frag.appendChild(mark.firstChild);
      mark.replaceWith(frag);
    });
    root.normalize();
  }

  function acceptedTextNodes(root) {
    if (!root) return [];
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement?.closest(EXCLUDED)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  function makeRangeFromExact(nodes, quote) {
    let offset = 0;
    const spans = nodes.map(node => {
      const start = offset;
      offset += node.nodeValue.length;
      return { node, start, end: offset };
    });
    const combined = nodes.map(n => n.nodeValue).join("");
    const idx = combined.indexOf(quote);
    if (idx < 0) return null;
    const endIdx = idx + quote.length;

    const startSpan = spans.find(s => idx >= s.start && idx < s.end) || spans.at(-1);
    const endSpan = spans.find(s => endIdx > s.start && endIdx <= s.end) || spans.at(-1);
    if (!startSpan || !endSpan) return null;

    const range = document.createRange();
    range.setStart(startSpan.node, Math.max(0, idx - startSpan.start));
    range.setEnd(endSpan.node, Math.min(endSpan.node.nodeValue.length, endIdx - endSpan.start));
    return range;
  }

  function normalizeWithMap(nodes) {
    const chars = [];
    const map = [];
    let lastWasSpace = true;
    nodes.forEach(node => {
      const text = node.nodeValue;
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (/\s/.test(ch)) {
          if (!lastWasSpace && chars.length) {
            chars.push(" ");
            map.push({ node, offset: i });
            lastWasSpace = true;
          }
        } else {
          chars.push(ch);
          map.push({ node, offset: i });
          lastWasSpace = false;
        }
      }
    });
    while (chars.at(-1) === " ") { chars.pop(); map.pop(); }
    return { text: chars.join(""), map };
  }

  function findQuoteRange(root, quote) {
    if (!root || !quote) return null;
    const nodes = acceptedTextNodes(root);
    if (!nodes.length) return null;

    const exact = makeRangeFromExact(nodes, quote);
    if (exact) return exact;

    // Fallback for browser selections that normalize line breaks / repeated spaces.
    const normalizedQuote = quote.replace(/\s+/g, " ").trim();
    if (!normalizedQuote) return null;
    const norm = normalizeWithMap(nodes);
    const idx = norm.text.indexOf(normalizedQuote);
    if (idx < 0) return null;
    const startMap = norm.map[idx];
    const endMap = norm.map[idx + normalizedQuote.length - 1];
    if (!startMap || !endMap) return null;

    const range = document.createRange();
    range.setStart(startMap.node, startMap.offset);
    range.setEnd(endMap.node, Math.min(endMap.node.nodeValue.length, endMap.offset + 1));
    return range;
  }

  function findTextElement(root, quote) {
    const range = findQuoteRange(root, quote);
    if (!range) return null;
    const node = range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer.parentElement
      : range.startContainer;
    return node || null;
  }

  function highlightQuote(root, annotation) {
    const quote = annotation?.quote;
    if (!quote || quote.length < 2) return false;
    const range = findQuoteRange(root, quote);
    if (!range || range.collapsed) return false;

    const mark = document.createElement("mark");
    mark.className = "fm-highlight";
    mark.dataset.color = annotation.color || "yellow";
    mark.dataset.annotationId = annotation.id || "";
    mark.dataset.annotationType = annotation.type || "highlight";
    if (annotation.type === "comment") mark.dataset.note = "true";

    try {
      const contents = range.extractContents();
      mark.appendChild(contents);
      range.insertNode(mark);
      return true;
    } catch {
      return false;
    }
  }

  function applyHighlights(root, lessonId) {
    if (!root) return;
    unwrapMarks(root);
    // Oldest first makes anchoring deterministic when several notes exist in one paragraph.
    byLesson(lessonId)
      .filter(x => x.type === "highlight" || (x.type === "comment" && x.highlight === true))
      .slice()
      .reverse()
      .forEach(a => highlightQuote(root, a));
  }

  function selectedQuote() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return null;
    const raw = sel.toString();
    const txt = raw.trim();
    if (txt.length < 2 || txt.length > 1200) return null;

    const range = sel.getRangeAt(0);
    const anchorEl = sel.anchorNode?.nodeType === Node.TEXT_NODE ? sel.anchorNode.parentElement : sel.anchorNode;
    const focusEl = sel.focusNode?.nodeType === Node.TEXT_NODE ? sel.focusNode.parentElement : sel.focusNode;
    const lesson = anchorEl?.closest?.("[data-lesson-id]");
    if (!lesson || !focusEl?.closest?.(`[data-lesson-id="${lesson.dataset.lessonId}"]`)) return null;
    if (anchorEl?.closest?.(EXCLUDED) || focusEl?.closest?.(EXCLUDED)) return null;

    // Keep an annotation inside one logical text block. This avoids invalid markup
    // and makes re-anchoring reliable after the SPA re-renders.
    const aBlock = anchorEl?.closest?.(BLOCK_SELECTOR);
    const fBlock = focusEl?.closest?.(BLOCK_SELECTOR);
    if (aBlock && fBlock && aBlock !== fBlock) return null;

    const rect = range.getBoundingClientRect();
    return {
      quote: txt,
      lessonId: lesson.dataset.lessonId,
      moduleId: lesson.dataset.moduleId || "",
      rect
    };
  }

  return {
    all,
    byLesson,
    get,
    add,
    remove,
    clear,
    update,
    applyHighlights,
    selectedQuote,
    findTextElement
  };
})();
