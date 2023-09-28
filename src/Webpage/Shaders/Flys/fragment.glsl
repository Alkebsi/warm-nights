void main() {
  float strength = 0.15 / distance(gl_PointCoord, vec2(0.5)) - 0.35;

  gl_FragColor = vec4(1.0, 1.0, 0.5, strength);
}