import Scene from './Scene.js';
import Light  from './Light.js';
import Items  from './Items.js';
import Control  from './Control.js';
import Env  from './Env.js';

class App
{
	constructor()
	{
		this.init();
	}

	init()
	{
		this.scene = new Scene(this);
		this.light = new Light(this);
		this.env = new Env(this);
		this.control = new Control(this);
		this.items = new Items(this);
		this.animate();
	}

	get_renderer()
	{
		return this.scene.get_renderer();
	}

	get_camera()
	{
		return this.scene.get_camera();
	}

	animate()
	{
		requestAnimationFrame(() => {this.animate();});

		if (undefined != this.control.render) 		this.control.render();
		if (undefined != this.items.render) 		this.items.render();
		if (undefined != this.scene.render) 		this.scene.render();
		//~ if (undefined != this.items.triangle)
		//~ {
			//~ if (undefined == this.angle) this.angle = 0;
			//~ this.angle += 0.01;
			//~ if (this.angle > 2 * Math.PI) this.angle = 0;
			//~ this.items.triangle.set_angle(this.angle);
		//~ }
	}
}


let app = new App();
