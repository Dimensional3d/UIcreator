import{i as e}from"./node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"./node_modules/lit-html/lit-html.js";import{i as n}from"./node_modules/lit-element/lit-element.js";import"./node_modules/lit/index.js";import{t as r}from"./node_modules/@lit/reactive-element/decorators/custom-element.js";import{r as i}from"./node_modules/@lit/reactive-element/decorators/state.js";import"./node_modules/lit/decorators.js";import{getCurrentRoute as a,goTo as o}from"./router/app-router.js";import{__decorate as s}from"./_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";import"./screens/home-screen.js";import"./screens/settings-screen.js";/* empty css             */var c=class extends n{constructor(...e){super(...e),this.route=a(),this.onHashChange=()=>{this.route=a()}}connectedCallback(){super.connectedCallback(),window.addEventListener(`hashchange`,this.onHashChange),window.location.hash||o(this.route)}disconnectedCallback(){window.removeEventListener(`hashchange`,this.onHashChange),super.disconnectedCallback()}static{this.styles=e`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-bg);
      color: var(--color-text);
    }

    main {
      min-height: 100vh;
    }
  `}renderScreen(){switch(this.route){case`settings`:return t`<settings-screen></settings-screen>`;default:return t`<home-screen></home-screen>`}}render(){return t`<main>${this.renderScreen()}</main>`}};s([i()],c.prototype,`route`,void 0),c=s([r(`app-root`)],c);