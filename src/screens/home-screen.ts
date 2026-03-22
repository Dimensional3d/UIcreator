import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  TYPOGRAPHY_PRESET_OPTIONS,
  type TypographyAlign,
  type TypographyPreset,
} from '../components/canvas-tipografia';
import '../components/canvas-contenedor';
import '../components/canvas-desktop-menu';
import '../components/canvas-icon';
import '../components/canvas-logo';
import '../components/canvas-main-button';
import '../components/canvas-micro-illustration';
import '../components/canvas-opportunity-button';
import '../components/canvas-secondary-button';
import '../components/canvas-tipografia';
import '../components/tool-contenedor';
import '../components/tool-desktop-menu';
import '../components/tool-icon';
import '../components/tool-logo';
import '../components/tool-main-button';
import '../components/tool-micro-illustration';
import '../components/tool-opportunity-button';
import '../components/tool-secondary-button';
import '../components/tool-tipografia';
import { ICON_OPTIONS, type IconName } from '../components/icon-library';
import {
  MICRO_ILLUSTRATION_OPTIONS,
  type MicroIllustrationName,
} from '../components/micro-illustration-library';

type CanvasTypographyItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  preset: TypographyPreset;
  align: TypographyAlign;
  bold: boolean;
  italic: boolean;
  color: string;
  fontSize: number;
  text: string;
};

type CanvasButtonItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  variant: 'main' | 'secondary' | 'opportunity';
  label: string;
  action: string;
};

type CanvasIconItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  icon: IconName;
};

type CanvasDesktopMenuItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
};

type CanvasLogoItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
};

type CanvasMicroIllustrationItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  illustration: MicroIllustrationName;
};

type CanvasContainerItem = {
  id: string;
  parentId: string | null;
  y: number;
  height: number;
  order: number;
  background: string;
  borderRadius: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  desktopStart: number;
  desktopSpan: number;
  mobileStart: number;
  mobileSpan: number;
};

type CanvasLeafEntry =
  | { kind: 'typography'; item: CanvasTypographyItem }
  | { kind: 'button'; item: CanvasButtonItem }
  | { kind: 'icon'; item: CanvasIconItem }
  | { kind: 'desktop-menu'; item: CanvasDesktopMenuItem }
  | { kind: 'logo'; item: CanvasLogoItem }
  | { kind: 'micro-illustration'; item: CanvasMicroIllustrationItem };

type CanvasEntry = CanvasLeafEntry | { kind: 'container'; item: CanvasContainerItem };
type ColorOption = { value: string; label: string };
type ToolPreview =
  | 'tipografia'
  | 'main-button'
  | 'secondary-button'
  | 'opportunity-button'
  | 'icon'
  | 'desktop-menu'
  | 'logo'
  | 'micro-illustration'
  | 'contenedor'
  | null;
type ComponentTab = 'atomos' | 'moleculas';
type ColorDropdownKey = 'text' | 'container' | 'canvas' | 'icon' | 'micro-illustration' | null;
type CanvasTab = { id: string; name: string };

const BUTTON_HEIGHT_OPTIONS = [55, 32] as const;
const CONTAINER_STACK_GAP = 16;

const COLOR_TOKEN_OPTIONS: ColorOption[] = [
  { value: 'var(--color-surface)', label: 'Surface' },
  { value: 'var(--color-text-inverse)', label: 'Inverse' },
  { value: 'var(--color-surface-soft)', label: 'Surface Soft' },
  { value: 'var(--color-primary-soft)', label: 'Primary Soft' },
  { value: 'var(--color-surface-warm)', label: 'Surface Warm' },
  { value: 'var(--color-surface-accent)', label: 'Surface Accent' },
  { value: 'var(--color-highlight)', label: 'Highlight' },
  { value: 'var(--color-text-muted)', label: 'Text Muted' },
  { value: 'var(--color-primary)', label: 'Primary' },
  { value: 'var(--color-text-soft)', label: 'Text Soft' },
  { value: 'var(--color-link)', label: 'Link' },
  { value: 'var(--color-primary-strong)', label: 'Primary Strong' },
  { value: 'var(--color-text)', label: 'Text' },
  { value: 'var(--color-bg)', label: 'Background' },
  { value: 'var(--color-bg-strong)', label: 'Background Strong' },
  { value: 'var(--color-text-strong)', label: 'Text Strong' },
] as const;

const CONTAINER_BACKGROUND_OPTIONS: ColorOption[] = [
  { value: 'transparent', label: 'Transparente' },
  ...COLOR_TOKEN_OPTIONS,
] as const;

const CANVAS_BACKGROUND_OPTIONS = COLOR_TOKEN_OPTIONS;
const TEXT_COLOR_OPTIONS = COLOR_TOKEN_OPTIONS;

type CanvasItemDragState = {
  id: string;
  parentId: string | null;
  offsetX: number;
  offsetY: number;
  canvasWidth: number;
  canvasHeight: number;
  itemWidth: number;
  itemHeight: number;
};

type CanvasScene = {
  canvasBackground: string;
  typographyItems: CanvasTypographyItem[];
  buttonItems: CanvasButtonItem[];
  iconItems: CanvasIconItem[];
  desktopMenuItems: CanvasDesktopMenuItem[];
  logoItems: CanvasLogoItem[];
  microIllustrationItems: CanvasMicroIllustrationItem[];
  containerItems: CanvasContainerItem[];
  nextTypographyId: number;
  nextButtonId: number;
  nextIconId: number;
  nextDesktopMenuId: number;
  nextLogoId: number;
  nextMicroIllustrationId: number;
  nextContainerId: number;
  nextCanvasOrder: number;
};

@customElement('home-screen')
export class HomeScreen extends LitElement {
  @state()
  private viewport: 'desktop' | 'mobile' = 'desktop';

  @state()
  private isViewportTransitioning = false;

  @state()
  private isCanvasDragActive = false;

  @state()
  private activeDraggedTool: string | null = null;

  @state()
  private toolTypographyPreset: TypographyPreset = 'benton-book';

  @state()
  private selectedToolPreview: ToolPreview = null;

  @state()
  private componentTab: ComponentTab = 'atomos';

  @state()
  private typographyItems: CanvasTypographyItem[] = [];

  @state()
  private buttonItems: CanvasButtonItem[] = [];

  @state()
  private iconItems: CanvasIconItem[] = [];

  @state()
  private desktopMenuItems: CanvasDesktopMenuItem[] = [];

  @state()
  private logoItems: CanvasLogoItem[] = [];

  @state()
  private microIllustrationItems: CanvasMicroIllustrationItem[] = [];

  @state()
  private containerItems: CanvasContainerItem[] = [];

  @state()
  private selectedTypographyId: string | null = null;

  @state()
  private editingTypographyId: string | null = null;

  @state()
  private editingButtonId: string | null = null;

  @state()
  private editingIconId: string | null = null;

  @state()
  private editingLogoId: string | null = null;

  @state()
  private editingMicroIllustrationId: string | null = null;

  @state()
  private editingContainerId: string | null = null;

  @state()
  private isCanvasEditing = false;

  @state()
  private canvasBackground = 'var(--color-surface)';

  @state()
  private isCodeView = false;

  @state()
  private openColorDropdown: ColorDropdownKey = null;

  @state()
  private canvases: CanvasTab[] = [{ id: 'canvas-1', name: 'Lienzo 1' }];

  @state()
  private activeCanvasId = 'canvas-1';

  private viewportAnimationTimeout?: number;
  private toolPreviewTimeout?: number;
  private nextTypographyId = 1;
  private nextButtonId = 1;
  private nextIconId = 1;
  private nextDesktopMenuId = 1;
  private nextLogoId = 1;
  private nextMicroIllustrationId = 1;
  private nextContainerId = 1;
  private nextCanvasOrder = 1;
  private dragState: CanvasItemDragState | null = null;
  private resizeObserver?: ResizeObserver;
  private readonly colorValueCache = new Map<string, string>();
  private readonly canvasScenes = new Map<string, CanvasScene>();

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }

    .workspace[data-dragging='true'] {
      cursor: grabbing;
    }

    .workspace[data-dragging='true'] * {
      cursor: grabbing !important;
    }

    .workspace {
      min-height: 100vh;
      padding: 24px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
      gap: 24px;
      box-sizing: border-box;
    }

    .stage {
      min-height: calc(100vh - 48px);
      border: none;
      border-radius: 0;
      padding: 0;
      display: grid;
      justify-items: center;
      align-items: start;
      background: radial-gradient(circle, var(--color-dots) 1.1px, transparent 1.1px);
      background-size: 16px 16px;
      overflow: visible;
    }

    .canvas-frame {
      width: min(100%, 960px);
      min-height: 820px;
      margin-top: 8px;
      display: grid;
      gap: 8px;
      transition: width 280ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .canvas-frame[data-mode='mobile'] {
      width: min(100%, 430px);
    }

    .canvas-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .canvas-title {
      margin: 0;
      color: #ffffff;
      font-size: 1rem;
      font-family: var(--font-display);
      font-weight: 700;
      letter-spacing: 0.01em;
      border: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      text-align: left;
    }

    .canvas-controls-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
    }

    .canvas-add-button {
      width: 40px;
      height: 40px;
      border: 1px solid rgba(217, 225, 238, 0.95);
      border-radius: 999px;
      background: #ffffff;
      color: #102694;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      box-shadow: 0 10px 24px rgba(24, 37, 76, 0.08);
      transition:
        transform 140ms ease,
        box-shadow 140ms ease,
        border-color 140ms ease;
    }

    .canvas-add-button:hover {
      transform: translateY(-1px);
      border-color: rgba(36, 87, 255, 0.22);
      box-shadow: 0 14px 28px rgba(24, 37, 76, 0.12);
    }

    .canvas-add-button svg {
      width: 18px;
      height: 18px;
      display: block;
    }

    .canvas-tabs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .canvas-tab {
      border: 1px solid rgba(217, 225, 238, 0.95);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.92);
      color: #102694;
      padding: 8px 14px;
      font: inherit;
      font-size: 0.84rem;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 8px 18px rgba(24, 37, 76, 0.08);
      transition:
        background 140ms ease,
        border-color 140ms ease,
        color 140ms ease;
    }

    .canvas-tab[data-active='true'] {
      background: #102694;
      border-color: #102694;
      color: #ffffff;
    }

    .canvas-shell {
      width: 100%;
      min-height: 780px;
      border-radius: 30px;
      padding: 0;
      box-sizing: border-box;
      background: transparent;
      border: none;
      box-shadow: none;
      transition:
        transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 220ms ease;
    }

    .canvas {
      min-height: 780px;
      border-radius: 16px;
      background: linear-gradient(180deg, #ffffff, #f9fbff);
      border: 1px solid rgba(217, 225, 238, 0.95);
      overflow: hidden;
      display: flex;
    }

    .segmented {
      display: inline-flex;
      padding: 4px;
      border-radius: 999px;
      background: #eef3fb;
      border: 1px solid rgba(217, 225, 238, 0.9);
      gap: 4px;
    }

    .segment-button {
      border: none;
      background: transparent;
      color: var(--color-muted);
      padding: 10px 16px;
      border-radius: 999px;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
      transition: background 140ms ease, color 140ms ease, box-shadow 140ms ease;
    }

    .segment-button[data-active='true'] {
      background: var(--color-surface);
      color: var(--color-text);
      box-shadow: 0 6px 18px rgba(35, 55, 102, 0.1);
    }

    .canvas-body {
      width: 100%;
      flex: 1;
    }

    .page-preview {
      width: 100%;
      min-height: 100%;
      height: 100%;
      border-radius: 0;
      background-color: var(--canvas-background, #ffffff);
      background-image: radial-gradient(circle, rgba(36, 87, 255, 0.16) 1px, transparent 1px);
      background-size: 8px 8px;
      border: none;
      box-shadow: none;
      padding: 0;
      box-sizing: border-box;
      display: block;
      position: relative;
      transition:
        width 280ms cubic-bezier(0.22, 1, 0.36, 1),
        max-width 280ms cubic-bezier(0.22, 1, 0.36, 1),
        transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 220ms ease,
        background-color 180ms ease;
    }

    .page-preview[data-drag-active='true'] {
      background-image: radial-gradient(circle, rgba(36, 87, 255, 0.22) 1px, transparent 1px);
    }

    .page-preview-empty {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      pointer-events: none;
      color: rgba(19, 30, 68, 0.44);
      font-size: 0.92rem;
      font-weight: 500;
      letter-spacing: 0.01em;
    }

    .canvas-item {
      position: absolute;
      z-index: 1;
      min-width: 220px;
      min-height: 72px;
      resize: both;
      overflow: hidden;
      cursor: text;
      outline: 1px solid transparent;
      transition: outline-color 140ms ease, box-shadow 140ms ease;
      touch-action: none;
    }

    .canvas-item[data-kind='button'] {
      min-width: 240px;
      min-height: 32px;
      cursor: grab;
    }

    .canvas-item[data-kind='button']:active {
      cursor: grabbing;
    }

    .canvas-item[data-kind='icon'] {
      min-width: 24px;
      min-height: 24px;
      cursor: grab;
    }

    .canvas-item[data-kind='icon']:active {
      cursor: grabbing;
    }

    .canvas-item[data-kind='logo'] {
      min-width: 96px;
      min-height: 24px;
      cursor: grab;
    }

    .canvas-item[data-kind='logo']:active {
      cursor: grabbing;
    }

    .canvas-item[data-kind='micro-illustration'] {
      min-width: 72px;
      min-height: 72px;
      cursor: grab;
    }

    .canvas-item[data-kind='micro-illustration']:active {
      cursor: grabbing;
    }

    .canvas-item[data-kind='container'] {
      min-width: 0;
      min-height: 120px;
      resize: none;
      cursor: grab;
    }

    .canvas-item[data-kind='container']:active {
      cursor: grabbing;
    }

    .canvas-item[data-kind='container']::after {
      display: none;
    }

    .container-content {
      position: absolute;
    }

    .canvas-item[data-selected='true'] {
      outline-color: #2457ff;
      box-shadow: 0 0 0 3px rgba(36, 87, 255, 0.18);
    }

    .canvas-item::after {
      content: '';
      position: absolute;
      right: 6px;
      bottom: 6px;
      width: 12px;
      height: 12px;
      border-right: 2px solid rgba(19, 30, 68, 0.25);
      border-bottom: 2px solid rgba(19, 30, 68, 0.25);
      opacity: 0;
      pointer-events: none;
      transition: opacity 140ms ease;
    }

    .canvas-item:hover::after {
      opacity: 1;
    }

    .handle {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 3px;
      background: #ffffff;
      border: 2px solid #2457ff;
      box-sizing: border-box;
      opacity: 0;
      pointer-events: none;
      transition: opacity 140ms ease;
    }

    .canvas-item[data-selected='true'] .handle {
      opacity: 1;
    }

    .handle.top-left {
      top: -6px;
      left: -6px;
    }

    .handle.top-right {
      top: -6px;
      right: -6px;
    }

    .handle.bottom-left {
      bottom: -6px;
      left: -6px;
    }

    .handle.bottom-right {
      bottom: -6px;
      right: -6px;
    }

    .canvas-frame[data-mode='mobile'] .canvas-item {
      min-width: 184px;
    }

    .canvas-frame[data-transitioning='true'] .canvas-shell,
    .canvas-frame[data-transitioning='true'] .page-preview {
      opacity: 0.72;
      transform: scale(0.985);
    }

    .tools-panel {
      align-self: start;
      min-height: calc(100vh - 48px);
      background: #000000;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 30px;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.32);
      padding: 28px;
      box-sizing: border-box;
      display: grid;
      gap: 24px;
      align-content: start;
    }

    .panel-title,
    .section-title {
      margin: 0;
    }

    .panel-title {
      font-size: 1.45rem;
      line-height: 1.1;
      color: #ffffff;
      font-family: var(--font-display);
      font-weight: 700;
    }

    .tool-section {
      display: grid;
      gap: 12px;
    }

    .panel-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .panel-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .panel-action {
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      width: 36px;
      height: 36px;
      padding: 0;
      display: inline-grid;
      place-items: center;
      font: inherit;
      font-size: 0.82rem;
      cursor: pointer;
    }

    .panel-action[data-active='true'] {
      background: rgba(132, 168, 255, 0.18);
      border-color: rgba(132, 168, 255, 0.28);
    }

    .tool-group {
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 16px;
      background: rgba(255, 255, 255, 0.04);
      display: grid;
      gap: 12px;
    }

    .tool-group.components-group {
      padding-left: 8px;
      padding-right: 8px;
    }

    .component-tabs {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .component-tab {
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.04);
      color: rgba(255, 255, 255, 0.78);
      padding: 10px 12px;
      font: inherit;
      font-size: 0.84rem;
      font-weight: 500;
      cursor: pointer;
      transition:
        background 140ms ease,
        border-color 140ms ease,
        color 140ms ease;
    }

    .component-tab[data-active='true'] {
      background: rgba(132, 168, 255, 0.18);
      border-color: rgba(132, 168, 255, 0.28);
      color: #ffffff;
    }

    .tool-preview-anchor {
      position: relative;
    }

    .tool-preview-popover {
      position: absolute;
      left: 50%;
      bottom: calc(100% + 10px);
      transform: translateX(-50%);
      width: min(248px, calc(100vw - 72px));
      border: 1px solid rgba(217, 225, 238, 0.96);
      border-radius: 18px;
      background: #ffffff;
      box-shadow: 0 20px 48px rgba(24, 37, 76, 0.18);
      padding: 12px;
      display: grid;
      place-items: center;
      z-index: 6;
      pointer-events: none;
      animation: preview-popover-in 180ms ease;
    }

    .tool-preview-popover[data-tool='desktop-menu'] {
      width: min(440px, calc(100vw - 72px));
      padding: 14px;
    }

    .tool-preview-popover::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 100%;
      width: 14px;
      height: 14px;
      background: #ffffff;
      border-right: 1px solid rgba(217, 225, 238, 0.96);
      border-bottom: 1px solid rgba(217, 225, 238, 0.96);
      transform: translate(-50%, -50%) rotate(45deg);
    }

    .preview-canvas {
      width: 100%;
      min-height: 112px;
      display: grid;
      place-items: center;
    }

    .preview-text {
      width: min(100%, 220px);
    }

    .preview-button {
      width: min(100%, 236px);
      height: 55px;
    }

    .preview-container {
      width: min(100%, 240px);
      height: 132px;
    }

    .preview-desktop-menu {
      width: min(100%, 400px);
      height: 96px;
    }

    @keyframes preview-popover-in {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(6px) scale(0.96);
      }

      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
      }
    }

    .section-title {
      font-size: 0.95rem;
      color: #ffffff;
      font-weight: 500;
    }

    .editor-stack {
      display: grid;
      gap: 14px;
    }

    .editor-row {
      display: grid;
      gap: 8px;
      position: relative;
    }

    .editor-label {
      margin: 0;
      color: rgba(255, 255, 255, 0.68);
      font-size: 0.74rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .editor-select {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      padding: 10px 12px;
      font: inherit;
      font-size: 0.88rem;
      outline: none;
    }

    .editor-input {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      padding: 10px 12px;
      font: inherit;
      font-size: 0.88rem;
      outline: none;
      box-sizing: border-box;
    }

    .editor-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .editor-field {
      display: grid;
      gap: 6px;
    }

    .editor-field-label {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.74rem;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .editor-help {
      margin: 0;
      color: rgba(255, 255, 255, 0.56);
      font-size: 0.76rem;
      line-height: 1.45;
    }

    .editor-select option {
      color: #172033;
    }

    .color-dropdown {
      position: relative;
    }

    .color-dropdown-trigger {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
      font: inherit;
      text-align: left;
      transition: border-color 140ms ease, background 140ms ease;
    }

    .color-dropdown-trigger[data-open='true'] {
      border-color: rgba(132, 168, 255, 0.28);
      background: rgba(132, 168, 255, 0.12);
    }

    .color-dropdown-trigger-main {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .color-dropdown-value {
      min-width: 0;
      display: grid;
      gap: 2px;
    }

    .color-dropdown-label {
      font-size: 0.88rem;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .color-dropdown-meta {
      font-size: 0.73rem;
      color: rgba(255, 255, 255, 0.54);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .color-dropdown-chevron {
      width: 16px;
      height: 16px;
      color: rgba(255, 255, 255, 0.72);
      flex: 0 0 auto;
      transition: transform 140ms ease;
    }

    .color-dropdown-trigger[data-open='true'] .color-dropdown-chevron {
      transform: rotate(180deg);
    }

    .color-dropdown-panel {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(100% + 8px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 18px;
      background: rgb(12, 18, 53);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.32);
      padding: 12px;
      display: grid;
      gap: 10px;
      z-index: 8;
    }

    .icon-dropdown-panel {
      padding: 12px;
      display: grid;
      gap: 10px;
    }

    .icon-swatch-grid {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(auto-fit, minmax(42px, 42px));
      justify-content: start;
    }

    .icon-swatch {
      width: 42px;
      height: 42px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.04);
      display: grid;
      place-items: center;
      padding: 8px;
      cursor: pointer;
      transition: background 140ms ease, border-color 140ms ease;
      box-sizing: border-box;
    }

    .icon-swatch[data-active='true'] {
      background: rgba(132, 168, 255, 0.18);
      border-color: rgba(132, 168, 255, 0.28);
    }

    .icon-swatch-preview {
      width: 20px;
      height: 20px;
      display: block;
    }

    .micro-swatch-preview {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 10px;
      overflow: hidden;
    }

    .color-dropdown-title {
      margin: 0;
      color: rgba(255, 255, 255, 0.62);
      font-size: 0.74rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .color-swatch-grid {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(auto-fit, minmax(16px, 16px));
      justify-content: start;
    }

    .color-swatch {
      border: 1px solid rgba(255, 255, 255, 0.12);
      width: 16px;
      height: 16px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.04);
      color: #ffffff;
      padding: 0;
      display: block;
      cursor: pointer;
      text-align: left;
      font: inherit;
      transition: background 140ms ease, border-color 140ms ease;
    }

    .color-swatch[data-active='true'] {
      background: rgba(132, 168, 255, 0.18);
      border-color: rgba(132, 168, 255, 0.28);
    }

    .color-swatch-chip {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 14px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      box-sizing: border-box;
      flex: 0 0 auto;
    }

    .color-swatch-chip[data-transparent='true'] {
      background:
        linear-gradient(45deg, rgba(255, 255, 255, 0.14) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(255, 255, 255, 0.14) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.14) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.14) 75%);
      background-size: 8px 8px;
      background-position: 0 0, 0 4px, 4px -4px, -4px 0;
    }

    .editor-actions {
      display: flex;
      gap: 8px;
    }

    .editor-range-wrap {
      display: grid;
      gap: 8px;
    }

    .editor-range-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .editor-range-value {
      color: #ffffff;
      font-size: 0.84rem;
      font-weight: 500;
    }

    .editor-range {
      width: 100%;
      accent-color: #84a8ff;
      cursor: pointer;
    }

    .editor-button {
      flex: 1;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.04);
      color: #ffffff;
      padding: 10px 12px;
      font: inherit;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 140ms ease, border-color 140ms ease;
    }

    .editor-button[data-active='true'] {
      background: rgba(132, 168, 255, 0.18);
      border-color: rgba(132, 168, 255, 0.28);
    }

    .align-icon {
      display: block;
      width: 18px;
      height: 18px;
      margin: 0 auto;
      color: currentColor;
    }

    .page-preview.code-view {
      background: #0d122b;
      overflow: auto;
    }

    .code-block {
      margin: 0;
      min-height: 100%;
      box-sizing: border-box;
      padding: 24px;
      color: #d8e3ff;
      font: 500 13px/1.6 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      white-space: pre-wrap;
      word-break: break-word;
    }

    @media (max-width: 1100px) {
      .workspace {
        grid-template-columns: 1fr;
      }

      .stage,
      .tools-panel {
        min-height: auto;
      }
    }

    @media (max-width: 720px) {
      .workspace {
        padding: 16px;
      }

      .stage {
        padding: 0;
      }

      .tools-panel {
        border-radius: 24px;
        padding: 18px;
      }

      .canvas-frame {
        min-height: 700px;
      }

      .canvas {
        min-height: 660px;
      }

      .segmented {
        width: 100%;
      }

      .canvas-controls {
        flex-direction: column;
        align-items: stretch;
      }

      .canvas-controls-right {
        width: 100%;
        justify-content: space-between;
      }

      .segment-button {
        flex: 1;
      }
    }
  `;

  disconnectedCallback() {
    window.clearTimeout(this.viewportAnimationTimeout);
    window.clearTimeout(this.toolPreviewTimeout);
    window.removeEventListener('keydown', this.handleWindowKeyDown);
    window.removeEventListener('pointermove', this.handleWindowPointerMove);
    window.removeEventListener('pointerup', this.handleWindowPointerUp);
    window.removeEventListener('pointerdown', this.handleWindowPointerDown);
    this.resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  protected firstUpdated() {
    window.addEventListener('keydown', this.handleWindowKeyDown);
    window.addEventListener('pointerdown', this.handleWindowPointerDown);
    this.resizeObserver = new ResizeObserver((entries) => {
      const updates = new Map<string, { width: number; height: number }>();

      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        const itemId = element.dataset.itemId;
        if (!itemId) {
          continue;
        }

        updates.set(itemId, {
          width: Math.round(entry.contentRect.width),
          height: Math.round(entry.contentRect.height),
        });
      }

      if (updates.size === 0) {
        return;
      }

      let didTypographyChange = false;
      const nextTypographyItems = this.typographyItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didTypographyChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      let didButtonChange = false;
      const nextButtonItems = this.buttonItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didButtonChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      let didIconChange = false;
      const nextIconItems = this.iconItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didIconChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      let didDesktopMenuChange = false;
      const nextDesktopMenuItems = this.desktopMenuItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didDesktopMenuChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      let didLogoChange = false;
      const nextLogoItems = this.logoItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didLogoChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      let didMicroIllustrationChange = false;
      const nextMicroIllustrationItems = this.microIllustrationItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didMicroIllustrationChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      if (didTypographyChange) {
        this.typographyItems = nextTypographyItems;
      }

      if (didButtonChange) {
        this.buttonItems = nextButtonItems;
      }

      if (didIconChange) {
        this.iconItems = nextIconItems;
      }

      if (didDesktopMenuChange) {
        this.desktopMenuItems = nextDesktopMenuItems;
      }

      if (didLogoChange) {
        this.logoItems = nextLogoItems;
      }

      if (didMicroIllustrationChange) {
        this.microIllustrationItems = nextMicroIllustrationItems;
      }
    });
  }

  protected updated() {
    if (!this.resizeObserver) {
      return;
    }

    this.resizeObserver.disconnect();
    this.renderRoot.querySelectorAll<HTMLElement>('.canvas-item').forEach((element) => {
      this.resizeObserver?.observe(element);
    });
  }

  private cloneCanvasScene(scene: CanvasScene): CanvasScene {
    return {
      canvasBackground: scene.canvasBackground,
      typographyItems: scene.typographyItems.map((item) => ({ ...item })),
      buttonItems: scene.buttonItems.map((item) => ({ ...item })),
      iconItems: scene.iconItems.map((item) => ({ ...item })),
      desktopMenuItems: scene.desktopMenuItems.map((item) => ({ ...item })),
      logoItems: scene.logoItems.map((item) => ({ ...item })),
      microIllustrationItems: scene.microIllustrationItems.map((item) => ({ ...item })),
      containerItems: scene.containerItems.map((item) => ({ ...item })),
      nextTypographyId: scene.nextTypographyId,
      nextButtonId: scene.nextButtonId,
      nextIconId: scene.nextIconId,
      nextDesktopMenuId: scene.nextDesktopMenuId,
      nextLogoId: scene.nextLogoId,
      nextMicroIllustrationId: scene.nextMicroIllustrationId,
      nextContainerId: scene.nextContainerId,
      nextCanvasOrder: scene.nextCanvasOrder,
    };
  }

  private createEmptyCanvasScene(): CanvasScene {
    return {
      canvasBackground: 'var(--color-surface)',
      typographyItems: [],
      buttonItems: [],
      iconItems: [],
      desktopMenuItems: [],
      logoItems: [],
      microIllustrationItems: [],
      containerItems: [],
      nextTypographyId: 1,
      nextButtonId: 1,
      nextIconId: 1,
      nextDesktopMenuId: 1,
      nextLogoId: 1,
      nextMicroIllustrationId: 1,
      nextContainerId: 1,
      nextCanvasOrder: 1,
    };
  }

  private getActiveCanvasScene(): CanvasScene {
    return {
      canvasBackground: this.canvasBackground,
      typographyItems: this.typographyItems,
      buttonItems: this.buttonItems,
      iconItems: this.iconItems,
      desktopMenuItems: this.desktopMenuItems,
      logoItems: this.logoItems,
      microIllustrationItems: this.microIllustrationItems,
      containerItems: this.containerItems,
      nextTypographyId: this.nextTypographyId,
      nextButtonId: this.nextButtonId,
      nextIconId: this.nextIconId,
      nextDesktopMenuId: this.nextDesktopMenuId,
      nextLogoId: this.nextLogoId,
      nextMicroIllustrationId: this.nextMicroIllustrationId,
      nextContainerId: this.nextContainerId,
      nextCanvasOrder: this.nextCanvasOrder,
    };
  }

  private saveActiveCanvasScene() {
    this.canvasScenes.set(this.activeCanvasId, this.cloneCanvasScene(this.getActiveCanvasScene()));
  }

  private loadCanvasScene(scene: CanvasScene) {
    const nextScene = this.cloneCanvasScene(scene);

    this.handleWindowPointerUp();
    this.activeDraggedTool = null;
    this.isCanvasDragActive = false;
    this.selectedToolPreview = null;
    this.clearActiveEditingState();

    this.canvasBackground = nextScene.canvasBackground;
    this.typographyItems = nextScene.typographyItems;
    this.buttonItems = nextScene.buttonItems;
    this.iconItems = nextScene.iconItems;
    this.desktopMenuItems = nextScene.desktopMenuItems;
    this.logoItems = nextScene.logoItems;
    this.microIllustrationItems = nextScene.microIllustrationItems;
    this.containerItems = nextScene.containerItems;
    this.nextTypographyId = nextScene.nextTypographyId;
    this.nextButtonId = nextScene.nextButtonId;
    this.nextIconId = nextScene.nextIconId;
    this.nextDesktopMenuId = nextScene.nextDesktopMenuId;
    this.nextLogoId = nextScene.nextLogoId;
    this.nextMicroIllustrationId = nextScene.nextMicroIllustrationId;
    this.nextContainerId = nextScene.nextContainerId;
    this.nextCanvasOrder = nextScene.nextCanvasOrder;
  }

  private handleCreateCanvas() {
    this.saveActiveCanvasScene();
    const nextIndex = this.canvases.length + 1;
    const nextCanvas: CanvasTab = {
      id: `canvas-${nextIndex}`,
      name: `Lienzo ${nextIndex}`,
    };
    const nextScene = this.createEmptyCanvasScene();

    this.canvasScenes.set(nextCanvas.id, this.cloneCanvasScene(nextScene));
    this.canvases = [...this.canvases, nextCanvas];
    this.activeCanvasId = nextCanvas.id;
    this.loadCanvasScene(nextScene);
  }

  private handleSelectCanvas(canvasId: string) {
    if (canvasId === this.activeCanvasId) {
      return;
    }

    this.saveActiveCanvasScene();
    const nextScene = this.canvasScenes.get(canvasId) ?? this.createEmptyCanvasScene();
    this.activeCanvasId = canvasId;
    this.loadCanvasScene(nextScene);
  }

  private getDefaultFontSize(preset: TypographyPreset) {
    return preset === 'tiempos-headline' ? 42 : 32;
  }

  private getGridColumns(viewport = this.viewport) {
    return viewport === 'mobile' ? 4 : 12;
  }

  private clampContainerStart(start: number, span: number, columns: number) {
    return Math.max(1, Math.min(columns - span + 1, start));
  }

  private getContainerPercentage(span: number, columns: number) {
    return Math.round((span / columns) * 100);
  }

  private getContainerLeftPercent(start: number, columns: number) {
    return ((start - 1) / columns) * 100;
  }

  private getContainerWidthPercent(span: number, columns: number) {
    return (span / columns) * 100;
  }

  private getContainerStartFromX(left: number, canvasWidth: number, columns: number, span: number) {
    const columnWidth = canvasWidth / columns;
    const rawStart = Math.round(left / columnWidth) + 1;
    return this.clampContainerStart(rawStart, span, columns);
  }

  private getContainerViewportPlacement(
    item: CanvasContainerItem,
    viewport = this.viewport,
  ) {
    const start = viewport === 'mobile' ? item.mobileStart : item.desktopStart;
    const span = viewport === 'mobile' ? item.mobileSpan : item.desktopSpan;

    return {
      start,
      end: start + span - 1,
      top: item.y,
      bottom: item.y + item.height,
    };
  }

  private containersOverlap(
    first: CanvasContainerItem,
    second: CanvasContainerItem,
    viewport = this.viewport,
  ) {
    const firstPlacement = this.getContainerViewportPlacement(first, viewport);
    const secondPlacement = this.getContainerViewportPlacement(second, viewport);
    const overlapsHorizontally =
      firstPlacement.start <= secondPlacement.end && firstPlacement.end >= secondPlacement.start;
    const overlapsVertically =
      firstPlacement.top < secondPlacement.bottom && firstPlacement.bottom > secondPlacement.top;

    return overlapsHorizontally && overlapsVertically;
  }

  private resolveContainerCollision(
    item: CanvasContainerItem,
    items = this.containerItems,
    viewport = this.viewport,
  ) {
    const others = items
      .filter((candidate) => candidate.id !== item.id && candidate.parentId === item.parentId)
      .sort((left, right) => left.y - right.y);

    let nextItem = { ...item, y: Math.max(0, item.y) };
    let didMove = true;
    let safetyCounter = 0;

    while (didMove && safetyCounter <= others.length) {
      didMove = false;
      safetyCounter += 1;

      for (const other of others) {
        if (!this.containersOverlap(nextItem, other, viewport)) {
          continue;
        }

        nextItem = {
          ...nextItem,
          y: other.y + other.height + CONTAINER_STACK_GAP,
        };
        didMove = true;
      }
    }

    return nextItem;
  }

  private createTypographyItem(x: number, y: number, parentId: string | null = null) {
    const width = this.viewport === 'mobile' ? 208 : 240;
    const height = 120;
    this.typographyItems = [
      ...this.typographyItems,
      {
        id: `typo-${this.nextTypographyId++}`,
        parentId,
        x,
        y,
        width,
        height,
        order: this.nextCanvasOrder++,
        preset: this.toolTypographyPreset,
        align: 'left',
        bold: false,
        italic: false,
        color: 'var(--color-text)',
        fontSize: this.getDefaultFontSize(this.toolTypographyPreset),
        text: 'Texto de ejemplo',
      },
    ];
  }

  private createButtonItem(
    variant: 'main' | 'secondary' | 'opportunity',
    x: number,
    y: number,
    parentId: string | null = null,
  ) {
    const width = this.viewport === 'mobile' ? 248 : 304;
    const height = 55;
    this.buttonItems = [
      ...this.buttonItems,
      {
        id: `button-${this.nextButtonId++}`,
        parentId,
        x,
        y,
        width,
        height,
        order: this.nextCanvasOrder++,
        variant,
        label: 'Conoce más',
        action: '',
      },
    ];
  }

  private createIconItem(x: number, y: number, parentId: string | null = null) {
    const size = 40;
    this.iconItems = [
      ...this.iconItems,
      {
        id: `icon-${this.nextIconId++}`,
        parentId,
        x,
        y,
        width: size,
        height: size,
        order: this.nextCanvasOrder++,
        icon: ICON_OPTIONS[0].value,
      },
    ];
  }

  private createDesktopMenuItem(
    x: number,
    y: number,
    parentId: string | null = null,
    width = this.viewport === 'mobile' ? 338 : 880,
  ) {
    this.desktopMenuItems = [
      ...this.desktopMenuItems,
      {
        id: `desktop-menu-${this.nextDesktopMenuId++}`,
        parentId,
        x,
        y,
        width: Math.max(1, Math.round(width)),
        height: 118,
        order: this.nextCanvasOrder++,
      },
    ];
  }

  private createLogoItem(x: number, y: number, parentId: string | null = null) {
    this.logoItems = [
      ...this.logoItems,
      {
        id: `logo-${this.nextLogoId++}`,
        parentId,
        x,
        y,
        width: 120,
        height: 32,
        order: this.nextCanvasOrder++,
      },
    ];
  }

  private createMicroIllustrationItem(x: number, y: number, parentId: string | null = null) {
    this.microIllustrationItems = [
      ...this.microIllustrationItems,
      {
        id: `micro-${this.nextMicroIllustrationId++}`,
        parentId,
        x,
        y,
        width: 96,
        height: 96,
        order: this.nextCanvasOrder++,
        illustration: MICRO_ILLUSTRATION_OPTIONS[0].value,
      },
    ];
  }

  private createContainerItem(
    y: number,
    desktopStart = 1,
    mobileStart = 1,
    parentId: string | null = null,
  ) {
    const nextItem = this.resolveContainerCollision({
      id: `container-${this.nextContainerId++}`,
      parentId,
      y,
      height: 168,
      order: this.nextCanvasOrder++,
      background: 'transparent',
      borderRadius: 0,
      paddingTop: 12,
      paddingRight: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      desktopStart: this.clampContainerStart(desktopStart, 6, 12),
      desktopSpan: 6,
      mobileStart: this.clampContainerStart(mobileStart, 4, 4),
      mobileSpan: 4,
    });

    this.containerItems = [
      ...this.containerItems,
      nextItem,
    ];
  }

  private getCanvasHostElement() {
    return this.renderRoot.querySelector('.page-preview') as HTMLElement | null;
  }

  private getContainerContentElement(containerId: string) {
    return this.renderRoot.querySelector(
      `[data-container-content-id="${containerId}"]`,
    ) as HTMLElement | null;
  }

  private getDropContainerAtPoint(
    clientX: number,
    clientY: number,
    excludeContainerId?: string,
  ) {
    const containers = [...this.containerItems]
      .sort((a, b) => a.order - b.order)
      .reverse();

    for (const container of containers) {
      if (
        excludeContainerId &&
        (container.id === excludeContainerId || this.isContainerDescendant(container.id, excludeContainerId))
      ) {
        continue;
      }

      const element = this.getContainerContentElement(container.id);
      if (!element) {
        continue;
      }

      const rect = element.getBoundingClientRect();
      const isInside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isInside) {
        return { container, element, rect };
      }
    }

    return null;
  }

  private isContainerDescendant(containerId: string, ancestorId: string) {
    let currentParentId =
      this.containerItems.find((item) => item.id === containerId)?.parentId ?? null;

    while (currentParentId) {
      if (currentParentId === ancestorId) {
        return true;
      }

      currentParentId =
        this.containerItems.find((item) => item.id === currentParentId)?.parentId ?? null;
    }

    return false;
  }

  private canAbsorbDraggedContainer(
    targetContainer: CanvasContainerItem,
    targetRect: DOMRect,
    draggedContainerId: string,
  ) {
    if (targetContainer.id === draggedContainerId) {
      return false;
    }

    if (this.isContainerDescendant(targetContainer.id, draggedContainerId)) {
      return false;
    }

    return (
      targetRect.width > this.dragState!.itemWidth && targetRect.height > this.dragState!.itemHeight
    );
  }

  private getSelectedContainerHostId() {
    return this.selectedContainerItem?.id ?? null;
  }

  private get selectedTypographyItem() {
    return this.typographyItems.find((item) => item.id === this.selectedTypographyId) ?? null;
  }

  private get selectedButtonItem() {
    return this.buttonItems.find((item) => item.id === this.selectedTypographyId) ?? null;
  }

  private get selectedContainerItem() {
    return this.containerItems.find((item) => item.id === this.selectedTypographyId) ?? null;
  }

  private get selectedIconItem() {
    return this.iconItems.find((item) => item.id === this.selectedTypographyId) ?? null;
  }

  private get selectedLogoItem() {
    return this.logoItems.find((item) => item.id === this.selectedTypographyId) ?? null;
  }

  private get selectedMicroIllustrationItem() {
    return (
      this.microIllustrationItems.find((item) => item.id === this.selectedTypographyId) ?? null
    );
  }

  private get hasCanvasItems() {
    return (
      this.typographyItems.length > 0 ||
      this.buttonItems.length > 0 ||
      this.iconItems.length > 0 ||
      this.desktopMenuItems.length > 0 ||
      this.logoItems.length > 0 ||
      this.microIllustrationItems.length > 0 ||
      this.containerItems.length > 0
    );
  }

  private get orderedCanvasItems() {
    return [
      ...this.typographyItems.map((item) => ({ kind: 'typography' as const, item })),
      ...this.buttonItems.map((item) => ({ kind: 'button' as const, item })),
      ...this.iconItems.map((item) => ({ kind: 'icon' as const, item })),
      ...this.desktopMenuItems.map((item) => ({ kind: 'desktop-menu' as const, item })),
      ...this.logoItems.map((item) => ({ kind: 'logo' as const, item })),
      ...this.microIllustrationItems.map((item) => ({
        kind: 'micro-illustration' as const,
        item,
      })),
      ...this.containerItems.map((item) => ({ kind: 'container' as const, item })),
    ].sort((a, b) => a.item.order - b.item.order) as CanvasEntry[];
  }

  private get rootCanvasItems() {
    return this.orderedCanvasItems.filter(({ item }) => item.parentId === null);
  }

  private getContainerChildren(containerId: string) {
    return this.orderedCanvasItems.filter((entry) => entry.item.parentId === containerId);
  }

  private updateSelectedTypographyItem(updates: Partial<CanvasTypographyItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.typographyItems = this.typographyItems.map((item) =>
      item.id === this.selectedTypographyId ? { ...item, ...updates } : item,
    );
  }

  private updateSelectedButtonItem(updates: Partial<CanvasButtonItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.buttonItems = this.buttonItems.map((item) =>
      item.id === this.selectedTypographyId ? { ...item, ...updates } : item,
    );
  }

  private updateSelectedIconItem(updates: Partial<CanvasIconItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.iconItems = this.iconItems.map((item) =>
      item.id === this.selectedTypographyId ? { ...item, ...updates } : item,
    );
  }

  private updateSelectedLogoItem(updates: Partial<CanvasLogoItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.logoItems = this.logoItems.map((item) =>
      item.id === this.selectedTypographyId ? { ...item, ...updates } : item,
    );
  }

  private updateSelectedMicroIllustrationItem(updates: Partial<CanvasMicroIllustrationItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.microIllustrationItems = this.microIllustrationItems.map((item) =>
      item.id === this.selectedTypographyId ? { ...item, ...updates } : item,
    );
  }

  private updateSelectedContainerItem(updates: Partial<CanvasContainerItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.containerItems = this.containerItems.map((item) => {
      if (item.id !== this.selectedTypographyId) {
        return item;
      }

      const desktopSpan = Math.max(1, Math.min(12, updates.desktopSpan ?? item.desktopSpan));
      const mobileSpan = Math.max(1, Math.min(4, updates.mobileSpan ?? item.mobileSpan));
      const nextDesktopStart = this.clampContainerStart(
        updates.desktopStart ?? item.desktopStart,
        desktopSpan,
        12,
      );
      const nextMobileStart = this.clampContainerStart(
        updates.mobileStart ?? item.mobileStart,
        mobileSpan,
        4,
      );

      const nextItem = {
        ...item,
        ...updates,
        height: Math.max(96, updates.height ?? item.height),
        borderRadius: Math.max(0, Math.min(40, updates.borderRadius ?? item.borderRadius)),
        paddingTop: Math.max(0, Math.min(120, updates.paddingTop ?? item.paddingTop)),
        paddingRight: Math.max(0, Math.min(120, updates.paddingRight ?? item.paddingRight)),
        paddingBottom: Math.max(0, Math.min(120, updates.paddingBottom ?? item.paddingBottom)),
        paddingLeft: Math.max(0, Math.min(120, updates.paddingLeft ?? item.paddingLeft)),
        desktopSpan,
        mobileSpan,
        desktopStart: nextDesktopStart,
        mobileStart: nextMobileStart,
      };

      return this.resolveContainerCollision(nextItem);
    });
  }

  private getItemParentId(itemId: string) {
    if (itemId.startsWith('typo-')) {
      return this.typographyItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('button-')) {
      return this.buttonItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('icon-')) {
      return this.iconItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('desktop-menu-')) {
      return this.desktopMenuItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('logo-')) {
      return this.logoItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('micro-')) {
      return this.microIllustrationItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('container-')) {
      return this.containerItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    return null;
  }

  private clearActiveEditingState() {
    this.selectedTypographyId = null;
    this.editingTypographyId = null;
    this.editingButtonId = null;
    this.editingIconId = null;
    this.editingLogoId = null;
    this.editingMicroIllustrationId = null;
    this.editingContainerId = null;
    this.isCanvasEditing = false;
    this.openColorDropdown = null;
  }

  private getNestedContainerIds(containerId: string) {
    const nestedIds: string[] = [];
    const pendingIds = [containerId];

    while (pendingIds.length > 0) {
      const currentId = pendingIds.pop()!;
      const childIds = this.containerItems
        .filter((item) => item.parentId === currentId)
        .map((item) => item.id);

      nestedIds.push(...childIds);
      pendingIds.push(...childIds);
    }

    return nestedIds;
  }

  private handleWindowKeyDown = (event: KeyboardEvent) => {
    if ((event.key !== 'Delete' && event.key !== 'Backspace') || !this.selectedTypographyId) {
      return;
    }

    if (this.editingTypographyId === this.selectedTypographyId) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (
      target &&
      (target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target.isContentEditable)
    ) {
      return;
    }

    if (this.selectedTypographyId.startsWith('typo-')) {
      this.typographyItems = this.typographyItems.filter(
        (item) => item.id !== this.selectedTypographyId,
      );
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('button-')) {
      this.buttonItems = this.buttonItems.filter((item) => item.id !== this.selectedTypographyId);
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('icon-')) {
      this.iconItems = this.iconItems.filter((item) => item.id !== this.selectedTypographyId);
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('desktop-menu-')) {
      this.desktopMenuItems = this.desktopMenuItems.filter(
        (item) => item.id !== this.selectedTypographyId,
      );
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('logo-')) {
      this.logoItems = this.logoItems.filter((item) => item.id !== this.selectedTypographyId);
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('micro-')) {
      this.microIllustrationItems = this.microIllustrationItems.filter(
        (item) => item.id !== this.selectedTypographyId,
      );
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('container-')) {
      const containerIdsToDelete = new Set([
        this.selectedTypographyId,
        ...this.getNestedContainerIds(this.selectedTypographyId),
      ]);

      this.typographyItems = this.typographyItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.buttonItems = this.buttonItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.iconItems = this.iconItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.desktopMenuItems = this.desktopMenuItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.logoItems = this.logoItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.microIllustrationItems = this.microIllustrationItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.containerItems = this.containerItems.filter(
        (item) => !containerIdsToDelete.has(item.id),
      );
      this.clearActiveEditingState();
      event.preventDefault();
    }
  };

  private handleToolDragState(
    event: CustomEvent<{ tool: string; active: boolean; preset?: TypographyPreset }>,
  ) {
    this.activeDraggedTool = event.detail.active ? event.detail.tool : null;
    if (event.detail.preset) {
      this.toolTypographyPreset = event.detail.preset;
    }
    if (!event.detail.active) {
      this.isCanvasDragActive = false;
    }
  }

  private handleToolPreview(event: CustomEvent<{ tool: ToolPreview; preset?: TypographyPreset }>) {
    window.clearTimeout(this.toolPreviewTimeout);
    this.selectedToolPreview = event.detail.tool;
    if (event.detail.preset) {
      this.toolTypographyPreset = event.detail.preset;
    }

    if (event.detail.tool) {
      this.toolPreviewTimeout = window.setTimeout(() => {
        this.selectedToolPreview = null;
      }, 5000);
    }
  }

  private handleInsertTool(event: CustomEvent<{ tool: string; preset?: TypographyPreset }>) {
    const parentId = this.getSelectedContainerHostId();

    if (event.detail.tool === 'tipografia') {
      if (event.detail.preset) {
        this.toolTypographyPreset = event.detail.preset;
      }

      const itemWidth = this.viewport === 'mobile' ? 208 : 240;
      this.createTypographyItem(parentId ? 16 : 24, parentId ? 16 : 24, parentId);

      const lastItem = this.typographyItems[this.typographyItems.length - 1];
      if (lastItem && !parentId && this.viewport === 'mobile' && lastItem.x + itemWidth > 338) {
        this.typographyItems = this.typographyItems.map((item, index, items) =>
          index === items.length - 1 ? { ...item, x: 16 } : item,
        );
      }
      return;
    }

    if (event.detail.tool === 'main-button') {
      this.createButtonItem('main', parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'secondary-button') {
      this.createButtonItem('secondary', parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'opportunity-button') {
      this.createButtonItem('opportunity', parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'icon') {
      this.createIconItem(parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'desktop-menu') {
      this.createDesktopMenuItem(parentId ? 16 : 24, parentId ? 16 : 24, parentId, parentId ? 320 : 880);
      return;
    }

    if (event.detail.tool === 'logo') {
      this.createLogoItem(parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'micro-illustration') {
      this.createMicroIllustrationItem(parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'contenedor') {
      this.createContainerItem(24);
    }
  }

  private handleToolPresetChange(event: CustomEvent<{ tool: string; preset: TypographyPreset }>) {
    if (event.detail.tool !== 'tipografia') {
      return;
    }

    this.toolTypographyPreset = event.detail.preset;
  }

  private handleCanvasClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.selectedTypographyId = null;
      this.editingTypographyId = null;
      this.editingButtonId = null;
      this.editingIconId = null;
      this.editingLogoId = null;
      this.editingMicroIllustrationId = null;
      this.editingContainerId = null;
      this.isCanvasEditing = false;
    }
  }

  private handleCanvasTitleClick() {
    this.handleWindowPointerUp();
    this.clearActiveEditingState();
    this.isCanvasEditing = true;
  }

  private handleCanvasItemDoubleClick(itemId: string) {
    this.handleWindowPointerUp();

    if (itemId.startsWith('typo-')) {
      this.isCanvasEditing = false;
      this.selectedTypographyId = itemId;
      this.editingTypographyId = itemId;
      this.editingButtonId = null;
      return;
    }

    if (itemId.startsWith('button-')) {
      this.isCanvasEditing = false;
      this.selectedTypographyId = itemId;
      this.editingTypographyId = null;
      this.editingButtonId = itemId;
      this.editingIconId = null;
      this.editingContainerId = null;
      return;
    }

    if (itemId.startsWith('icon-')) {
      this.isCanvasEditing = false;
      this.selectedTypographyId = itemId;
      this.editingTypographyId = null;
      this.editingButtonId = null;
      this.editingIconId = itemId;
      this.editingLogoId = null;
      this.editingContainerId = null;
      return;
    }

    if (itemId.startsWith('desktop-menu-')) {
      this.isCanvasEditing = false;
      this.selectedTypographyId = itemId;
      this.editingTypographyId = null;
      this.editingButtonId = null;
      this.editingIconId = null;
      this.editingLogoId = null;
      this.editingMicroIllustrationId = null;
      this.editingContainerId = null;
      return;
    }

    if (itemId.startsWith('logo-')) {
      this.isCanvasEditing = false;
      this.selectedTypographyId = itemId;
      this.editingTypographyId = null;
      this.editingButtonId = null;
      this.editingIconId = null;
      this.editingLogoId = itemId;
      this.editingMicroIllustrationId = null;
      this.editingContainerId = null;
      return;
    }

    if (itemId.startsWith('micro-')) {
      this.isCanvasEditing = false;
      this.selectedTypographyId = itemId;
      this.editingTypographyId = null;
      this.editingButtonId = null;
      this.editingIconId = null;
      this.editingLogoId = null;
      this.editingMicroIllustrationId = itemId;
      this.editingContainerId = null;
      return;
    }

    if (itemId.startsWith('container-')) {
      this.isCanvasEditing = false;
      this.selectedTypographyId = itemId;
      this.editingTypographyId = null;
      this.editingButtonId = null;
      this.editingIconId = null;
      this.editingLogoId = null;
      this.editingMicroIllustrationId = null;
      this.editingContainerId = itemId;
    }
  }

  private handleCanvasItemPointerDown(event: PointerEvent, itemId: string) {
    if (event.button !== 0) {
      return;
    }

    if (this.editingTypographyId === itemId || event.detail >= 2) {
      return;
    }

    const element = event.currentTarget as HTMLElement;
    const parentId = this.getItemParentId(itemId);
    const host = parentId ? this.getContainerContentElement(parentId) : this.getCanvasHostElement();
    if (!host) {
      return;
    }

    const elementRect = element.getBoundingClientRect();
    const resizeHotspot = 18;
    const isResizeIntent =
      event.clientX >= elementRect.right - resizeHotspot &&
      event.clientY >= elementRect.bottom - resizeHotspot;

    if (isResizeIntent) {
      return;
    }

    const canvasRect = host.getBoundingClientRect();
    this.isCanvasEditing = false;
    this.selectedTypographyId = itemId;
    if (this.editingTypographyId && this.editingTypographyId !== itemId) {
      this.editingTypographyId = null;
    }
    if (this.editingButtonId && this.editingButtonId !== itemId) {
      this.editingButtonId = null;
    }
    if (this.editingIconId && this.editingIconId !== itemId) {
      this.editingIconId = null;
    }
    if (this.editingLogoId && this.editingLogoId !== itemId) {
      this.editingLogoId = null;
    }
    if (this.editingMicroIllustrationId && this.editingMicroIllustrationId !== itemId) {
      this.editingMicroIllustrationId = null;
    }
    if (this.editingContainerId && this.editingContainerId !== itemId) {
      this.editingContainerId = null;
    }
    this.dragState = {
      id: itemId,
      parentId,
      offsetX: event.clientX - elementRect.left,
      offsetY: event.clientY - elementRect.top,
      canvasWidth: canvasRect.width,
      canvasHeight: canvasRect.height,
      itemWidth: elementRect.width,
      itemHeight: elementRect.height,
    };

    window.addEventListener('pointermove', this.handleWindowPointerMove);
    window.addEventListener('pointerup', this.handleWindowPointerUp);
    event.preventDefault();
  }

  private handleWindowPointerMove = (event: PointerEvent) => {
    if (!this.dragState) {
      return;
    }

    const host = this.dragState.parentId
      ? this.getContainerContentElement(this.dragState.parentId)
      : this.getCanvasHostElement();
    if (!host) {
      return;
    }

    const rect = host.getBoundingClientRect();
    const nextX = Math.max(
      0,
      Math.min(
        rect.width - this.dragState.itemWidth,
        event.clientX - rect.left - this.dragState.offsetX,
      ),
    );
    const nextY = Math.max(
      0,
      Math.min(
        rect.height - this.dragState.itemHeight,
        event.clientY - rect.top - this.dragState.offsetY,
      ),
    );

    this.typographyItems = this.typographyItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
    this.buttonItems = this.buttonItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
    this.iconItems = this.iconItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
    this.desktopMenuItems = this.desktopMenuItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
    this.logoItems = this.logoItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
    this.microIllustrationItems = this.microIllustrationItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
    this.containerItems = this.containerItems.map((item) => {
      if (item.id !== this.dragState?.id) {
        return item;
      }

      const columns = this.getGridColumns();
      const span = this.viewport === 'mobile' ? item.mobileSpan : item.desktopSpan;
      const start = this.getContainerStartFromX(nextX, rect.width, columns, span);
      const nextItem =
        this.viewport === 'mobile'
          ? { ...item, y: nextY, mobileStart: start }
          : { ...item, y: nextY, desktopStart: start };

      return this.resolveContainerCollision(nextItem);
    });
  };

  private moveDraggedLeafItemIntoContainer(event: PointerEvent) {
    if (!this.dragState || this.dragState.id.startsWith('container-')) {
      return;
    }

    const dropContainer = this.getDropContainerAtPoint(event.clientX, event.clientY);
    if (!dropContainer || dropContainer.container.id === this.dragState.parentId) {
      return;
    }

    const nextX = Math.max(
      0,
      Math.min(
        dropContainer.rect.width - this.dragState.itemWidth,
        event.clientX - dropContainer.rect.left - this.dragState.offsetX,
      ),
    );
    const nextY = Math.max(
      0,
      Math.min(
        dropContainer.rect.height - this.dragState.itemHeight,
        event.clientY - dropContainer.rect.top - this.dragState.offsetY,
      ),
    );

    this.typographyItems = this.typographyItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
    this.buttonItems = this.buttonItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
    this.iconItems = this.iconItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
    this.desktopMenuItems = this.desktopMenuItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
    this.logoItems = this.logoItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
    this.microIllustrationItems = this.microIllustrationItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
  }

  private moveDraggedContainerIntoContainer(event: PointerEvent) {
    if (!this.dragState || !this.dragState.id.startsWith('container-')) {
      return;
    }

    const draggedContainer = this.containerItems.find((item) => item.id === this.dragState?.id);
    if (!draggedContainer) {
      return;
    }

    const dropContainer = this.getDropContainerAtPoint(event.clientX, event.clientY);
    if (
      !dropContainer ||
      !this.canAbsorbDraggedContainer(
        dropContainer.container,
        dropContainer.rect,
        draggedContainer.id,
      )
    ) {
      return;
    }

    const columns = this.getGridColumns();
    const span = this.viewport === 'mobile' ? draggedContainer.mobileSpan : draggedContainer.desktopSpan;
    const nextX = Math.max(
      0,
      Math.min(
        dropContainer.rect.width - this.dragState.itemWidth,
        event.clientX - dropContainer.rect.left - this.dragState.offsetX,
      ),
    );
    const nextY = Math.max(
      0,
      Math.min(
        dropContainer.rect.height - this.dragState.itemHeight,
        event.clientY - dropContainer.rect.top - this.dragState.offsetY,
      ),
    );
    const nextStart = this.getContainerStartFromX(nextX, dropContainer.rect.width, columns, span);

    this.containerItems = this.containerItems.map((item) => {
      if (item.id !== draggedContainer.id) {
        return item;
      }

      const nextItem =
        this.viewport === 'mobile'
          ? {
              ...item,
              parentId: dropContainer.container.id,
              y: nextY,
              mobileStart: nextStart,
            }
          : {
              ...item,
              parentId: dropContainer.container.id,
              y: nextY,
              desktopStart: nextStart,
            };

      return this.resolveContainerCollision(nextItem);
    });
  }

  private handleWindowPointerUp = (event?: PointerEvent) => {
    if (event) {
      this.moveDraggedLeafItemIntoContainer(event);
      this.moveDraggedContainerIntoContainer(event);
    }
    this.dragState = null;
    window.removeEventListener('pointermove', this.handleWindowPointerMove);
    window.removeEventListener('pointerup', this.handleWindowPointerUp);
  };

  private handleSelectedPresetChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSelectedTypographyItem({ preset: select.value as TypographyPreset });
  }

  private handleTypographyTextChange(event: CustomEvent<{ id: string; text: string }>) {
    const { id, text } = event.detail;
    this.typographyItems = this.typographyItems.map((item) =>
      item.id === id ? { ...item, text } : item,
    );
  }

  private handleTypographyEditFinish(event: CustomEvent<{ id: string }>) {
    if (this.editingTypographyId === event.detail.id) {
      this.editingTypographyId = null;
    }
  }

  private setSelectedAlignment(align: TypographyAlign) {
    this.updateSelectedTypographyItem({ align });
  }

  private toggleSelectedBold() {
    if (!this.selectedTypographyItem) {
      return;
    }

    this.updateSelectedTypographyItem({ bold: !this.selectedTypographyItem.bold });
  }

  private toggleSelectedItalic() {
    if (!this.selectedTypographyItem) {
      return;
    }

    this.updateSelectedTypographyItem({ italic: !this.selectedTypographyItem.italic });
  }

  private handleSelectedFontSizeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedTypographyItem({ fontSize: input.valueAsNumber });
  }

  private handleSelectedButtonActionInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedButtonItem({ action: input.value });
  }

  private handleSelectedButtonLabelInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedButtonItem({ label: input.value });
  }

  private handleSelectedButtonHeightChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSelectedButtonItem({ height: Number(select.value) });
  }

  private handleSelectedContainerDesktopSpanChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSelectedContainerItem({ desktopSpan: Number(select.value) });
  }

  private handleSelectedContainerMobileSpanChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSelectedContainerItem({ mobileSpan: Number(select.value) });
  }

  private handleSelectedContainerHeightInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ height: input.valueAsNumber });
  }

  private handleSelectedContainerRadiusInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ borderRadius: input.valueAsNumber });
  }

  private handleSelectedContainerPaddingTopInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ paddingTop: input.valueAsNumber });
  }

  private handleSelectedContainerPaddingRightInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ paddingRight: input.valueAsNumber });
  }

  private handleSelectedContainerPaddingBottomInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ paddingBottom: input.valueAsNumber });
  }

  private handleSelectedContainerPaddingLeftInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ paddingLeft: input.valueAsNumber });
  }

  private setComponentTab(tab: ComponentTab) {
    this.componentTab = tab;
    this.selectedToolPreview = null;
  }

  private handleWindowPointerDown = (event: PointerEvent) => {
    const path = event.composedPath();
    const clickedInsideDropdown = path.some(
      (target) => target instanceof HTMLElement && target.dataset.colorDropdown === 'true',
    );

    if (!clickedInsideDropdown) {
      this.openColorDropdown = null;
    }
  };

  private toggleColorDropdown(key: Exclude<ColorDropdownKey, null>) {
    this.openColorDropdown = this.openColorDropdown === key ? null : key;
  }

  private rgbStringToHex(value: string) {
    const normalized = value.trim();
    if (normalized.startsWith('#')) {
      return normalized.toUpperCase();
    }

    const channels = normalized.match(/[\d.]+/g);
    if (!channels || channels.length < 3) {
      return normalized.toUpperCase();
    }

    const [red, green, blue, alpha] = channels.map(Number);
    const toHex = (channel: number) =>
      Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, '0').toUpperCase();

    const rgbHex = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
    if (typeof alpha !== 'number' || Number.isNaN(alpha) || alpha >= 1) {
      return rgbHex;
    }

    return `${rgbHex}${toHex(alpha * 255)}`;
  }

  private getSelectedColorHex(value: string) {
    if (value === 'transparent') {
      return 'TRANSPARENT';
    }

    const cached = this.colorValueCache.get(value);
    if (cached) {
      return cached;
    }

    const probe = document.createElement('span');
    probe.style.position = 'fixed';
    probe.style.opacity = '0';
    probe.style.pointerEvents = 'none';
    probe.style.color = value;
    document.body.appendChild(probe);
    const resolvedColor = getComputedStyle(probe).color;
    document.body.removeChild(probe);

    const hexValue = this.rgbStringToHex(resolvedColor);
    this.colorValueCache.set(value, hexValue);
    return hexValue;
  }

  private renderColorDropdown(
    key: Exclude<ColorDropdownKey, null>,
    options: ColorOption[],
    selectedValue: string,
    onSelect: (value: string) => void,
  ) {
    const selectedOption = options.find((option) => option.value === selectedValue) ?? options[0];
    const isOpen = this.openColorDropdown === key;
    const selectedHex = this.getSelectedColorHex(selectedOption.value);

    return html`
      <div class="color-dropdown" data-color-dropdown="true">
        <button
          class="color-dropdown-trigger"
          type="button"
          data-open=${String(isOpen)}
          @click=${() => this.toggleColorDropdown(key)}
        >
          <span class="color-dropdown-trigger-main">
            <span
              class="color-swatch-chip"
              data-transparent=${String(selectedOption.value === 'transparent')}
              style=${selectedOption.value === 'transparent'
                ? ''
                : `background:${selectedOption.value}; width: 18px; min-height: 18px; border-radius: 6px;`}
            ></span>
            <span class="color-dropdown-value">
              <span class="color-dropdown-label">${selectedOption.label}</span>
              <span class="color-dropdown-meta">${selectedHex}</span>
            </span>
          </span>
          <svg class="color-dropdown-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        ${isOpen
          ? html`
              <div class="color-dropdown-panel">
                <p class="color-dropdown-title">Selecciona un color</p>
                <div class="color-swatch-grid">
                  ${options.map(
                    (option) => html`
                      <button
                        class="color-swatch"
                        type="button"
                        data-active=${String(option.value === selectedValue)}
                        @click=${() => {
                          onSelect(option.value);
                          this.openColorDropdown = null;
                        }}
                        aria-label=${option.label}
                        title=${option.label}
                      >
                        <span
                          class="color-swatch-chip"
                          data-transparent=${String(option.value === 'transparent')}
                          style=${option.value === 'transparent' ? '' : `background:${option.value};`}
                        ></span>
                      </button>
                    `,
                  )}
                </div>
              </div>
            `
          : null}
      </div>
    `;
  }

  private renderIconDropdown(selectedValue: IconName, onSelect: (value: IconName) => void) {
    const selectedOption =
      ICON_OPTIONS.find((option) => option.value === selectedValue) ?? ICON_OPTIONS[0];
    const isOpen = this.openColorDropdown === 'icon';

    return html`
      <div class="color-dropdown" data-color-dropdown="true">
        <button
          class="color-dropdown-trigger"
          type="button"
          data-open=${String(isOpen)}
          @click=${() => this.toggleColorDropdown('icon')}
        >
          <span class="color-dropdown-trigger-main">
            <canvas-icon class="icon-swatch-preview" .icon=${selectedOption.value}></canvas-icon>
            <span class="color-dropdown-value">
              <span class="color-dropdown-label">${selectedOption.label}</span>
              <span class="color-dropdown-meta">SVG</span>
            </span>
          </span>
          <svg class="color-dropdown-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        ${isOpen
          ? html`
              <div class="color-dropdown-panel icon-dropdown-panel">
                <p class="color-dropdown-title">Selecciona un icono</p>
                <div class="icon-swatch-grid">
                  ${ICON_OPTIONS.map(
                    (option) => html`
                      <button
                        class="icon-swatch"
                        type="button"
                        data-active=${String(option.value === selectedValue)}
                        @click=${() => {
                          onSelect(option.value);
                          this.openColorDropdown = null;
                        }}
                        aria-label=${option.label}
                        title=${option.label}
                      >
                        <canvas-icon class="icon-swatch-preview" .icon=${option.value}></canvas-icon>
                      </button>
                    `,
                  )}
                </div>
              </div>
            `
          : null}
      </div>
    `;
  }

  private renderMicroIllustrationDropdown(
    selectedValue: MicroIllustrationName,
    onSelect: (value: MicroIllustrationName) => void,
  ) {
    const selectedOption =
      MICRO_ILLUSTRATION_OPTIONS.find((option) => option.value === selectedValue) ??
      MICRO_ILLUSTRATION_OPTIONS[0];
    const isOpen = this.openColorDropdown === 'micro-illustration';

    return html`
      <div class="color-dropdown" data-color-dropdown="true">
        <button
          class="color-dropdown-trigger"
          type="button"
          data-open=${String(isOpen)}
          @click=${() => this.toggleColorDropdown('micro-illustration')}
        >
          <span class="color-dropdown-trigger-main">
            <div class="micro-swatch-preview" style="width:32px;height:32px;">
              <canvas-micro-illustration
                .illustration=${selectedOption.value}
              ></canvas-micro-illustration>
            </div>
            <span class="color-dropdown-value">
              <span class="color-dropdown-label">${selectedOption.label}</span>
              <span class="color-dropdown-meta">PNG</span>
            </span>
          </span>
          <svg class="color-dropdown-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        ${isOpen
          ? html`
              <div class="color-dropdown-panel icon-dropdown-panel">
                <p class="color-dropdown-title">Selecciona una micro ilustracion</p>
                <div class="icon-swatch-grid">
                  ${MICRO_ILLUSTRATION_OPTIONS.map(
                    (option) => html`
                      <button
                        class="icon-swatch"
                        type="button"
                        data-active=${String(option.value === selectedValue)}
                        @click=${() => {
                          onSelect(option.value);
                          this.openColorDropdown = null;
                        }}
                        aria-label=${option.label}
                        title=${option.label}
                      >
                        <div class="micro-swatch-preview">
                          <canvas-micro-illustration
                            .illustration=${option.value}
                          ></canvas-micro-illustration>
                        </div>
                      </button>
                    `,
                  )}
                </div>
              </div>
            `
          : null}
      </div>
    `;
  }

  private renderToolPreview() {
    if (!this.selectedToolPreview) {
      return null;
    }

    if (this.selectedToolPreview === 'tipografia') {
      return html`
        <div class="preview-canvas">
          <div class="preview-text">
            <canvas-tipografia
              .itemId=${'preview-tipografia'}
              .preset=${this.toolTypographyPreset}
              .text=${'Texto de ejemplo'}
              .align=${'left'}
              .bold=${false}
              .italic=${false}
              .color=${'var(--color-text)'}
              .fontSize=${32}
              .editing=${false}
            ></canvas-tipografia>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'main-button') {
      return html`
        <div class="preview-canvas">
          <div class="preview-button">
            <canvas-main-button .label=${'Conoce más'}></canvas-main-button>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'secondary-button') {
      return html`
        <div class="preview-canvas">
          <div class="preview-button">
            <canvas-secondary-button .label=${'Conoce más'}></canvas-secondary-button>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'opportunity-button') {
      return html`
        <div class="preview-canvas">
          <div class="preview-button">
            <canvas-opportunity-button .label=${'Conoce más'}></canvas-opportunity-button>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'icon') {
      return html`
        <div class="preview-canvas">
          <div style="width:40px; height:40px;">
            <canvas-icon .icon=${ICON_OPTIONS[0].value}></canvas-icon>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'desktop-menu') {
      return html`
        <div class="preview-canvas">
          <div class="preview-desktop-menu">
            <canvas-desktop-menu></canvas-desktop-menu>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'logo') {
      return html`
        <div class="preview-canvas">
          <div style="width:120px; height:32px;">
            <canvas-logo></canvas-logo>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'micro-illustration') {
      return html`
        <div class="preview-canvas">
          <div style="width:96px; height:96px;">
            <canvas-micro-illustration
              .illustration=${MICRO_ILLUSTRATION_OPTIONS[0].value}
            ></canvas-micro-illustration>
          </div>
        </div>
      `;
    }

    return html`
      <div class="preview-canvas">
        <div class="preview-container">
          <canvas-contenedor .background=${'transparent'} .borderRadius=${0}></canvas-contenedor>
        </div>
      </div>
    `;
  }

  private renderToolPreviewPopover(tool: ToolPreview) {
    if (this.selectedToolPreview !== tool) {
      return null;
    }

    return html`<div class="tool-preview-popover" data-tool=${tool ?? ''}>${this.renderToolPreview()}</div>`;
  }

  private toggleCodeView() {
    this.handleWindowPointerUp();
    this.isCanvasDragActive = false;
    this.openColorDropdown = null;
    this.isCodeView = !this.isCodeView;
  }

  private getFontFamilyForPreset(preset: TypographyPreset) {
    return preset === 'tiempos-headline' ? "'Tiempos Headline', serif" : "'Benton Sans BBVA', sans-serif";
  }

  private getFontWeightForItem(item: CanvasTypographyItem) {
    const baseWeight =
      item.preset === 'benton-book' ? 400 : item.preset === 'tiempos-headline' ? 700 : 500;

    if (!item.bold) {
      return baseWeight;
    }

    return item.preset === 'tiempos-headline' ? 800 : 700;
  }

  private getFontStyleForItem(item: CanvasTypographyItem) {
    if (item.preset === 'benton-medium-italic') {
      return 'italic';
    }

    return item.italic ? 'italic' : 'normal';
  }

  private escapeCodeText(text: string) {
    return text
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  private buildTypographyCode(item: CanvasTypographyItem) {
    const style = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      `font-family: ${this.getFontFamilyForPreset(item.preset)}`,
      `font-size: ${item.fontSize}px`,
      `color: ${item.color}`,
      `font-weight: ${this.getFontWeightForItem(item)}`,
      `font-style: ${this.getFontStyleForItem(item)}`,
      `text-align: ${item.align}`,
      'line-height: 0.95',
      'white-space: nowrap',
      'overflow: hidden',
      'text-overflow: ellipsis',
      'margin: 0',
    ].join('; ');

    return `  <p style="${style}">${this.escapeCodeText(item.text)}</p>`;
  }

  private buildButtonCode(item: CanvasButtonItem) {
    const background =
      item.variant === 'secondary'
        ? '#ffffff'
        : item.variant === 'opportunity'
          ? 'var(--color-primary)'
          : 'linear-gradient(180deg, #1829b8 0%, #1220a0 100%)';
    const color = item.variant === 'secondary' ? '#1829b8' : '#ffffff';
    const shadow =
      item.variant === 'secondary'
        ? '0 16px 32px rgba(10, 19, 92, 0.14)'
        : item.variant === 'opportunity'
          ? '0 16px 32px rgba(45, 124, 255, 0.22)'
          : '0 16px 32px rgba(10, 19, 92, 0.18)';

    const style = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      'border: none',
      'border-radius: 18px',
      `background: ${background}`,
      `color: ${color}`,
      "font-family: 'Benton Sans BBVA', sans-serif",
      'font-size: 22px',
      'font-weight: 500',
      'line-height: 1',
      'letter-spacing: -0.01em',
      `box-shadow: ${shadow}`,
    ].join('; ');

    const actionAttribute = item.action
      ? ` data-action="${this.escapeCodeText(item.action)}"`
      : '';

    return `  <button style="${style}"${actionAttribute}>${this.escapeCodeText(item.label)}</button>`;
  }

  private buildIconCode(item: CanvasIconItem): string {
    const icon = ICON_OPTIONS.find((option) => option.value === item.icon) ?? ICON_OPTIONS[0];
    const style = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      'color: #001391',
    ].join('; ');

    return `  <div style="${style}"><svg viewBox="${icon.viewBox}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">${icon.body}</svg></div>`;
  }

  private buildDesktopMenuCode(item: CanvasDesktopMenuItem): string {
    const style = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      'box-sizing: border-box',
      'display: flex',
      'align-items: center',
      'justify-content: space-between',
      'gap: 24px',
      'padding: 22px 30px',
      'border-radius: 28px',
      'background: #ffffff',
      'box-shadow: 0 14px 34px rgba(24, 37, 76, 0.1)',
      'overflow: hidden',
      "font-family: 'Benton Sans BBVA', sans-serif",
    ].join('; ');

    const navStyle = [
      'display: flex',
      'align-items: center',
      'gap: 26px',
      'white-space: nowrap',
      'color: #0b1f8f',
      'font-size: 15px',
      'font-weight: 500',
      'line-height: 1.1',
      'letter-spacing: -0.01em',
    ].join('; ');

    const actionStyle = [
      'display: flex',
      'align-items: center',
      'gap: 18px',
      'white-space: nowrap',
    ].join('; ');

    return [
      `  <header style="${style}">`,
      `    <img src="https://www.bbva.mx/content/dam/library/logos/logo-bbva.svg" alt="BBVA" style="height:48px;width:auto;display:block;" />`,
      `    <nav style="${navStyle}" aria-label="Navegacion principal">`,
      `      <span style="padding-bottom:6px;border-bottom:2px solid #102694;">Personas</span>`,
      `      <span>Empresas y Gobierno</span>`,
      `      <span>Pyme</span>`,
      `    </nav>`,
      `    <div style="${actionStyle}">`,
      `      <button type="button" style="height:56px;padding:0 26px;border:none;border-radius:14px;background:linear-gradient(180deg, #ffffff 0%, #f3f5fb 100%);box-shadow:inset 0 0 0 1px rgba(217, 225, 238, 0.98), 0 10px 24px rgba(24, 37, 76, 0.08);color:#1030a4;font-family:'Benton Sans BBVA', sans-serif;font-size:15px;font-weight:500;">Acceso</button>`,
      `      <button type="button" style="height:56px;padding:0 26px;border:none;border-radius:14px;background:linear-gradient(180deg, #2d7cff 0%, #1462ee 100%);box-shadow:0 14px 28px rgba(33, 94, 224, 0.24);color:#ffffff;font-family:'Benton Sans BBVA', sans-serif;font-size:15px;font-weight:500;">Hazte cliente</button>`,
      `      <span style="display:inline-flex;align-items:center;color:#0f278f;font-size:15px;font-weight:500;">Buscar</span>`,
      `      <span style="display:inline-flex;align-items:center;color:#0f278f;font-size:15px;font-weight:500;">Menú</span>`,
      `    </div>`,
      `  </header>`,
    ].join('\n');
  }

  private buildLogoCode(item: CanvasLogoItem): string {
    const style = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      'display: block',
    ].join('; ');

    return `  <img src="https://www.bbva.mx/content/dam/library/logos/logo-bbva.svg" alt="Logo BBVA" style="${style}" />`;
  }

  private buildMicroIllustrationCode(item: CanvasMicroIllustrationItem): string {
    const illustration =
      MICRO_ILLUSTRATION_OPTIONS.find((option) => option.value === item.illustration) ??
      MICRO_ILLUSTRATION_OPTIONS[0];
    const style = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      'display: block',
      'object-fit: contain',
    ].join('; ');

    return `  <img src="${illustration.src}" alt="${illustration.label}" style="${style}" />`;
  }

  private buildCanvasEntryCode(entry: CanvasEntry): string {
    if (entry.kind === 'typography') {
      return this.buildTypographyCode(entry.item);
    }

    if (entry.kind === 'button') {
      return this.buildButtonCode(entry.item);
    }

    if (entry.kind === 'icon') {
      return this.buildIconCode(entry.item);
    }

    if (entry.kind === 'desktop-menu') {
      return this.buildDesktopMenuCode(entry.item);
    }

    if (entry.kind === 'logo') {
      return this.buildLogoCode(entry.item);
    }

    if (entry.kind === 'micro-illustration') {
      return this.buildMicroIllustrationCode(entry.item);
    }

    return this.buildContainerCode(entry.item);
  }

  private buildContainerCode(item: CanvasContainerItem): string {
    const columns = this.viewport === 'mobile' ? 4 : 12;
    const start = this.viewport === 'mobile' ? item.mobileStart : item.desktopStart;
    const span = this.viewport === 'mobile' ? item.mobileSpan : item.desktopSpan;
    const style = [
      'position: absolute',
      `left: ${this.getContainerLeftPercent(start, columns)}%`,
      `top: ${Math.round(item.y)}px`,
      `width: ${this.getContainerWidthPercent(span, columns)}%`,
      `height: ${Math.round(item.height)}px`,
      `padding: ${item.paddingTop}px ${item.paddingRight}px ${item.paddingBottom}px ${item.paddingLeft}px`,
      'box-sizing: border-box',
      `border-radius: ${item.borderRadius}px`,
      'border: 2px solid #2457ff',
      `background: ${item.background}`,
    ].join('; ');

    const children: string[] = this.getContainerChildren(item.id).map((child) =>
      this.buildCanvasEntryCode(child),
    );

    if (children.length === 0) {
      return `  <div style="${style}"></div>`;
    }

    return [
      `  <div style="${style}">`,
      ...children.map((line: string) => `    ${line.trimStart()}`),
      `  </div>`,
    ].join('\n');
  }

  private buildCanvasCode() {
    const lines = [
      `<div class="canvas canvas--${this.viewport}" style="position: relative; min-height: 780px; background: ${this.canvasBackground};">`,
      ...(this.rootCanvasItems.length === 0
        ? ['  <!-- Arrastra "Textos", botones o "Contenedor" desde el panel para comenzar -->']
        : this.rootCanvasItems.map((entry) => this.buildCanvasEntryCode(entry))),
      `</div>`,
    ];

    return lines.join('\n');
  }

  private handleCanvasDragOver(event: DragEvent) {
    if (this.isCodeView) {
      return;
    }

    const draggedTool =
      this.activeDraggedTool ??
      event.dataTransfer?.getData('application/x-ui-tool') ??
      event.dataTransfer?.getData('text/plain');

    if (
      draggedTool !== 'tipografia' &&
      draggedTool !== 'main-button' &&
      draggedTool !== 'secondary-button' &&
      draggedTool !== 'opportunity-button' &&
      draggedTool !== 'icon' &&
      draggedTool !== 'desktop-menu' &&
      draggedTool !== 'logo' &&
      draggedTool !== 'micro-illustration' &&
      draggedTool !== 'contenedor'
    ) {
      return;
    }

    event.preventDefault();
    this.isCanvasDragActive = true;
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  private handleCanvasDragLeave(event: DragEvent) {
    if (this.isCodeView) {
      return;
    }

    const relatedTarget = event.relatedTarget as Node | null;
    const currentTarget = event.currentTarget as HTMLElement;

    if (relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }

    this.isCanvasDragActive = false;
  }

  private handleCanvasDrop(event: DragEvent) {
    if (this.isCodeView) {
      return;
    }

    event.preventDefault();
    this.isCanvasDragActive = false;

    const tool =
      this.activeDraggedTool ??
      event.dataTransfer?.getData('application/x-ui-tool') ??
      event.dataTransfer?.getData('text/plain');

    this.activeDraggedTool = null;

    const canvas = event.currentTarget as HTMLElement;
    const rect = canvas.getBoundingClientRect();
    const dropContainer = this.getDropContainerAtPoint(event.clientX, event.clientY);

    if (tool === 'tipografia') {
      const itemWidth = this.viewport === 'mobile' ? 208 : 240;
      const itemHeight = 120;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createTypographyItem(x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'main-button') {
      const itemWidth = this.viewport === 'mobile' ? 248 : 304;
      const itemHeight = 55;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createButtonItem('main', x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'secondary-button') {
      const itemWidth = this.viewport === 'mobile' ? 248 : 304;
      const itemHeight = 55;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createButtonItem('secondary', x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'opportunity-button') {
      const itemWidth = this.viewport === 'mobile' ? 248 : 304;
      const itemHeight = 55;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createButtonItem('opportunity', x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'icon') {
      const itemWidth = 40;
      const itemHeight = 40;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createIconItem(x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'desktop-menu') {
      const hostRect = dropContainer?.rect ?? rect;
      const itemWidth = Math.min(hostRect.width, this.viewport === 'mobile' ? 338 : 880);
      const itemHeight = 118;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createDesktopMenuItem(x, y, dropContainer?.container.id ?? null, itemWidth);
      return;
    }

    if (tool === 'logo') {
      const itemWidth = 120;
      const itemHeight = 32;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createLogoItem(x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'micro-illustration') {
      const itemWidth = 96;
      const itemHeight = 96;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createMicroIllustrationItem(x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'contenedor') {
      const columns = this.getGridColumns();
      const span = this.viewport === 'mobile' ? 4 : 6;
      const itemWidth = (rect.width * span) / columns;
      const itemHeight = 168;
      const canAbsorb =
        dropContainer &&
        dropContainer.rect.width > itemWidth &&
        dropContainer.rect.height > itemHeight;
      const hostRect = canAbsorb ? dropContainer.rect : rect;
      const nextLeft = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const nextY = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );
      const start = this.getContainerStartFromX(nextLeft, hostRect.width, columns, span);

      this.createContainerItem(
        nextY,
        this.viewport === 'desktop' ? start : 1,
        this.viewport === 'mobile' ? start : 1,
        canAbsorb ? dropContainer.container.id : null,
      );
    }
  }

  private setViewport(viewport: 'desktop' | 'mobile') {
    if (this.viewport === viewport) {
      return;
    }

    this.isViewportTransitioning = true;
    this.viewport = viewport;
    window.clearTimeout(this.viewportAnimationTimeout);
    this.viewportAnimationTimeout = window.setTimeout(() => {
      this.isViewportTransitioning = false;
    }, 280);
  }

  private renderCanvasButton(item: CanvasButtonItem): TemplateResult {
    return item.variant === 'secondary'
      ? html`<canvas-secondary-button .label=${item.label}></canvas-secondary-button>`
      : item.variant === 'opportunity'
        ? html`<canvas-opportunity-button .label=${item.label}></canvas-opportunity-button>`
        : html`<canvas-main-button .label=${item.label}></canvas-main-button>`;
  }

  private renderCanvasEntry(entry: CanvasEntry): TemplateResult {
    if (entry.kind === 'typography') {
      const item = entry.item;

      return html`
        <div
          class="canvas-item"
          data-kind="typography"
          data-item-id=${item.id}
          data-selected=${String(this.selectedTypographyId === item.id)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @dblclick=${(event: MouseEvent) => {
            event.stopPropagation();
            this.handleCanvasItemDoubleClick(item.id);
          }}
          @pointerdown=${(event: PointerEvent) => {
            event.stopPropagation();
            this.handleCanvasItemPointerDown(event, item.id);
          }}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-tipografia
            .itemId=${item.id}
            .preset=${item.preset}
            .text=${item.text}
            .align=${item.align}
            .bold=${item.bold}
            .italic=${item.italic}
            .color=${item.color}
            .fontSize=${item.fontSize}
            .editing=${this.editingTypographyId === item.id}
          ></canvas-tipografia>
        </div>
      `;
    }

    if (entry.kind === 'button') {
      const item = entry.item;

      return html`
        <div
          class="canvas-item"
          data-kind="button"
          data-item-id=${item.id}
          data-selected=${String(this.selectedTypographyId === item.id)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @dblclick=${(event: MouseEvent) => {
            event.stopPropagation();
            this.handleCanvasItemDoubleClick(item.id);
          }}
          @pointerdown=${(event: PointerEvent) => {
            event.stopPropagation();
            this.handleCanvasItemPointerDown(event, item.id);
          }}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          ${this.renderCanvasButton(item)}
        </div>
      `;
    }

    if (entry.kind === 'icon') {
      const item = entry.item;

      return html`
        <div
          class="canvas-item"
          data-kind="icon"
          data-item-id=${item.id}
          data-selected=${String(this.selectedTypographyId === item.id)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @dblclick=${(event: MouseEvent) => {
            event.stopPropagation();
            this.handleCanvasItemDoubleClick(item.id);
          }}
          @pointerdown=${(event: PointerEvent) => {
            event.stopPropagation();
            this.handleCanvasItemPointerDown(event, item.id);
          }}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-icon .icon=${item.icon}></canvas-icon>
        </div>
      `;
    }

    if (entry.kind === 'desktop-menu') {
      const item = entry.item;

      return html`
        <div
          class="canvas-item"
          data-kind="desktop-menu"
          data-item-id=${item.id}
          data-selected=${String(this.selectedTypographyId === item.id)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @dblclick=${(event: MouseEvent) => {
            event.stopPropagation();
            this.handleCanvasItemDoubleClick(item.id);
          }}
          @pointerdown=${(event: PointerEvent) => {
            event.stopPropagation();
            this.handleCanvasItemPointerDown(event, item.id);
          }}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-desktop-menu></canvas-desktop-menu>
        </div>
      `;
    }

    if (entry.kind === 'logo') {
      const item = entry.item;

      return html`
        <div
          class="canvas-item"
          data-kind="logo"
          data-item-id=${item.id}
          data-selected=${String(this.selectedTypographyId === item.id)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @dblclick=${(event: MouseEvent) => {
            event.stopPropagation();
            this.handleCanvasItemDoubleClick(item.id);
          }}
          @pointerdown=${(event: PointerEvent) => {
            event.stopPropagation();
            this.handleCanvasItemPointerDown(event, item.id);
          }}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-logo></canvas-logo>
        </div>
      `;
    }

    if (entry.kind === 'micro-illustration') {
      const item = entry.item;

      return html`
        <div
          class="canvas-item"
          data-kind="micro-illustration"
          data-item-id=${item.id}
          data-selected=${String(this.selectedTypographyId === item.id)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @dblclick=${(event: MouseEvent) => {
            event.stopPropagation();
            this.handleCanvasItemDoubleClick(item.id);
          }}
          @pointerdown=${(event: PointerEvent) => {
            event.stopPropagation();
            this.handleCanvasItemPointerDown(event, item.id);
          }}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-micro-illustration
            .illustration=${item.illustration}
          ></canvas-micro-illustration>
        </div>
      `;
    }

    const item = entry.item;

    return html`
      <div
        class="canvas-item"
        data-kind="container"
        data-item-id=${item.id}
        data-selected=${String(this.selectedTypographyId === item.id)}
        style=${`left:${this.getContainerLeftPercent(
          this.viewport === 'mobile' ? item.mobileStart : item.desktopStart,
          this.getGridColumns(),
        )}%; top:${item.y}px; width:${this.getContainerWidthPercent(
          this.viewport === 'mobile' ? item.mobileSpan : item.desktopSpan,
          this.getGridColumns(),
        )}%; height:${item.height}px;`}
        @dblclick=${(event: MouseEvent) => {
          event.stopPropagation();
          this.handleCanvasItemDoubleClick(item.id);
        }}
        @pointerdown=${(event: PointerEvent) => {
          event.stopPropagation();
          this.handleCanvasItemPointerDown(event, item.id);
        }}
      >
        <span class="handle top-left"></span>
        <span class="handle top-right"></span>
        <span class="handle bottom-left"></span>
        <span class="handle bottom-right"></span>
        <canvas-contenedor
          .background=${item.background}
          .borderRadius=${item.borderRadius}
        ></canvas-contenedor>
        <div
          class="container-content"
          data-container-content-id=${item.id}
          style=${`top:${item.paddingTop}px; right:${item.paddingRight}px; bottom:${item.paddingBottom}px; left:${item.paddingLeft}px;`}
        >
          ${this.getContainerChildren(item.id).map((child) => this.renderCanvasEntry(child))}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="workspace" data-dragging=${String(this.activeDraggedTool !== null)}>
        <section class="stage">
          <div
            class="canvas-frame"
            data-mode=${this.viewport}
            data-transitioning=${String(this.isViewportTransitioning)}
          >
            <div class="canvas-controls">
              <button class="canvas-title" type="button" @click=${this.handleCanvasTitleClick}>
                Lienzo
              </button>

              <div class="canvas-controls-right">
                <div class="segmented" aria-label="Viewport selector">
                  <button
                    class="segment-button"
                    data-active=${String(this.viewport === 'desktop')}
                    @click=${() => this.setViewport('desktop')}
                  >
                    Desktop
                  </button>
                  <button
                    class="segment-button"
                    data-active=${String(this.viewport === 'mobile')}
                    @click=${() => this.setViewport('mobile')}
                  >
                    Mobile
                  </button>
                </div>
                <button
                  class="canvas-add-button"
                  type="button"
                  @click=${this.handleCreateCanvas}
                  aria-label="Crear otro lienzo"
                  title="Crear otro lienzo"
                >
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M10 4v12M4 10h12"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="canvas-tabs" aria-label="Lista de lienzos">
              ${this.canvases.map(
                (canvas) => html`
                  <button
                    class="canvas-tab"
                    type="button"
                    data-active=${String(canvas.id === this.activeCanvasId)}
                    @click=${() => this.handleSelectCanvas(canvas.id)}
                  >
                    ${canvas.name}
                  </button>
                `,
              )}
            </div>

            <div class="canvas-shell">
            <div class="canvas">
              <div class="canvas-body">
                <div
                  class=${this.isCodeView ? 'page-preview code-view' : 'page-preview'}
                  data-mode=${this.viewport}
                  data-drag-active=${String(!this.isCodeView && this.isCanvasDragActive)}
                  style=${`--canvas-background:${this.canvasBackground};`}
                  @click=${this.handleCanvasClick}
                  @dragover=${this.handleCanvasDragOver}
                  @dragleave=${this.handleCanvasDragLeave}
                  @drop=${this.handleCanvasDrop}
                  @text-change=${this.handleTypographyTextChange}
                  @text-edit-finish=${this.handleTypographyEditFinish}
                >
                  ${this.isCodeView
                    ? html`<pre class="code-block">${this.buildCanvasCode()}</pre>`
                    : html`
                        ${!this.hasCanvasItems
                          ? html`<div class="page-preview-empty">
                              Arrastra "Textos", botones o "Contenedor" desde el panel para comenzar.
                            </div>`
                          : null}

                        ${this.rootCanvasItems.map((entry) => this.renderCanvasEntry(entry))}
                      `}
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        <aside class="tools-panel">
          <div class="tool-section">
            <div class="panel-head">
              <h2 class="panel-title">
                ${this.selectedTypographyItem
                  ? 'Edicion de texto'
                  : this.editingMicroIllustrationId && this.selectedMicroIllustrationItem
                    ? 'Edicion de micro ilustracion'
                  : this.editingLogoId && this.selectedLogoItem
                    ? 'Edicion de logo'
                  : this.editingIconId && this.selectedIconItem
                    ? 'Edicion de icono'
                  : this.editingButtonId && this.selectedButtonItem
                    ? 'Edicion de boton'
                    : this.editingContainerId && this.selectedContainerItem
                      ? 'Edicion de contenedor'
                      : this.isCanvasEditing
                        ? 'Edicion de lienzo'
                    : 'Herramientas'}
              </h2>
              <div class="panel-actions">
                <button
                  class="panel-action"
                  data-active=${String(this.isCodeView)}
                  @click=${this.toggleCodeView}
                  aria-label=${this.isCodeView ? 'Volver al lienzo' : 'Ver codigo'}
                  title=${this.isCodeView ? 'Volver al lienzo' : 'Ver codigo'}
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M7 5L3 10l4 5M13 5l4 5-4 5M11 3l-2 14"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                ${this.selectedTypographyId || this.isCanvasEditing
                  ? html`
                      <button
                        class="panel-action"
                        @click=${() => {
                          this.clearActiveEditingState();
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path
                            d="M5 5l10 10M15 5L5 15"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                    `
                  : null}
              </div>
            </div>
          </div>

          ${this.selectedTypographyItem
            ? html`
                <div class="tool-group">
                  <h3 class="section-title">Texto seleccionado</h3>
                  <div class="editor-stack">
                    <div class="editor-row">
                      <p class="editor-label">Tipografia</p>
                      <select
                        class="editor-select"
                        .value=${this.selectedTypographyItem.preset}
                        @change=${this.handleSelectedPresetChange}
                      >
                        ${TYPOGRAPHY_PRESET_OPTIONS.map(
                          (option) =>
                            html`<option value=${option.value}>${option.label}</option>`,
                        )}
                      </select>
                    </div>

                    <div class="editor-row">
                      <p class="editor-label">Alineacion</p>
                      <div class="editor-actions">
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.align === 'left')}
                          @click=${() => this.setSelectedAlignment('left')}
                          aria-label="Alinear a la izquierda"
                          title="Alinear a la izquierda"
                        >
                          <svg class="align-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M3 5h10M3 8.5h7M3 12h10M3 15.5h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                          </svg>
                        </button>
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.align === 'center')}
                          @click=${() => this.setSelectedAlignment('center')}
                          aria-label="Centrar texto"
                          title="Centrar texto"
                        >
                          <svg class="align-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M5 5h10M6.5 8.5h7M5 12h10M7 15.5h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                          </svg>
                        </button>
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.align === 'right')}
                          @click=${() => this.setSelectedAlignment('right')}
                          aria-label="Alinear a la derecha"
                          title="Alinear a la derecha"
                        >
                          <svg class="align-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M7 5h10M10 8.5h7M7 12h10M11 15.5h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="editor-row">
                      <p class="editor-label">Color</p>
                      ${this.renderColorDropdown('text', TEXT_COLOR_OPTIONS, this.selectedTypographyItem.color, (value) =>
                        this.updateSelectedTypographyItem({ color: value }),
                      )}
                    </div>

                    <div class="editor-row">
                      <p class="editor-label">Estilo</p>
                      <div class="editor-actions">
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.bold)}
                          @click=${this.toggleSelectedBold}
                        >
                          Bold
                        </button>
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.italic)}
                          @click=${this.toggleSelectedItalic}
                        >
                          Italic
                        </button>
                      </div>
                    </div>

                    <div class="editor-row">
                      <div class="editor-range-wrap">
                        <div class="editor-range-head">
                          <p class="editor-label">Tamano</p>
                          <span class="editor-range-value">
                            ${this.selectedTypographyItem.fontSize}px
                          </span>
                        </div>
                        <input
                          class="editor-range"
                          type="range"
                          min="16"
                          max="96"
                          step="1"
                          .value=${String(this.selectedTypographyItem.fontSize)}
                          @input=${this.handleSelectedFontSizeInput}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                `
              : this.editingIconId && this.selectedIconItem
                ? html`
                  <div class="tool-group">
                    <h3 class="section-title">Icono seleccionado</h3>
                    <div class="editor-stack">
                      <div class="editor-row">
                        <p class="editor-label">SVG</p>
                        ${this.renderIconDropdown(this.selectedIconItem.icon, (value) =>
                          this.updateSelectedIconItem({ icon: value }),
                        )}
                      </div>
                    </div>
                  </div>
                `
              : this.editingMicroIllustrationId && this.selectedMicroIllustrationItem
                ? html`
                  <div class="tool-group">
                    <h3 class="section-title">Micro ilustracion seleccionada</h3>
                    <div class="editor-stack">
                      <div class="editor-row">
                        <p class="editor-label">Micro ilustracion</p>
                        ${this.renderMicroIllustrationDropdown(
                          this.selectedMicroIllustrationItem.illustration,
                          (value) => this.updateSelectedMicroIllustrationItem({ illustration: value }),
                        )}
                      </div>
                    </div>
                  </div>
                `
              : this.editingLogoId && this.selectedLogoItem
                ? html`
                  <div class="tool-group">
                    <h3 class="section-title">Logo seleccionado</h3>
                    <div class="editor-stack">
                      <p class="editor-help">
                        Este componente usa el logo BBVA desde la libreria oficial y puedes moverlo o redimensionarlo en el lienzo.
                      </p>
                    </div>
                  </div>
                `
              : this.editingButtonId && this.selectedButtonItem
                ? html`
                  <div class="tool-group">
                    <h3 class="section-title">Boton seleccionado</h3>
                    <div class="editor-stack">
                      <div class="editor-row">
                        <p class="editor-label">Texto</p>
                        <input
                          class="editor-input"
                          type="text"
                          .value=${this.selectedButtonItem.label}
                          placeholder="Conoce más"
                          @input=${this.handleSelectedButtonLabelInput}
                        />
                      </div>

                      <div class="editor-row">
                        <p class="editor-label">Alto</p>
                        <select
                          class="editor-select"
                          .value=${String(this.selectedButtonItem.height)}
                          @change=${this.handleSelectedButtonHeightChange}
                        >
                          ${BUTTON_HEIGHT_OPTIONS.map(
                            (height) => html`<option value=${String(height)}>${height}px</option>`,
                          )}
                        </select>
                      </div>

                      <div class="editor-row">
                        <p class="editor-label">Accion</p>
                        <input
                          class="editor-input"
                          type="text"
                          .value=${this.selectedButtonItem.action}
                          placeholder="ej. abrir-modal-contacto"
                          @input=${this.handleSelectedButtonActionInput}
                        />
                        <p class="editor-help">
                          Define la accion que quieres asociar a este boton.
                        </p>
                      </div>
                    </div>
                  </div>
                `
              : this.editingContainerId && this.selectedContainerItem
                ? html`
                    <div class="tool-group">
                      <h3 class="section-title">Contenedor seleccionado</h3>
                      <div class="editor-stack">
                        <div class="editor-row">
                          <p class="editor-label">Fondo</p>
                          ${this.renderColorDropdown(
                            'container',
                            CONTAINER_BACKGROUND_OPTIONS,
                            this.selectedContainerItem.background,
                            (value) => this.updateSelectedContainerItem({ background: value }),
                          )}
                        </div>

                        <div class="editor-row">
                          <p class="editor-label">Desktop</p>
                          <select
                            class="editor-select"
                            .value=${String(this.selectedContainerItem.desktopSpan)}
                            @change=${this.handleSelectedContainerDesktopSpanChange}
                          >
                            ${Array.from({ length: 12 }, (_, index) => {
                              const span = index + 1;
                              return html`
                                <option value=${String(span)}>
                                  ${span} columnas · ${this.getContainerPercentage(span, 12)}%
                                </option>
                              `;
                            })}
                          </select>
                        </div>

                        <div class="editor-row">
                          <p class="editor-label">Mobile</p>
                          <select
                            class="editor-select"
                            .value=${String(this.selectedContainerItem.mobileSpan)}
                            @change=${this.handleSelectedContainerMobileSpanChange}
                          >
                            ${Array.from({ length: 4 }, (_, index) => {
                              const span = index + 1;
                              return html`
                                <option value=${String(span)}>
                                  ${span} columnas · ${this.getContainerPercentage(span, 4)}%
                                </option>
                              `;
                            })}
                          </select>
                        </div>

                        <div class="editor-row">
                          <div class="editor-range-wrap">
                            <div class="editor-range-head">
                              <p class="editor-label">Radio</p>
                              <span class="editor-range-value">
                                ${this.selectedContainerItem.borderRadius}px
                              </span>
                            </div>
                            <input
                              class="editor-range"
                              type="range"
                              min="0"
                              max="40"
                              step="1"
                              .value=${String(this.selectedContainerItem.borderRadius)}
                              @input=${this.handleSelectedContainerRadiusInput}
                            />
                          </div>
                        </div>

                        <div class="editor-row">
                          <div class="editor-range-wrap">
                            <div class="editor-range-head">
                              <p class="editor-label">Altura</p>
                              <span class="editor-range-value">
                                ${this.selectedContainerItem.height}px
                              </span>
                            </div>
                            <input
                              class="editor-range"
                              type="range"
                              min="96"
                              max="420"
                              step="4"
                              .value=${String(this.selectedContainerItem.height)}
                              @input=${this.handleSelectedContainerHeightInput}
                            />
                          </div>
                        </div>

                        <div class="editor-row">
                          <div class="editor-range-wrap">
                            <div class="editor-range-head">
                              <p class="editor-label">Padding</p>
                              <span class="editor-range-value">
                                ${this.selectedContainerItem.paddingTop}px /
                                ${this.selectedContainerItem.paddingRight}px /
                                ${this.selectedContainerItem.paddingBottom}px /
                                ${this.selectedContainerItem.paddingLeft}px
                              </span>
                            </div>
                            <div class="editor-grid">
                              <label class="editor-field">
                                <span class="editor-field-label">Top</span>
                                <input
                                  class="editor-input"
                                  type="number"
                                  min="0"
                                  max="120"
                                  step="1"
                                  .value=${String(this.selectedContainerItem.paddingTop)}
                                  @input=${this.handleSelectedContainerPaddingTopInput}
                                />
                              </label>
                              <label class="editor-field">
                                <span class="editor-field-label">Right</span>
                                <input
                                  class="editor-input"
                                  type="number"
                                  min="0"
                                  max="120"
                                  step="1"
                                  .value=${String(this.selectedContainerItem.paddingRight)}
                                  @input=${this.handleSelectedContainerPaddingRightInput}
                                />
                              </label>
                              <label class="editor-field">
                                <span class="editor-field-label">Bottom</span>
                                <input
                                  class="editor-input"
                                  type="number"
                                  min="0"
                                  max="120"
                                  step="1"
                                  .value=${String(this.selectedContainerItem.paddingBottom)}
                                  @input=${this.handleSelectedContainerPaddingBottomInput}
                                />
                              </label>
                              <label class="editor-field">
                                <span class="editor-field-label">Left</span>
                                <input
                                  class="editor-input"
                                  type="number"
                                  min="0"
                                  max="120"
                                  step="1"
                                  .value=${String(this.selectedContainerItem.paddingLeft)}
                                  @input=${this.handleSelectedContainerPaddingLeftInput}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                `
              : this.isCanvasEditing
                ? html`
                    <div class="tool-group">
                      <h3 class="section-title">Lienzo</h3>
                      <div class="editor-stack">
                        <div class="editor-row">
                          <p class="editor-label">Fondo</p>
                          ${this.renderColorDropdown('canvas', CANVAS_BACKGROUND_OPTIONS, this.canvasBackground, (value) => {
                            this.canvasBackground = value;
                          })}
                        </div>
                      </div>
                    </div>
                  `
              : html`
                <div class="tool-group components-group">
                  <h3 class="section-title">Componentes</h3>
                  <div class="component-tabs" role="tablist" aria-label="Tipos de componentes">
                    <button
                      class="component-tab"
                      type="button"
                      role="tab"
                      data-active=${String(this.componentTab === 'atomos')}
                      aria-selected=${String(this.componentTab === 'atomos')}
                      @click=${() => this.setComponentTab('atomos')}
                    >
                      Atomos
                    </button>
                    <button
                      class="component-tab"
                      type="button"
                      role="tab"
                      data-active=${String(this.componentTab === 'moleculas')}
                      aria-selected=${String(this.componentTab === 'moleculas')}
                      @click=${() => this.setComponentTab('moleculas')}
                    >
                      Moleculas
                    </button>
                  </div>
                  ${this.componentTab === 'atomos'
                    ? html`
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('contenedor')}
                          <tool-contenedor
                            .selected=${this.selectedToolPreview === 'contenedor'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-contenedor>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('tipografia')}
                          <tool-tipografia
                            .preset=${this.toolTypographyPreset}
                            .selected=${this.selectedToolPreview === 'tipografia'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                            @tool-preset-change=${this.handleToolPresetChange}
                          ></tool-tipografia>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('main-button')}
                          <tool-main-button
                            .selected=${this.selectedToolPreview === 'main-button'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-main-button>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('secondary-button')}
                          <tool-secondary-button
                            .selected=${this.selectedToolPreview === 'secondary-button'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-secondary-button>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('opportunity-button')}
                          <tool-opportunity-button
                            .selected=${this.selectedToolPreview === 'opportunity-button'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-opportunity-button>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('icon')}
                          <tool-icon
                            .selected=${this.selectedToolPreview === 'icon'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-icon>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('logo')}
                          <tool-logo
                            .selected=${this.selectedToolPreview === 'logo'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-logo>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('micro-illustration')}
                          <tool-micro-illustration
                            .selected=${this.selectedToolPreview === 'micro-illustration'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-micro-illustration>
                        </div>
                      `
                    : html`
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('desktop-menu')}
                          <tool-desktop-menu
                            .selected=${this.selectedToolPreview === 'desktop-menu'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-desktop-menu>
                        </div>
                      `}
                </div>
              `}
        </aside>
      </div>
    `;
  }
}
