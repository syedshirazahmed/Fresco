		var fileContents;
function startRead()
{
  // obtain input element through DOM 
  
  var file = document.getElementById('file').files[0];
  if(file)
	{
    getAsText(file);
  }
}

function getAsText(readFile)
{
	var reader;
	try
	{
    reader = new FileReader();
	}catch(e)
	{
		alert("Error: seems File API is not supported on your browser");
	  return;
  }
  
  // Read file into memory as UTF-8      
  reader.readAsText(readFile, "UTF-8");
  
  // Handle progress, success, and errors
  reader.onprogress = updateProgress;
  reader.onload = loaded;
  reader.onerror = errorHandler;
}

function updateProgress(evt)
{
  if (evt.lengthComputable)
	{
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total);
    if (loaded < 1)
		{
      // Increase the prog bar length
      // style.width = (loaded * 200) + "px";
    }
  }
}

function loaded(evt)
{
  // Obtain the read file data    
  var fileString = evt.target.result;
  fileContents = fileString;
  alert("File loaded in Memory Successfully");
}

function errorHandler(evt)
{
  if(evt.target.error.code == evt.target.error.NOT_READABLE_ERR)
	{
    // The file could not be read
		alert("Error reading file...");
  }
}

function getTheAnswer()
{
try {
	//var ques = document.getElementsByClassName("question");
	var textInQues = document.getElementsByTagName("p")[0];
	var isFound = fileContents.search(textInQues.innerHTML.substring(0,26));
	if(isFound == -1)
	{
		alert("Sorry! This question is not available in the document.");
	}
	else
	{
		alert(fileContents.substring(isFound, isFound + 200));
	}
		}
	catch(e)
	{
		alert("Somthing went wrong");
	}
}

function uploadDumpsTxtFile()
{
	var x = document.createElement("INPUT");
	x.setAttribute("id", "file");
	x.setAttribute("type", "file");
	x.setAttribute("onchange", "startRead()");
	x.setAttribute("hidden" ,"true");
	document.body.appendChild(x);
	x.click();
}
