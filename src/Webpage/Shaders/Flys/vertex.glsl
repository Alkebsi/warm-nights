uniform float uPixelRatio;
uniform float uSize;
uniform vec2 uMouse;
uniform float uTime;

attribute float aScale;

void main() {
  vec3 newPosition = position;

  // Setting the flys random animations
  // Used aScale since it has a random value, instead of creating a new attribute
  newPosition.x += sin(uTime + aScale * 100.0) * 0.8;
  newPosition.y += sin(uTime * (aScale + newPosition.x * 0.02)) * 0.8;
  newPosition.z += cos(uTime + aScale * 90.0) * 0.8;

  // Finall settings
  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * aScale * uPixelRatio;
  gl_PointSize *= (0.5 / -mvPosition.z);
}