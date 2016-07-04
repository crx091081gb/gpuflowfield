#pragma once

#include "ofMain.h"
#include "ofxGpuParticles.h"
#include "ofxGui.h"

class ofApp : public ofBaseApp
{
public:
    ofxPanel gui;
    ofTexture flowField;
    ofParameter<float> gravity;
    ofParameter<float> mouseAttraction;
    ofParameter<float> radius;
    ofParameter<float> attractor1angle;
    ofParameter<float> attraction1;
    
    void setup();
    void update();
    void draw();

    void keyPressed  (int key);
    void keyReleased(int key);
    void mouseMoved(int x, int y );
    void mouseDragged(int x, int y, int button);
    void mousePressed(int x, int y, int button);
    void mouseReleased(int x, int y, int button);
    void windowResized(int w, int h);
    void dragEvent(ofDragInfo dragInfo);
    void gotMessage(ofMessage msg);
    
private:
    // set any update uniforms in this function
    void onParticlesUpdate(ofShader& shader);
    
    ofxGpuParticles particles;
    ofEasyCam cam;
};
