/*

Online Python Tutor
https://github.com/pgbovine/OnlinePythonTutor/

Copyright (C) 2010-2014 Philip J. Guo (philip@pgbovine.net)

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/


// simplified version of opt-frontend.js for ../composingprograms.html


// Pre-reqs:
// - pytutor.js
// - jquery.ba-bbq.min.js
// - jquery.ba-dotimeout.min.js // for event debouncing: http://benalman.com/code/projects/jquery-dotimeout/examples/debouncing/
// - opt-frontend-common.js
// - js/togetherjs/togetherjs-min.js
// should all be imported BEFORE this file


var originFrontendJsFile = 'composingprograms.js';

function TogetherjsReadyHandler() {
  populateTogetherJsShareUrl();
  $("#togetherjsStatus").append(informedConsentText);
}

function TogetherjsCloseHandler() {
  // NOP
}


function executeCode(forceStartingInstr, forceRawInputLst) {
    if (forceRawInputLst !== undefined) {
        rawInputLst = forceRawInputLst; // UGLY global across modules, FIXME
    }

    backend_script = python3_backend_script; // Python 3

    var backendOptionsObj = {cumulative_mode: ($('#cumulativeModeSelector').val() == 'true'),
                             heap_primitives: false,
                             show_only_outputs: false,
                             py_crazy_mode: false,
                             origin: originFrontendJsFile};

    var startingInstruction = forceStartingInstr ? forceStartingInstr : 0;

    var frontendOptionsObj = {startingInstruction: startingInstruction,
                              executeCodeWithRawInputFunc: executeCodeWithRawInput,
                              updateOutputCallback: function() {$('#urlOutput,#embedCodeOutput').val('');},
                              compactFuncLabels: true,
                             }

    executePythonCode(pyInputCodeMirror.getValue(),
                      backend_script, backendOptionsObj,
                      frontendOptionsObj,
                      'pyOutputPane',
                      enterDisplayMode, handleUncaughtExceptionFunc);
}

$(document).ready(function() {

  genericOptFrontendReady(); // initialize at the very end
});


// for Google+ Web signin:
// https://developers.google.com/+/web/signin/add-button

function signinCallback(authResult) {
  if (authResult) {
    if (authResult['error'] == undefined){

      // This sample assumes a client object has been created.
      // To learn more about creating a client, check out the starter:
      //  https://developers.google.com/+/quickstart/javascript
      gapi.client.load('plus','v1', function(){
       var request = gapi.client.plus.people.get({
         'userId': 'me'
       });
       request.execute(function(resp) {
         alert('Retrieved profile for "' + resp.displayName + '"');
       });
      });

    } else {
      console.log('An error occurred');
    }
  } else {
    console.log('Empty authResult');  // Something went wrong
  }
}
