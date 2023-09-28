varying vec2 vUv;

varying vec3 vColor;
uniform float uTime;
uniform vec3 uBallPos;

void main() {
  vUv = uv;
  vColor = color;
  vec3 cpos = position;

  float waveSize = 20.0f;
  float tipDistance = 0.2f;
  float centerDistance = 0.1f;

  if (color.x > 0.6f) {
    cpos.x += sin((uTime * 1.5) + (uv.x * waveSize)) * tipDistance;
  }else if (color.x > 0.0f) {
    cpos.x += sin((uTime * 1.5) + (uv.x * waveSize)) * centerDistance;
  }

  float diff = position.x - cpos.x;
  
  vec4 worldPosition = vec4(cpos, 1.);
  vec4 mvPosition = modelViewMatrix * vec4(cpos, 1.0);

  // Setting the ball effect
  float strength = 
    (0.003 / 
    distance(uv, vec2(0.37 - uBallPos.z * 0.033, 0.5 - uBallPos.x * 0.033)) -
    0.8) * 1.65;
  strength -= uBallPos.y - 0.5;
  strength = - strength;
  if(strength > 1.0) {
    strength = 1.0;
  }
  if (strength < 0.0) {
    strength = 0.0;
  }
  strength /= 2.0;
  mvPosition += strength - 0.5;
  
  gl_Position = projectionMatrix * mvPosition;
}