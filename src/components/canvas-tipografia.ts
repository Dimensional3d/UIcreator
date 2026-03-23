import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type TypographyPreset =
  | 'benton-book'
  | 'benton-medium'
  | 'benton-medium-italic'
  | 'tiempos-headline';

export type TypographyAlign = 'left' | 'center' | 'right';
export type TypographyVerticalAlign = 'top' | 'center' | 'bottom';

export const TYPOGRAPHY_PRESET_OPTIONS: Array<{ value: TypographyPreset; label: string }> = [
  { value: 'benton-book', label: 'Benton Sans Book' },
  { value: 'benton-medium', label: 'Benton Sans Medium' },
  { value: 'benton-medium-italic', label: 'Benton Sans Medium Italic' },
  { value: 'tiempos-headline', label: 'Tiempos Headline Bold' },
];

@customElement('canvas-tipografia')
export class CanvasTipografia extends LitElement {
  @property({ type: String })
  itemId = '';

  @property({ type: String })
  preset: TypographyPreset = 'benton-book';

  @property({ type: Number })
  fontSize = 32;

  @property({ type: String })
  text = 'Texto de ejemplo';

  @property({ type: String })
  align: TypographyAlign = 'left';

  @property({ type: String })
  verticalAlign: TypographyVerticalAlign = 'top';

  @property({ type: Boolean })
  bold = false;

  @property({ type: Boolean })
  italic = false;

  @property({ type: String })
  color = 'var(--color-text)';

  @property({ type: Boolean })
  editing = false;

  @property({ type: Boolean })
  linksEnabled = false;

  private savedSelectionRange: Range | null = null;

  private get computedFontWeight() {
    const baseWeight = this.preset === 'benton-book' ? 400 : this.preset === 'tiempos-headline' ? 700 : 500;
    if (!this.bold) {
      return baseWeight;
    }

    return this.preset === 'tiempos-headline' ? 800 : 700;
  }

  private get computedFontStyle() {
    if (this.preset === 'benton-medium-italic') {
      return 'italic';
    }

    return this.italic ? 'italic' : 'normal';
  }

  private get computedJustifyContent() {
    if (this.verticalAlign === 'center') {
      return 'center';
    }

    if (this.verticalAlign === 'bottom') {
      return 'flex-end';
    }

    return 'flex-start';
  }

  private get editorElement() {
    return this.renderRoot.querySelector('.sample') as HTMLParagraphElement | null;
  }

  private normalizeMarkup(markup: string) {
    const trimmed = markup.trim();

    if (!trimmed || trimmed === '<br>') {
      return '';
    }

    return markup;
  }

  private hasSelectionInsideEditor() {
    const editor = this.editorElement;
    const selection = window.getSelection();

    if (!editor || !selection || selection.rangeCount === 0) {
      return false;
    }

    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;
    const range = selection.getRangeAt(0);

    return Boolean(
      (anchorNode && editor.contains(anchorNode)) ||
        (focusNode && editor.contains(focusNode)) ||
        editor.contains(range.commonAncestorContainer),
    );
  }

  captureSelection() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !this.hasSelectionInsideEditor()) {
      return;
    }

    this.savedSelectionRange = selection.getRangeAt(0).cloneRange();
  }

  private restoreSavedSelection() {
    const editor = this.editorElement;
    const selection = window.getSelection();

    if (!editor || !selection || !this.savedSelectionRange) {
      return;
    }

    editor.focus();
    selection.removeAllRanges();
    selection.addRange(this.savedSelectionRange);
  }

  private normalizeLinkHref(href: string) {
    const trimmed = href.trim();
    if (!trimmed) {
      return '';
    }

    if (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('mailto:') ||
      trimmed.startsWith('tel:') ||
      trimmed.startsWith('/') ||
      trimmed.startsWith('#')
    ) {
      return trimmed;
    }

    return `https://${trimmed}`;
  }

  private findSelectionLink() {
    const editor = this.editorElement;
    const selection = window.getSelection();

    if (!editor || !selection || selection.rangeCount === 0) {
      return null;
    }

    const range = selection.getRangeAt(0);
    const nodes = [selection.anchorNode, selection.focusNode, range.commonAncestorContainer];

    for (const node of nodes) {
      if (!node) {
        continue;
      }

      const element = node instanceof HTMLAnchorElement ? node : node.parentElement?.closest('a');
      if (element && editor.contains(element)) {
        return element;
      }
    }

    return null;
  }

  applyInlineFormat(command: 'bold' | 'italic') {
    const editor = this.editorElement;
    if (!editor || !this.editing) {
      return null;
    }

    if (!this.hasSelectionInsideEditor() && this.savedSelectionRange) {
      this.restoreSavedSelection();
    }

    if (!this.hasSelectionInsideEditor()) {
      return null;
    }

    editor.focus();
    document.execCommand(command);
    this.captureSelection();
    return this.normalizeMarkup(editor.innerHTML);
  }

  applyLink(href: string) {
    const editor = this.editorElement;
    if (!editor || !this.editing) {
      return null;
    }

    const normalizedHref = this.normalizeLinkHref(href);
    if (!normalizedHref) {
      return null;
    }

    if (!this.hasSelectionInsideEditor() && this.savedSelectionRange) {
      this.restoreSavedSelection();
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed || !this.hasSelectionInsideEditor()) {
      return null;
    }

    editor.focus();
    document.execCommand('createLink', false, normalizedHref);

    const link = this.findSelectionLink();
    if (link) {
      link.setAttribute('href', normalizedHref);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noreferrer noopener');
    }

    this.captureSelection();
    return this.normalizeMarkup(editor.innerHTML);
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('editing') && this.editing) {
      const sample = this.editorElement;
      if (!sample) {
        return;
      }

      sample.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(sample);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
      this.savedSelectionRange = range.cloneRange();
    }
  }

  private handleBlur(event: FocusEvent) {
    const target = event.target as HTMLParagraphElement;
    this.dispatchEvent(
      new CustomEvent('text-change', {
        bubbles: true,
        composed: true,
        detail: {
          id: this.itemId,
          text: this.normalizeMarkup(target.innerHTML),
        },
      }),
    );

    this.dispatchEvent(
      new CustomEvent('text-edit-finish', {
        bubbles: true,
        composed: true,
        detail: {
          id: this.itemId,
        },
      }),
    );

    this.savedSelectionRange = null;
  }

  private insertPlainText(text: string) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  private handlePaste(event: ClipboardEvent) {
    if (!this.editing) {
      return;
    }

    const text = event.clipboardData?.getData('text/plain');
    if (text === undefined) {
      return;
    }

    event.preventDefault();
    this.editorElement?.focus();

    if (!document.execCommand('insertText', false, text)) {
      this.insertPlainText(text);
    }
  }

  private handleLinkClick(event: MouseEvent) {
    if (this.linksEnabled || this.editing) {
      return;
    }

    const path = event.composedPath();
    const clickedLink = path.find((node) => node instanceof HTMLAnchorElement);
    if (!clickedLink) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .block {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
    }

    .sample {
      display: block;
      margin: 0;
      padding: 0;
      line-height: 0.95;
      width: max-content;
      min-width: 100%;
      user-select: none;
      outline: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: normal;
      align-self: start;
    }

    .sample[contenteditable='true'] {
      user-select: text;
      cursor: text;
      width: 100%;
      white-space: pre-wrap;
      overflow: visible;
      text-overflow: clip;
      word-break: break-word;
    }

    .sample a {
      color: var(--color-link);
      text-decoration: underline;
      text-underline-offset: 0.12em;
    }

    .sample[data-links-enabled='false'] a {
      pointer-events: none;
      cursor: inherit;
    }

    .sample.benton-book {
      font-family: var(--font-sans);
      font-weight: 400;
    }

    .sample.benton-medium {
      font-family: var(--font-sans);
      font-weight: 500;
    }

    .sample.benton-medium-italic {
      font-family: var(--font-sans);
      font-style: italic;
      font-weight: 500;
    }

    .sample.tiempos-headline {
      font-family: var(--font-display);
      font-weight: 700;
    }
  `;

  render() {
    return html`
      <article class="block" style=${`justify-content:${this.computedJustifyContent};`}>
        <p
          class="sample ${this.preset}"
          contenteditable=${this.editing ? 'true' : 'false'}
          data-links-enabled=${String(this.linksEnabled)}
          spellcheck="false"
          style=${`color:${this.color};text-align:${this.align};font-weight:${this.computedFontWeight};font-style:${this.computedFontStyle};font-size:${this.fontSize}px;`}
          @blur=${this.handleBlur}
          @paste=${this.handlePaste}
          @click=${this.handleLinkClick}
        >${unsafeHTML(this.text)}</p>
      </article>
    `;
  }
}
