import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import"../node_modules/lit/decorators.js";import{__decorate as i}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";var a=class extends n{static{this.styles=e`
    .card {
      background: var(--color-card);
      border: 1px solid rgba(148, 163, 184, 0.14);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
    }
  `}render(){return t`<div class="card"><slot></slot></div>`}};a=i([r(`ui-card`)],a);