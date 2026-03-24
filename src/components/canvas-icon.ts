import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ICON_OPTIONS, type IconName } from './icon-library';

@customElement('canvas-icon')
export class CanvasIcon extends LitElement {
  @property({ type: String })
  icon: IconName = 'home';

  @property({ type: String })
  color = 'var(--color-primary-strong)';

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
    }

    .glyph {
      width: 100%;
      height: 100%;
      display: block;
      background-color: var(--icon-color, #001391);
      -webkit-mask: var(--icon-src) center / contain no-repeat;
      mask: var(--icon-src) center / contain no-repeat;
    }
  `;

  render() {
    return html`
      <div
        class="icon"
        role="img"
        aria-label=${this.selectedIcon.label}
        style=${`--icon-color:${this.color};--icon-src:url('${this.selectedIcon.src}');`}
      >
        <span class="glyph" aria-hidden="true"></span>
      </div>
    `;
  }
}
