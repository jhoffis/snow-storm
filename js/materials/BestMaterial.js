class BestMaterial extends THREE.ShaderMaterial {
    constructor() {
        super();

        const vertexShader = `
        #version 300 es
        
        out vec2 vUv;                                                           // Export texture coordinates so we get them in the fragment shader.
		void main() {
            vUv = uv;                                                                       // Threejs gives us the texture coordinates in the 'uv' variable, so set that to our vUv variable. 
			gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);         // Translate position to screen coordinates and set the gl_Position
		}
	`;

        const fragmentShader = `
        #version 300 es

		precision mediump float;
        uniform vec3 color1;
        uniform vec3 color2;                                                               // Uniform controlling the colorMask
        
        in vec2 vUv;                                                                  // Receive the texture coordinates from our vertex shader
        out vec4 fColor;

		void main() {
            // vec4 textureColor = texture2D(texture, vUv);                                   // Sample the texture using the coordinates      
			// gl_FragColor = vec4(color1, 1.0);                        // Set the fragment color, applying the colorMask to the texture color.
            // fColor = vec4(color1, 1.0);
            fColor = vec4(mix(color1, color2, 0.5), 1.0);
		}

	`;

        //Hvor ligger bumpmapping og sånt med terrain.
        //Mippmapping
        //how to do peer-to-peer
        // three musts in threejs: renderer, camera, scene
        // Normal vektor har w som 0.
        // Quaternion øvvv.
        // supersamplimg

        this.uniforms = {
            color1: {
                type: 'c',
                value: new THREE.Color('#22AAFF'),
            },
            color2: {
                type: 'c',
                value: new THREE.Color('#FF0000'),
            },
        }
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;

    }

    changeColor1(r,g,b) {
        this.uniforms.color1.value = new THREE.Vector3(r,g,b);
    }

    randomColor() {
        this.changeColor1(Math.random(), Math.random(), Math.random())
    }
}