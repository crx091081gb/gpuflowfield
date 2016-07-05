#version 120
#extension GL_ARB_texture_rectangle : enable

// ping pong inputs
uniform sampler2DRect particles0;
uniform sampler2DRect particles1;

uniform vec3 mouse;
uniform float mouseAttraction;
uniform float radiusSquared;
uniform float elapsed;
uniform float gravity;
uniform vec3 attractor1pos;
uniform vec3 attractor1force;



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
    //direction = vec3(cos(attractor1angle), sin(attractor1angle), 0.0);
    //direction = attractor1angle;
    //direction = vec3(1.0, 1.0, 0.0);
    distSquared = dot(dist, dist);
    magnitude = length(attractor1force) * (1.0 - distSquared / radiusSquared);
    
    force += step(distSquared, radiusSquared) * magnitude * normalize(attractor1force);
    
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