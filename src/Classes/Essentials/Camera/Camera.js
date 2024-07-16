/**
 * Imports
 */
import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import Experience from '../../Experience';

/**
 * Class Camera
 */
export default class Camera
{

    /** Camera constructor  */
    constructor()
    {
        // Properties
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.setInstance();
        this.setOrbitControls();
    }

    setInstance()
    {
        this.instance = new PerspectiveCamera(
            75,
            this.sizes.width / this.sizes.height,
            0.1,
            1000
        );
        this.instance.position.set(21, 0, -89);
        this.scene.add(this.instance);
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update()
    {
        this.controls.update();
    }
}
