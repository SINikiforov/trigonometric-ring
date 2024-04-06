/*
 *
 * Управление
 *
 */
import * as THREE from './three.module.min.js';

export default class Interaction
{
	constructor(root, origin)
	{
		this.started = false;
		this.root = root;
		this.origin = origin;
		this.name = 'interaction_plane';

		const geometry = new THREE.PlaneGeometry(2, 2);
		let material = new THREE.MeshStandardMaterial({
				color: 0xffff00,
				side: THREE.DoubleSide,
				transparent: true,
				opacity: .1,
				metalness: .99,
				roughness: .01,
				envMap: this.root.env.get_env()
				});
		material.needsUpdate = true;

		this.plane = new THREE.Mesh(geometry, material);
		this.plane.name = this.name;
		this.root.scene.add(this.plane);
		this.plane.position.set(this.origin[0], this.origin[1], this.origin[2]);

		this.raycaster = new THREE.Raycaster();
		this.pointer = new THREE.Vector2();
		this.camera = this.root.scene.get_camera();
		this.scene = this.root.scene.get_scene();

		window.addEventListener('pointermove', (event) => { this.move(event); });
		window.addEventListener('pointerup', () => { this.stop(); });
		window.addEventListener('pointerdown', () => { this.start(); });
		window.addEventListener('pointerleave', () => { this.stop(); });
	}

	move(event)
	{
		this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	}

	start()
	{
		this.started = true;
	}

	stop()
	{
		this.started = false;
		this.root.control.enable();
	}

	render()
	{
		if ( ! this.started) return;
		this.raycaster.setFromCamera(this.pointer, this.camera);
		this.intersects = this.raycaster.intersectObjects(this.scene.children);
		for (let intersect of this.intersects)
		{
			if (intersect.object.name == this.name)
			{
				this.root.control.disable();
				this.uv2angle(intersect.uv.x, intersect.uv.y)
			}
		}
	}

	uv2angle(x, y)
	{
		this.u = (2 * x) - 1;
		this.v = (2 * y) - 1;
		this.angle = Math.atan(this.v / this.u);
		if (this.u < 0) this.angle += Math.PI;
		if (0 == this.v && this.u < 0) this.angle = Math.PI;
		if (0 == this.v && this.u > 0) this.angle = 0;
		this.root.items.triangle.set_angle(this.angle);
	}
}
