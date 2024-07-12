import {
    AmbientLight,
    DirectionalLight,
} from 'three'

import Experience from "../../Experience";
import Stars from './Stars/Stars';

/**
 * class Environment
 */
export default class Environment
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Environment');
        }

        this.setSunLight();

        this.scene.background = this.resources.items.spaceTexture;

        this.stars = new Stars();
        this.scene.add(this.stars.stars.points);
    }

    setSunLight()
    {
        this.sunLight = new DirectionalLight(0xFFFFFF, 3.8);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 15;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias= 0.05;
        this.sunLight.position.set(0, 0, 0);
        this.scene.add(this.sunLight);

        // Debug
        if (this.debug.active) {
            this.debugFolder.add(this.sunLight, 'intensity').min(0).max(10).step(0.001).name('Sun Light Intensity');
            this.debugFolder.add(this.sunLight, 'castShadow').name('Sun Light Shadow ?');
            this.debugFolder.add(this.sunLight.position, 'x').min(-5).max(5).step(0.001).name('Sun Light Position X');
            this.debugFolder.add(this.sunLight.position, 'y').min(-5).max(5).step(0.001).name('Sun Light Position Y');
            this.debugFolder.add(this.sunLight.position, 'z').min(-5).max(5).step(0.001).name('Sun Light Position Z');
        }
    }

    update()
    {
        if (this.stars) this.stars.update();
    }
}
