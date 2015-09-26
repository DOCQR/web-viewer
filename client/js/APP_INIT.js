//The MIT License (MIT)
//
//Copyright (c) 2015 Thornton Tomasetti, Inc.
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.



//contains the jquery document.ready callback, which starts the application

//a global variable to store our running Spectacles App
var mySpectacles;

//fires when everything has loaded
$(document).ready(function(){

    //load our sample JSON file from disk
    var sampleJson = "https://dl.dropboxusercontent.com/s/5biy6lv70k8s964/rac_basic_sample_project_LVL2.json";
    //"./sampleModels/rst_basic_sample_project.json"
    $.getJSON(sampleJson, function (data) {

        //once loaded, initialize a Spectacles viewer by passing in the div to bind to, the json data, and a callback function
        //where we can enable application functionality in nice clean chunks
        mySpectacles = new SPECTACLES($("#Spectacles_output"), data, function(app){

            //call the UI / functionality modules
            app.userInterface();
            //app.openLocalFiles();
            app.sceneUI();
            //app.lightingUI();
            //app.viewAndSelectionUI();
            //app.viewsUI();
            app.layersUI();
        });
    });
});