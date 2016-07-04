#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup()
{
    ofBackground(0);
    ofSetFrameRate(60);
    
    //gui
    gui.setup();
    gui.add(gravity.set("gravity", -0.5, -10, 10));
    gui.add(mouseAttraction.set("mouse attraction", 500, -1000, 1000));
    gui.add(radius.set("radius", 200, 0, 1000));
    gui.add(attractor1angle.set("angle 1", 0, 0, 360));
    gui.add(attraction1.set("attraction 1", 500, -1000, 1000));
    // 1,000,000 particles
    unsigned w = 1000;
    unsigned h = 1000;
    
    particles.init(w, h);
    
    // initial positions
    // use new to allocate 4,000,000 floats on the heap rather than
    // the stack
    float* particlePosns = new float[w * h * 4];
    for (unsigned y = 0; y < h; ++y)
    {
        for (unsigned x = 0; x < w; ++x)
        {
            unsigned idx = y * w + x;
            particlePosns[idx * 4] = 400.f * x / (float)w - 200.f; // particle x
            particlePosns[idx * 4 + 1] = 400.f * y / (float)h - 200.f; // particle y
            particlePosns[idx * 4 + 2] = 0.f; // particle z
            particlePosns[idx * 4 + 3] = 0.f; // dummy
        }
    }
    particles.loadDataTexture(ofxGpuParticles::POSITION, particlePosns);
    delete[] particlePosns;
    
    // initial velocities
    particles.zeroDataTexture(ofxGpuParticles::VELOCITY);
    
    // listen for update event to set additonal update uniforms
    ofAddListener(particles.updateEvent, this, &ofApp::onParticlesUpdate);
    
    //display open gl settings
    cout << "Vendor :" << glGetString(GL_VENDOR) << endl;
    cout << "GPU : "<< glGetString(GL_RENDERER) << endl;
    cout << "OpenGL ver. " << glGetString(GL_VERSION) << endl;
    cout << "GLSL ver. " << glGetString(GL_SHADING_LANGUAGE_VERSION) << endl;
    cout << glGetString(GL_EXTENSIONS) <<endl;
    
    
}

//--------------------------------------------------------------
void ofApp::update()
{
    ofSetWindowTitle(ofToString(ofGetFrameRate(), 2));
    particles.update();
}

// set any update uniforms in this function
void ofApp::onParticlesUpdate(ofShader& shader)
{
    ofVec3f mouse(ofGetMouseX() - .5f * ofGetWidth(), .5f * ofGetHeight() - ofGetMouseY() , 0.f);
    shader.setUniform3fv("mouse", mouse.getPtr());
    shader.setUniform1f("elapsed", ofGetLastFrameTime());
    shader.setUniform1f("radiusSquared", radius * radius);
    shader.setUniform1f("gravity", gravity);
    shader.setUniform1f("mouseAttraction", mouseAttraction);
    ofVec3f attractor1(0.25 * ofGetWidth(), 0.25 * ofGetHeight(), 0.f);
    shader.setUniform3fv("attractor1", attractor1.getPtr());
    shader.setUniform1f("attraction1", attraction1);
    ofVec3f attraction1v(cos(attractor1angle*DEG_TO_RAD), sin(attractor1angle*DEG_TO_RAD), 0);
    shader.setUniform3fv("attractor1angle", attraction1v.getPtr());
}

//--------------------------------------------------------------
void ofApp::draw()
{
    cam.begin();
    ofEnableBlendMode(OF_BLENDMODE_ADD);
    particles.draw();
    ofDisableBlendMode();
    cam.end();
    //draw gui
    gui.draw();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}