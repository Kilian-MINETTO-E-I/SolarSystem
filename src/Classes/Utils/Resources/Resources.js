/**
 * Imports
 */
import {
    CubeTextureLoader,
    SRGBColorSpace,
    TextureLoader,
} from "three";
import {
    GLTFLoader,
    RGBELoader
} from "three/examples/jsm/Addons.js";

import EventEmitter from "../Events/EventEmitter";

/**
 * class Resources
 */
export default class Resources extends EventEmitter
{
    /** Resources constructor */
    constructor(sources)
    {
        super();

        // Properties
        this.sources = sources;

        /**
         * Setup
         */
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders()
    {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new TextureLoader();
        this.loaders.cubeTextureLoader = new CubeTextureLoader();
        this.loaders.rgbeTextureLoader = new RGBELoader();
    }

    startLoading()
    {
        // Loop each sources
        for (const source of this.sources) {
            this._loadSource(source);
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file;
        this.loaded++;

        if (this.loaded === this.toLoad) {
            this.trigger('ready');
        }
    }

    _loadSource(source)
    {
        switch(source.type) {
            case "gltfModel":
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                );
                break;
            case "texture":
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        file.colorSpace = SRGBColorSpace;
                        file.anisotropy = 8;
                        this.sourceLoaded(source, file);
                    }
                );
                break;
            case "cubeTexture":
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                );
                break;
            case "background":
                this.loaders.rgbeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                )
        }
    }
}
