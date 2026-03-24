import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import{n as i}from"../node_modules/@lit/reactive-element/decorators/property.js";import"../node_modules/lit/decorators.js";import{o as a}from"../node_modules/lit-html/directives/unsafe-html.js";import"../node_modules/lit/directives/unsafe-html.js";import{__decorate as o}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";var s=[{value:`benton-book`,label:`Benton Sans Book`},{value:`benton-medium`,label:`Benton Sans Medium`},{value:`benton-medium-italic`,label:`Benton Sans Medium Italic`},{value:`tiempos-headline`,label:`Tiempos Headline Bold`}],c=class extends n{constructor(...e){super(...e),this.itemId=``,this.preset=`benton-book`,this.fontSize=32,this.text=`Texto de ejemplo`,this.align=`left`,this.verticalAlign=`top`,this.bold=!1,this.italic=!1,this.color=`var(--color-text)`,this.editing=!1,this.linksEnabled=!1,this.savedSelectionRange=null}get computedFontWeight(){let e=this.preset===`benton-book`?400:this.preset===`tiempos-headline`?700:500;return this.bold?this.preset===`tiempos-headline`?800:700:e}get computedFontStyle(){return this.preset===`benton-medium-italic`||this.italic?`italic`:`normal`}get computedJustifyContent(){return this.verticalAlign===`center`?`center`:this.verticalAlign===`bottom`?`flex-end`:`flex-start`}get editorElement(){return this.renderRoot.querySelector(`.sample`)}normalizeMarkup(e){let t=e.trim();return!t||t===`<br>`?``:e}hasSelectionInsideEditor(){let e=this.editorElement,t=window.getSelection();if(!e||!t||t.rangeCount===0)return!1;let n=t.anchorNode,r=t.focusNode,i=t.getRangeAt(0);return!!(n&&e.contains(n)||r&&e.contains(r)||e.contains(i.commonAncestorContainer))}captureSelection(){let e=window.getSelection();!e||e.rangeCount===0||!this.hasSelectionInsideEditor()||(this.savedSelectionRange=e.getRangeAt(0).cloneRange())}restoreSavedSelection(){let e=this.editorElement,t=window.getSelection();!e||!t||!this.savedSelectionRange||(e.focus(),t.removeAllRanges(),t.addRange(this.savedSelectionRange))}normalizeLinkHref(e){let t=e.trim();return t?t.startsWith(`http://`)||t.startsWith(`https://`)||t.startsWith(`mailto:`)||t.startsWith(`tel:`)||t.startsWith(`/`)||t.startsWith(`#`)?t:`https://${t}`:``}findSelectionLink(){let e=this.editorElement,t=window.getSelection();if(!e||!t||t.rangeCount===0)return null;let n=t.getRangeAt(0),r=[t.anchorNode,t.focusNode,n.commonAncestorContainer];for(let t of r){if(!t)continue;let n=t instanceof HTMLAnchorElement?t:t.parentElement?.closest(`a`);if(n&&e.contains(n))return n}return null}applyInlineFormat(e){let t=this.editorElement;return!t||!this.editing||(!this.hasSelectionInsideEditor()&&this.savedSelectionRange&&this.restoreSavedSelection(),!this.hasSelectionInsideEditor())?null:(t.focus(),document.execCommand(e),this.captureSelection(),this.normalizeMarkup(t.innerHTML))}applyLink(e){let t=this.editorElement;if(!t||!this.editing)return null;let n=this.normalizeLinkHref(e);if(!n)return null;!this.hasSelectionInsideEditor()&&this.savedSelectionRange&&this.restoreSavedSelection();let r=window.getSelection();if(!r||r.rangeCount===0||r.isCollapsed||!this.hasSelectionInsideEditor())return null;t.focus(),document.execCommand(`createLink`,!1,n);let i=this.findSelectionLink();return i&&(i.setAttribute(`href`,n),i.setAttribute(`target`,`_blank`),i.setAttribute(`rel`,`noreferrer noopener`)),this.captureSelection(),this.normalizeMarkup(t.innerHTML)}updated(e){if(e.has(`editing`)&&this.editing){let e=this.editorElement;if(!e)return;e.focus();let t=window.getSelection(),n=document.createRange();n.selectNodeContents(e),n.collapse(!1),t?.removeAllRanges(),t?.addRange(n),this.savedSelectionRange=n.cloneRange()}}handleBlur(e){let t=e.target;this.dispatchEvent(new CustomEvent(`text-change`,{bubbles:!0,composed:!0,detail:{id:this.itemId,text:this.normalizeMarkup(t.innerHTML)}})),this.dispatchEvent(new CustomEvent(`text-edit-finish`,{bubbles:!0,composed:!0,detail:{id:this.itemId}})),this.savedSelectionRange=null}insertPlainText(e){let t=window.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0);n.deleteContents();let r=document.createTextNode(e);n.insertNode(r),n.setStartAfter(r),n.collapse(!0),t.removeAllRanges(),t.addRange(n)}handlePaste(e){if(!this.editing)return;let t=e.clipboardData?.getData(`text/plain`);t!==void 0&&(e.preventDefault(),this.editorElement?.focus(),document.execCommand(`insertText`,!1,t)||this.insertPlainText(t))}handleLinkClick(e){this.linksEnabled||this.editing||e.composedPath().find(e=>e instanceof HTMLAnchorElement)&&(e.preventDefault(),e.stopPropagation())}static{this.styles=e`
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
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
    }

    .sample {
      display: block;
      margin: 0;
      padding: 0;
      line-height: 0.95;
      width: max-content;
      min-width: 100%;
      user-select: none;
      outline: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: normal;
      align-self: start;
    }

    .sample[contenteditable='true'] {
      user-select: text;
      cursor: text;
      width: 100%;
      white-space: pre-wrap;
      overflow: visible;
      text-overflow: clip;
      word-break: break-word;
    }

    .sample a {
      color: var(--color-link);
      text-decoration: underline;
      text-underline-offset: 0.12em;
    }

    .sample[data-links-enabled='false'] a {
      pointer-events: none;
      cursor: inherit;
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
  `}render(){return t`
      <article class="block" style=${`justify-content:${this.computedJustifyContent};`}>
        <p
          class="sample ${this.preset}"
          contenteditable=${this.editing?`true`:`false`}
          data-links-enabled=${String(this.linksEnabled)}
          spellcheck="false"
          style=${`color:${this.color};text-align:${this.align};font-weight:${this.computedFontWeight};font-style:${this.computedFontStyle};font-size:${this.fontSize}px;`}
          @blur=${this.handleBlur}
          @paste=${this.handlePaste}
          @click=${this.handleLinkClick}
        >${a(this.text)}</p>
      </article>
    `}};o([i({type:String})],c.prototype,`itemId`,void 0),o([i({type:String})],c.prototype,`preset`,void 0),o([i({type:Number})],c.prototype,`fontSize`,void 0),o([i({type:String})],c.prototype,`text`,void 0),o([i({type:String})],c.prototype,`align`,void 0),o([i({type:String})],c.prototype,`verticalAlign`,void 0),o([i({type:Boolean})],c.prototype,`bold`,void 0),o([i({type:Boolean})],c.prototype,`italic`,void 0),o([i({type:String})],c.prototype,`color`,void 0),o([i({type:Boolean})],c.prototype,`editing`,void 0),o([i({type:Boolean})],c.prototype,`linksEnabled`,void 0),c=o([r(`canvas-tipografia`)],c);export{s as TYPOGRAPHY_PRESET_OPTIONS};