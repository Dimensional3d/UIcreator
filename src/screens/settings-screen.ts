import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/ui-card';

@customElement('settings-screen')
export class SettingsScreen extends LitElement {
  static styles = css`
    h2,
    p {
      margin: 0;
    }

    p {
      color: var(--color-muted);
    }
  `;

  render() {
    return html`
      <ui-card>
        <h2>Settings</h2>
        <p>Aqui puedes colocar configuracion, preferencias o formularios.</p>
      </ui-card>
    `;
  }
}
