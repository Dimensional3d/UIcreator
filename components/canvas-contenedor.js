import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import{n as i}from"../node_modules/@lit/reactive-element/decorators/property.js";import"../node_modules/lit/decorators.js";import{__decorate as a}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";var o=class extends n{constructor(...e){super(...e),this.background=`transparent`,this.borderRadius=0,this.outlined=!1,this.shadowEnabled=!1,this.shadowX=0,this.shadowY=12,this.shadowBlur=32,this.shadowSpread=0,this.shadowOpacity=.18,this.shadowColor=`var(--color-bg)`}static{this.styles=e`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .container {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background: transparent;
    }
  `}render(){let e=this.shadowEnabled?`${this.shadowX}px ${this.shadowY}px ${this.shadowBlur}px ${this.shadowSpread}px color-mix(in srgb, ${this.shadowColor} ${Math.round(this.shadowOpacity*100)}%, transparent)`:`none`;return t`
      <article
        class="container"
        aria-label="Contenedor"
        style=${`background:${this.background};border-radius:${this.borderRadius}px;box-shadow:${e};border:${this.outlined?`2px solid #2457ff`:`none`};`}
      ></article>
    `}};a([i({type:String})],o.prototype,`background`,void 0),a([i({type:Number})],o.prototype,`borderRadius`,void 0),a([i({type:Boolean})],o.prototype,`outlined`,void 0),a([i({type:Boolean})],o.prototype,`shadowEnabled`,void 0),a([i({type:Number})],o.prototype,`shadowX`,void 0),a([i({type:Number})],o.prototype,`shadowY`,void 0),a([i({type:Number})],o.prototype,`shadowBlur`,void 0),a([i({type:Number})],o.prototype,`shadowSpread`,void 0),a([i({type:Number})],o.prototype,`shadowOpacity`,void 0),a([i({type:String})],o.prototype,`shadowColor`,void 0),o=a([r(`canvas-contenedor`)],o);