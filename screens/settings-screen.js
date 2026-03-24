import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import"../node_modules/lit/decorators.js";import{__decorate as i}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";import"../components/ui-card.js";var a=class extends n{static{this.styles=e`
    h2,
    p {
      margin: 0;
    }

    p {
      color: var(--color-muted);
    }
  `}render(){return t`
      <ui-card>
        <h2>Settings</h2>
        <p>Aqui puedes colocar configuracion, preferencias o formularios.</p>
      </ui-card>
    `}};a=i([r(`settings-screen`)],a);