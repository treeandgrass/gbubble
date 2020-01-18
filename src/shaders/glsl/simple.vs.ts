export const simpleVsSource = `
    attribute vec4 vertex;
    uniform mat4 modelMatrix;
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    void main() {
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vertex;
    }
`;
