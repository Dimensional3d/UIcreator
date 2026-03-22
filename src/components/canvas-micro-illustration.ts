import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  MICRO_ILLUSTRATION_OPTIONS,
  type MicroIllustrationName,
} from './micro-illustration-library';

@customElement('canvas-micro-illustration')
export class CanvasMicroIllustration extends LitElement {
  @property({ type: String })
  illustration: MicroIllustrationName = 'update-app';

  private get selectedIllustration() {
    return (
      MICRO_ILLUSTRATION_OPTIONS.find((option) => option.value === this.illustration) ??
      MICRO_ILLUSTRATION_OPTIONS[0]
    );
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .illustration {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      user-select: none;
      pointer-events: none;
    }
  `;

  render() {
    return html`
      <div class="illustration" aria-label=${this.selectedIllustration.label}>
        <img
          src=${this.selectedIllustration.src}
          alt=${this.selectedIllustration.label}
          draggable="false"
        />
      </div>
    `;
  }
}
