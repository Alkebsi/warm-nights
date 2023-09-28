// uniform sampler2D texture1;
uniform sampler2D textures;

varying vec2 vUv;
varying vec3 vColor;

void main() {
  float contrast = 1.5;
  float brightness = 0.1;
  vec2 optimizedUv = vec2(
    vUv.x + 0.34,
    vUv.y
  );
  vec3 color = texture2D(textures, optimizedUv).rgb * contrast;
  gl_FragColor.rgb = color;
  gl_FragColor.a = 1.;
}
