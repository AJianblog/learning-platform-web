import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Color,
  DoubleSide,
  Fog,
  HalfFloatType,
  Mesh,
  PerspectiveCamera, RepeatWrapping,
  Scene, ShaderMaterial, Vector3,
  WebGLRenderer
} from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer";
import fragmentShaderVelocity from '../../../../utils/bird/fragmentShaderVelocity.glsl'
import fragmentShaderPosition from '../../../../utils/bird/fragmentShaderPosition.glsl'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { BirdGeometry } from "../../../../utils/bird/BirdGeometry";
import birdVertex from '../../../../utils/bird/birdVertex.glsl'
import birdFragment from '../../../../utils/bird/birdFragment.glsl'

const WIDTH = 32;
const BOUNDS = 800
const BOUNDS_HALF = BOUNDS / 2;

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss']
})
export class BirdComponent implements OnInit, AfterViewInit {

  /**
   * 场景
   */
  scene: Scene;
  /**
   * 相机
   */
  camera: PerspectiveCamera | undefined;

  /**
   * 渲染函数
   */
  renderer: WebGLRenderer;

  /**
   * dom节点
   */
  @ViewChild('graph', { static: true })
  graph: ElementRef | undefined;

  gpuCompute: GPUComputationRenderer | undefined;

  /**
   * 速度
   */
  velocityVariable: any;

  /**
   * 点
   */
  positionVariable: any;

  positionUniforms: any;

  velocityUniforms: any;
  stats: Stats | undefined;
  birdUniforms: any;
  last = performance.now();
  mouseX = 0;
  mouseY = 0;

  constructor() {
    this.renderer = new WebGLRenderer();
    this.scene = new Scene()
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.graph) {

      // 设置背景色和雾
      this.scene.background = new Color(0x673ab7);
      this.scene.fog = new Fog(0xffffff, 100, 1000);
      // 初始化相机以及相机的位置
      this.camera = new PerspectiveCamera(75, this.graph.nativeElement.clientWidth / this.graph.nativeElement.clientHeight, 1, 3000);
      this.camera.position.set(0, 0, 350)

      // 设置像素比以及屏幕的大小
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.graph.nativeElement.clientWidth, this.graph.nativeElement.clientHeight);
      // 将其加入dom节点中
      this.graph.nativeElement.appendChild(this.renderer.domElement);

      this.initComputeRenderer();
      this.stats = new Stats();
      // this.graph.nativeElement.appendChild(this.stats.dom);
      this.graph.nativeElement.style.touchAction = 'none';
      // const gui = new GUI();
      const effectController = {
        separation: 20.0,
        alignment: 20.0,
        cohesion: 20.0,
        freedom: 0.75
      }
      const valuesChanger = () => {
        this.velocityUniforms['separationDistance'].value = effectController.separation;
        this.velocityUniforms['alignmentDistance'].value = effectController.alignment;
        this.velocityUniforms['cohesionDistance'].value = effectController.cohesion;
        this.velocityUniforms['freedomFactor'].value = effectController.freedom;
      };

      valuesChanger();

      // gui.add(effectController, 'separation', 0.0, 100.0, 1.0).onChange(valuesChanger);
      // gui.add(effectController, 'alignment', 0.0, 100, 0.001).onChange(valuesChanger);
      // gui.add(effectController, 'cohesion', 0.0, 100, 0.025).onChange(valuesChanger);
      // gui.close();

      this.initBirds();
      this.renderer.setAnimationLoop(() => {
        // this.stats?.update();
        // 用相机(camera)渲染一个场景(scene)
        this.render()
      })

    }
  }

  render() {
    const now = performance.now();
    let delta = (now - this.last) / 1000;
    if (delta > 1) delta = 1; // safety cap on large deltas
    this.last = now;
    this.positionUniforms['time'].value = now;
    this.positionUniforms['delta'].value = delta;
    this.velocityUniforms['time'].value = now;
    this.velocityUniforms['delta'].value = delta;
    this.birdUniforms['time'].value = now;
    this.birdUniforms['delta'].value = delta;
    this.velocityUniforms['predator'].value.set(0.5 * this.mouseX / this.graph?.nativeElement.clientWidth / 2, -0.5 * this.mouseY / this.graph?.nativeElement.clientHeight / 2, 0);
    this.mouseX = 10000;
    this.mouseY = 10000;
    this.gpuCompute?.compute();
    this.birdUniforms['texturePosition'].value = this.gpuCompute?.getCurrentRenderTarget(this.positionVariable).texture;
    this.birdUniforms['textureVelocity'].value = this.gpuCompute?.getCurrentRenderTarget(this.positionVariable).texture;
    if (this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  initBirds() {
    // 飞鸟
    const geometry = new BirdGeometry();
    // For Vertex and Fragment
    this.birdUniforms = {
      'color': { value: new Color(0xffff00) },
      'texturePosition': { value: null },
      'textureVelocity': { value: null },
      'time': { value: 1.0 },
      'delta': { value: 0.0 }
    };

    // THREE.ShaderMaterial
    const material = new ShaderMaterial({
      uniforms: this.birdUniforms,
      vertexShader: birdVertex,
      fragmentShader: birdFragment,
      side: DoubleSide
    });

    const birdMesh = new Mesh(geometry, material);
    birdMesh.rotation.y = Math.PI / 2;
    birdMesh.matrixAutoUpdate = false;
    birdMesh.updateMatrix();
    this.scene?.add(birdMesh);
  }

  initComputeRenderer() {

    this.gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, this.renderer);

    if (this.renderer?.capabilities.isWebGL2 === false) {
      this.gpuCompute.setDataType(HalfFloatType);
    }

    const dtPosition = this.gpuCompute.createTexture();
    const dtVelocity = this.gpuCompute.createTexture();
    this.fillPositionTexture(dtPosition);
    this.fillVelocityTexture(dtVelocity);

    this.velocityVariable = this.gpuCompute.addVariable('textureVelocity', fragmentShaderVelocity, dtVelocity);
    this.positionVariable = this.gpuCompute.addVariable('texturePosition', fragmentShaderPosition, dtPosition);

    this.gpuCompute.setVariableDependencies(this.velocityVariable, [this.positionVariable, this.velocityVariable]);
    this.gpuCompute.setVariableDependencies(this.positionVariable, [this.positionVariable, this.velocityVariable]);

    this.positionUniforms = this.positionVariable.material.uniforms;
    this.velocityUniforms = this.velocityVariable.material.uniforms;

    this.positionUniforms['time'] = { value: 0.0 };
    this.positionUniforms['delta'] = { value: 0.0 };
    this.velocityUniforms['time'] = { value: 1.0 };
    this.velocityUniforms['delta'] = { value: 0.0 };
    this.velocityUniforms['testing'] = { value: 1.0 };
    this.velocityUniforms['separationDistance'] = { value: 1.0 };
    this.velocityUniforms['alignmentDistance'] = { value: 1.0 };
    this.velocityUniforms['cohesionDistance'] = { value: 1.0 };
    this.velocityUniforms['freedomFactor'] = { value: 1.0 };
    this.velocityUniforms['predator'] = { value: new Vector3() };
    this.velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed(2);

    this.velocityVariable.wrapS = RepeatWrapping;
    this.velocityVariable.wrapT = RepeatWrapping;
    this.positionVariable.wrapS = RepeatWrapping;
    this.positionVariable.wrapT = RepeatWrapping;

    const error = this.gpuCompute.init();
    if (error !== null) {
      console.error(error)
    }

  }

  fillPositionTexture(texture: any) {
    const theArray = texture.image.data;
    for (let k = 0, kl = theArray.length; k < kl; k += 4) {
      const x = Math.random() * BOUNDS - BOUNDS_HALF;
      const y = Math.random() * BOUNDS - BOUNDS_HALF;
      const z = Math.random() * BOUNDS - BOUNDS_HALF;
      theArray[k] = x;
      theArray[k + 1] = y;
      theArray[k + 2] = z;
      theArray[k + 3] = 1;
    }
  }

  fillVelocityTexture(texture: any) {
    const theArray = texture.image.data;
    for (let k = 0, kl = theArray.length; k < kl; k += 4) {
      const x = Math.random() - 0.5;
      const y = Math.random() - 0.5;
      const z = Math.random() - 0.5;
      theArray[k] = x * 10;
      theArray[k + 1] = y * 10;
      theArray[k + 2] = z * 10;
      theArray[k + 3] = 1;
    }
  }

}
