import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getCurrentRoute, goTo, type AppRoute } from './router/app-router';
import './screens/home-screen';
import './screens/settings-screen';
import './styles/tokens.css';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state()
  private route: AppRoute = getCurrentRoute();

  private onHashChange = () => {
    this.route = getCurrentRoute();
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this.onHashChange);

    if (!window.location.hash) {
      goTo(this.route);
    }
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.onHashChange);
    super.disconnectedCallback();
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-bg);
      color: var(--color-text);
    }

    main {
      min-height: 100vh;
    }
  `;

  private renderScreen() {
    switch (this.route) {
      case 'settings':
        return html`<settings-screen></settings-screen>`;
      case 'home':
      default:
        return html`<home-screen></home-screen>`;
    }
  }

  render() {
    return html`<main>${this.renderScreen()}</main>`;
  }
}
