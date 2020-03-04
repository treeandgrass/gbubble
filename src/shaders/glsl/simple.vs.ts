export const simpleVsSource = `
    attribute vec3 vertex;
    attribute vec3 color;
    uniform mat4 modelMatrix;
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    varying lowp vec4 vColor;
    void main() {
        vColor = vec4(color, 1.0);
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertex, 1.0);
    }
`;
