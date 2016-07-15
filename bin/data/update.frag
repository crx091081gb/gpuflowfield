#version 120
#extension GL_ARB_texture_rectangle : enable

// ping pong inputs
uniform sampler2DRect particles0;
uniform sampler2DRect particles1;
uniform sampler2DRect flowField;

uniform vec3 mouse;
uniform float mouseAttraction;
uniform float radiusSquared;
uniform float elapsed;
uniform float gravity;
uniform float damping;
uniform vec3 attractor1pos;
uniform vec3 attractor1force;
uniform vec3 attractor2pos;
uniform vec3 attractor2force;
uniform vec3 attractor3pos;
uniform vec3 attractor3force;
uniform vec3 attractor4pos;
uniform vec3 attractor4force;





void main()
{
    vec3 pos = texture2DRect(particles0, gl_TexCoord[0].st).xyz;
    vec3 vel = texture2DRect(particles1, gl_TexCoord[0].st).xyz;
    
    // mouse attraction
    vec3 direction = mouse - pos.xyz;
    float distSquared = dot(direction, direction);
    float magnitude = mouseAttraction * (1.0 - distSquared / radiusSquared);
    vec3 force = step(distSquared, radiusSquared) * magnitude * normalize(direction);
    
    //vector point 1
    vec3 dist = attractor1pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor1force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor1force);
    
    //vector point 2
    dist = attractor2pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor2force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor2force);
    
    //vector point 3
    dist = attractor3pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor3force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor3force);
    
    //vector point 4
    dist = attractor4pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor4force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor4force);
    
    // gravity
    force += vec3(0.0, gravity, 0.0);
    
    // accelerate
    vel += elapsed * force;
    
    // bounce off the sides
    vel.x *= step(abs(pos.x), 512.0) * 2.0 - 1.0;
    vel.y *= step(abs(pos.y), 384.0) * 2.0 - 1.0;
    
    // damping
    vel *= 0.995;
    
    // move
    pos += elapsed * vel;
    
    gl_FragData[0] = vec4(pos, 1.0);
    gl_FragData[1] = vec4(vel, 0.0);
}