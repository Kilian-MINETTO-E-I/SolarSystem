import {
    DirectionalLight,
} from 'three'

import Experience from "../../Experience";

/**
 * class Environment
 */
export default class Environment
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Environment');
        }

        this.setSunLight();
    }

    setSunLight()
    {
        this.sunLight = new DirectionalLight(0xFFFFFF, 3.8);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 15;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias= 0.05;
        this.sunLight.position.set(3, 3, -2.25);
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
}
