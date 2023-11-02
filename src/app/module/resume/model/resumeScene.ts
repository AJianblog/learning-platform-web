import { Scene, WebGLRenderer } from "three";

interface ResumeSceneParameters {
  $canvas: HTMLCanvasElement;

  useComposer: boolean;
}

export class ResumeScene {

  $canvas: HTMLCanvasElement;

  useComposer: boolean;

  scene: Scene;

  renderer: WebGLRenderer;
  constructor(options: ResumeSceneParameters) {
    this.$canvas = options.$canvas;
    this.useComposer = options.useComposer;
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      canvas: this.$canvas,
      alpha: true
    });
    this.setRender();
  }

  setRender() {
    this.renderer.setClearColor('#000000', 1)
    this.renderer.setPixelRatio(2)
    // this.renderer.setSize()
  }
}
