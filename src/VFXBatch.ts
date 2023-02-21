
import {ParticleSystem} from './ParticleSystem';
import {
    Blending,
    Mesh,
    ShaderMaterial,
    Texture,
    BufferGeometry, Material,
} from 'three';


export interface VFXBatchSettings {
    // 5 component x,y,z,u,v
    instancingGeometry: BufferGeometry;
    material: Material;
    uTileCount: number;
    vTileCount: number;
    renderMode : RenderMode;
    renderOrder : number;
}

export enum RenderMode {
    BillBoard = 0,
    StretchedBillBoard = 1,
    Mesh = 2,
    Trail = 3,
}

export abstract class VFXBatch extends Mesh {
    type: string = "VFXBatch";
    systems: Set<ParticleSystem>;
    material!: ShaderMaterial;

    settings: VFXBatchSettings;
    protected maxParticles;

    protected constructor(settings: VFXBatchSettings) {
        super();
        this.maxParticles = 1000;
        this.systems = new Set<ParticleSystem>();
        this.settings = {
            instancingGeometry: settings.instancingGeometry,
            renderMode: settings.renderMode,
            renderOrder: settings.renderOrder,
            material: settings.material,
            uTileCount: settings.uTileCount,
            vTileCount: settings.vTileCount,
        };
        this.frustumCulled = false;
        this.renderOrder = this.settings.renderOrder;
    }

    addSystem(system: ParticleSystem) {
        this.systems.add(system);
    }

    removeSystem(system: ParticleSystem) {
        this.systems.delete(system);
    }

    abstract setupBuffers(): void;
    abstract expandBuffers(target: number): void;
    abstract rebuildMaterial(): void;
    abstract update(): void;
    abstract dispose(): void;

    /*
    clone() {
        let system = this.system.clone();
        return system.emitter as any;
    }*/
}