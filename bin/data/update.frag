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
uniform vec3 attractor5pos;
uniform vec3 attractor5force;
uniform vec3 attractor6pos;
uniform vec3 attractor6force;
uniform vec3 attractor7pos;
uniform vec3 attractor7force;
uniform vec3 attractor8pos;
uniform vec3 attractor8force;
uniform vec3 attractor9pos;
uniform vec3 attractor9force;
uniform vec3 attractor10pos;
uniform vec3 attractor10force;
uniform vec3 attractor11pos;
uniform vec3 attractor11force;
uniform vec3 attractor12pos;
uniform vec3 attractor12force;
uniform vec3 attractor13pos;
uniform vec3 attractor13force;
uniform vec3 attractor14pos;
uniform vec3 attractor14force;
uniform vec3 attractor15pos;
uniform vec3 attractor15force;
uniform vec3 attractor16pos;
uniform vec3 attractor16force;

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
    
    //vector point 5
    dist = attractor5pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor5force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor5force);
    
    //vector point 6
    dist = attractor6pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor6force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor6force);
    
    //vector point 7
    dist = attractor7pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor7force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor7force);
    
    //vector point 8
    dist = attractor8pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor8force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor8force);
    
    //vector point 9
    dist = attractor9pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor9force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor9force);
    
    //vector point 10
    dist = attractor10pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor10force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor10force);
    
    //vector point 11
    dist = attractor11pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor11force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor11force);
    
    //vector point 12
    dist = attractor12pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor12force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor12force);
    
    //vector point 13
    dist = attractor13pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor13force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor13force);
    
    //vector point 14
    dist = attractor14pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor14force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor14force);
    
    //vector point 15
    dist = attractor15pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor15force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor15force);
    
    //vector point 16
    dist = attractor16pos - pos.xyz;
    distSquared = dot(dist, dist);
    magnitude = length(attractor16force) * (1.0 - distSquared / radiusSquared);
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor16force);
    

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