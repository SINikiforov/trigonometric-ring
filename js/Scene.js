/*
 *
 * 3D-сцена
 *
 */

import * as THREE from './three.module.min.js';

export default class Scene
{
	constructor(root)
	{
		this.root = root;
		this.init();
	}

	add(item)
	{
		this.scene.add(item);
	}

	init()
	{
		this.scene = new THREE.Scene(); // создание сцены
		this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

		this.camera.position.z = 5; // камеру убрали немного назад
		this.camera.position.y = 3; // камеру поднять немного наверх

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor( 0x4894C1, 1 );
		document.body.appendChild(this.renderer.domElement);

		window.addEventListener('resize', () => { this.resize() });
	}

	get_renderer()
	{
		return this.renderer;
	}

	get_camera()
	{
		return this.camera;
	}

	get_scene()
	{
		return this.scene;
	}

	resize()
	{
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.render();
	}

	render()
	{
		this.renderer.render(this.scene, this.camera);
	}
}
