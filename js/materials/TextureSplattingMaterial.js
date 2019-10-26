class TextureSplattingMaterial extends THREE.ShaderMaterial {
    /**
     * Contructor for TextureSplattingMaterial.
     *
     * @param {Array<Texture>} textures
     * @param {Array<Texture>} splatMaps For blending between the textures. One less than textures.
     */
    constructor({
                    color = 0xffffff,
                    emissive = 0x000000,
                    specular = 0x111111,
                    shininess = 30,
                    textures = null,
                    splatMaps = null,
                    map = null
                }) {

        const uniforms = THREE.UniformsUtils.merge([
            // pass in the defaults from uniforms lib.
            THREE.UniformsLib.common,
            THREE.UniformsLib.specularmap,
            THREE.UniformsLib.envmap,
            THREE.UniformsLib.aomap,
            THREE.UniformsLib.lightmap,
            THREE.UniformsLib.emissivemap,
            THREE.UniformsLib.bumpmap,
            THREE.UniformsLib.normalmap,
            THREE.UniformsLib.displacementmap,
            THREE.UniformsLib.gradientmap,
            THREE.UniformsLib.fog,
            THREE.UniformsLib.lights,
            {
                diffuse: {value: new THREE.Color(color)},
                emissive: {value: new THREE.Color(emissive)},
                specular: {value: new THREE.Color(specular)},
                shininess: {value: shininess}
            }
        ]);

        const defines = {};

        if (map !== null) {
            uniforms.map = {
                type: "t",
                value: map
            };

            defines.USE_MAP = '';
        }

        if (textures !== null && splatMaps !== null) {

            uniforms.textures = {
                type: "tv",
                value: textures
            };

            uniforms.splatMaps = {
                type: "tv",
                value: splatMaps
            }

            uniforms.textureUvTransforms = {
                type: "Matrix3fv",
                value: textures.map((texture) => {

                    texture.matrix.setUvTransform(
                        texture.offset.x,
                        texture.offset.y,
                        texture.repeat.x,
                        texture.repeat.y,
                        texture.rotation,
                        texture.center.x,
                        texture.center.y
                    );

                    return texture.matrix;
                })
            }

            defines.USE_SPLATMAP = '';

        }

        // antallet teksturer som skal legges på terrenget.
        const length = (textures !== null) ? textures.length : 0;


        /** START Custom shader code: */

        const uv_pars_vertex_custom = `
#if defined( USE_SPLATMAP ) || defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )
    varying vec2 vUv;
    uniform mat3 uvTransform;
#endif
// custom:
#ifdef USE_SPLATMAP
    uniform mat3 textureUvTransforms[${length}]; // repeat vector for each texture.
    varying vec2 textureUVs[${length}]; // pass to fragment shader.
#endif
        `;

        const uv_vertex_custom = `
#if defined( USE_SPLATMAP ) || defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )
    vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif
// custom:
#ifdef USE_SPLATMAP
    for (int i = 0; i < ${length}; i++) {
        textureUVs[i] = (textureUvTransforms[i] * vec3(uv, 1)).xy;
    }
#endif
        `;

        const uv_pars_fragment_custom = `// added splatmap as condition to declare vUv
        #if defined( USE_SPLATMAP ) || defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )
            varying vec2 vUv;
        #endif
        
        #ifdef USE_SPLATMAP
            uniform sampler2D textures[${length}];
            uniform sampler2D splatMaps[${length - 1}]; // one less splatmap than textures.
            varying vec2 textureUVs[${length}]; // computed in vertexshader
        #endif
                `;

        const splatmap_code = `
#ifdef USE_SPLATMAP
    float splatSum = 0.0;

    for (int i = 0; i < ${length - 1}; i++) {
        splatSum += texture2D(splatMaps[i], vUv).r;
    }

    vec4 accumulated = texture2D(textures[0], textureUVs[0]).rgba * (1.0 - splatSum);

    for (int i = 1; i < ${length}; i++) {
        vec4 texel = texture2D(textures[i], textureUVs[i]);
        vec4 splatTexel = texture2D(splatMaps[i - 1], vUv);

        accumulated = mix(accumulated, texel, splatTexel.r);
    }

    //accumulated = mapTexelToLinear(accumulated);
    diffuseColor *= accumulated;
#endif
        `;

        /** END*/

            // generate customised shaders. i. e. replace or append code to an existing shader program.

        const vertexShader = ShaderCustomiser.customise(THREE.ShaderLib.phong.vertexShader, {
                uv_pars_vertex: uv_pars_vertex_custom,
                uv_vertex: uv_vertex_custom
            });

        const fragmentShader = ShaderCustomiser.customise(THREE.ShaderLib.phong.fragmentShader, {
            uv_pars_fragment: uv_pars_fragment_custom,
            logdepthbuf_fragment: {
                text: splatmap_code,
                prepend: true
            }
        });

        super({
            vertexShader,
            fragmentShader,
            uniforms,
            defines,
            fog: true, // enable fog for this material
            lights: true // enable lights for this material
        });
    }
}

