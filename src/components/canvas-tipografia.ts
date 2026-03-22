import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TypographyPreset =
  | 'benton-book'
  | 'benton-medium'
  | 'benton-medium-italic'
  | 'tiempos-headline';

export type TypographyAlign = 'left' | 'center' | 'right';

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

  @property({ type: Boolean })
  bold = false;

  @property({ type: Boolean })
  italic = false;

  @property({ type: Boolean })
  editing = false;

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

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('editing') && this.editing) {
      const sample = this.renderRoot.querySelector('.sample') as HTMLParagraphElement | null;
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
    }
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLParagraphElement;
    this.dispatchEvent(
      new CustomEvent('text-change', {
        bubbles: true,
        composed: true,
        detail: {
          id: this.itemId,
          text: target.textContent ?? '',
        },
      }),
    );
  }

  private handleBlur() {
    this.dispatchEvent(
      new CustomEvent('text-edit-finish', {
        bubbles: true,
        composed: true,
        detail: {
          id: this.itemId,
        },
      }),
    );
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
      align-items: flex-start;
    }

    .sample {
      margin: 0;
    }

    .sample {
      color: #172033;
      line-height: 1.15;
      word-break: break-word;
      width: 100%;
      user-select: none;
      outline: none;
      white-space: pre-wrap;
    }

    .sample[contenteditable='true'] {
      user-select: text;
      cursor: text;
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
      <article class="block">
        <p
          class="sample ${this.preset}"
          contenteditable=${this.editing ? 'true' : 'false'}
          spellcheck="false"
          style=${`text-align:${this.align};font-weight:${this.computedFontWeight};font-style:${this.computedFontStyle};font-size:${this.fontSize}px;`}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        >
          ${this.text}
        </p>
      </article>
    `;
  }
}
