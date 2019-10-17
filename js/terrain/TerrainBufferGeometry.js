/**
 * Terrain geometry based on PlaneBufferGeometry.
 * oskarbraten
 */

import Utilities from '../lib/Utilities.js';
import {PlaneBufferGeometry, Vector3} from '../lib/three.module.js';

export default class TerrainBufferGeometry extends PlaneBufferGeometry {

    constructor({heightmapImage, width = 100, numberOfSubdivisions = 128, height = 20}) {

        super(width, width, numberOfSubdivisions, numberOfSubdivisions);

        this.rotateX(-Math.PI / 2);

        this.numberOfSubdivisions = numberOfSubdivisions;

        this.width = width;
        this.height = height;

        // get heightmap data
        this.heightmap = Utilities.getHeightmapData(heightmapImage, this.numberOfSubdivisions + 1);

        // assign Y-values
        let v = 0;
        for (let i = 0; i < this.heightmap.length; i++) {
            this.attributes.position.array[v + 1] = this.heightmap[i] * this.height;
            v += 3;
        }

        // move such that the center is in the corner and not in origo.
        //this.translate(this.width / 2, 0, this.width / 2);

        // recompute normals.
        this.computeVertexNormals();
    }

    /**
     * [getHeightAt description]
     * @param  {[type]} position [description]
     * @return {[type]}          [description]
     */
    getHeightAtCirca(position) {

        position.x += (this.width / 2);
        position.z += (this.width / 2);

        if (0 > position.x || position.x > this.width || 0 > position.z || position.z > this.width) {
            return 0;
        }

        let v = this.numberOfSubdivisions;

        let factor = v / this.width;

        let x_max = Math.ceil(position.x * factor);
        let x_min = Math.floor(position.x * factor);

        let z_max = Math.ceil(position.z * factor);
        let z_min = Math.floor(position.z * factor);

        let h0 = this.heightmap[(z_max * (v + 1)) + x_max] * this.height;
        let h1 = this.heightmap[(z_max * (v + 1)) + x_min] * this.height;
        let h2 = this.heightmap[(z_min * (v + 1)) + x_max] * this.height;
        let h3 = this.heightmap[(z_min * (v + 1)) + x_min] * this.height;

        return Math.min(h0, h1, h2, h3);
    }

    getHeightAtPrecise(position) {

        let p = new Vector3(position.x, 0, position.z);
        //Grunnen til at vi plusser på halvparten er fordi meshen blir plassert i verden sentrert,
        // men mappen går fra 0 og oppover.
        p.x += (this.width / 2);
        p.z += (this.width / 2);

        if (!this.isWithin(p))
            return 0;

        // Grunnen til at vi ganger med factor er fordi avstanden mellom subdivisions "trekanter"
        // er mindre enn in game bredde av mesh.
        let v = this.numberOfSubdivisions;
        let factor = v / this.width;

        let x_precise = p.x * factor;
        let x_max = Math.ceil(x_precise);
        let x_min = Math.floor(x_precise);

        let z_precise = p.z * factor;
        let z_max = Math.ceil(z_precise);
        let z_min = Math.floor(z_precise);

        //Henter ut to trekanter (h0, h1, h2) & (h1, h2, h3)

        let h0 = this.heightmap[(z_max * (v + 1)) + x_max] * this.height;
        let h1 = this.heightmap[(z_max * (v + 1)) + x_min] * this.height;
        let h2 = this.heightmap[(z_min * (v + 1)) + x_max] * this.height;
        let h3 = this.heightmap[(z_min * (v + 1)) + x_min] * this.height;


        let height = 0;
        // Bestem hvilken trekant p.x og p.z står i.
        if (x_precise >= x_max - 0.5 && z_precise >= z_max - 0.5) {
            // (h0, h1, h2)
            let p1 = new Vector3(x_max, h0, z_max);
            let p2 = new Vector3(x_min, h1, z_max);
            let p3 = new Vector3(x_max, h2, z_min);

            height = this.calcY(p1, p2, p3, x_precise, z_precise);
        } else {
            // (h1, h2, h3)
            let p1 = new Vector3(x_min, h1, z_max);
            let p2 = new Vector3(x_max, h2, z_min);
            let p3 = new Vector3(x_min, h3, z_min);

            height = this.calcY(p1, p2, p3, x_precise, z_precise);
        }

        return height;
    }

    isWithin(p) {
        return !(0 > p.x || p.x > this.width || 0 > p.z || p.z > this.width)
    }


    calcY(p1, p2, p3, x, z) {

        let det = (p2.z - p3.z) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.z - p3.z);


        let l1 = ((p2.z - p3.z) * (x - p3.x) + (p3.x - p2.x) * (z - p3.z)) / det;

        let l2 = ((p3.z - p1.z) * (x - p3.x) + (p1.x - p3.x) * (z - p3.z)) / det;

        let l3 = 1.0 - l1 - l2;


        return l1 * p1.y + l2 * p2.y + l3 * p3.y;

    }
}