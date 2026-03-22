import { LitElement, css, html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { customElement, property } from 'lit/decorators.js';
import { ICON_OPTIONS, type IconName } from './icon-library';

@customElement('canvas-icon')
export class CanvasIcon extends LitElement {
  @property({ type: String })
  icon: IconName = 'home';

  private get selectedIcon() {
    return ICON_OPTIONS.find((option) => option.value === this.icon) ?? ICON_OPTIONS[0];
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .icon {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      color: #001391;
    }

    svg {
      width: 100%;
      height: 100%;
      display: block;
      overflow: visible;
    }
  `;

  render() {
    return html`
      <div class="icon" aria-label=${this.selectedIcon.label}>
        <svg
          viewBox=${this.selectedIcon.viewBox}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          ${unsafeSVG(this.selectedIcon.body)}
        </svg>
      </div>
    `;
  }
}
