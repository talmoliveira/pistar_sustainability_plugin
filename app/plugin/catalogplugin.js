//plugin for the catalog
//This file uses the JQuery library as one of it's basis, it should come with the pistar project and no changes are necessary.
//It also uses many of the istar functions, if something isn't working it's likely that the plugin was placed in the wrong location
//To change the location of the plugin the index.html file MUST be updated, currently it is assuming that the plugin is contained inside the path: app/plugin relative to the index.html file's current location

catalogPlugin = {
  countActors: function () {
    //the actual function that display the number of actors in the current model
    elements = istar.getElements();
    actors = _.filter(elements, function (element) { return element.isKindOfActor(); });
    alert('Number of actors (including agents and roles): ' + actors.length);
  }
}
var checkedCheckboxes = [];

//puts the istar object in the console
// console.log(istar);
istar;

//This saves the dimensions in a key,value pair where the key is the name of the dimension and the value is an array of IDs of the somerville classification, it is used
//to sort qualities later; 
var singleDimensionIds = {};
//Same as the above but for all the multi-dimension situations
var multiDimensionIds = {};

$(document).ready(function () {

  //initializes the necessary keys of the dimension ID variables, this makes any access faster since we're looking at sets of data instead of data as a whole
  initDimensionIdLists();

  $("#modals").append(`<div class="modal fade" id="modal-catalog" tabindex="-1" role="dialog" aria-labelledby="label-catalog-modal">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="label-examples-modal">Sustainability catalog plugin</h4>
            </div>
            <div class="modal-body">
                <em>You may choose any of the requirements below, the tool will create what you ask based on the requirements chosen.<br>
                You may toggle collapsing/expanding any part of the catalog through holding left shift and clicking on any of the qualities of the catalog.<br>
                If you want to reset the collapsing/expanding of the catalog simply hold left shift and click on the "sustainability" quality twice.
                You can see the definition of each sustainability requirement in it's tooltip by hovering over its name or its checkbox <br>
                Note that generating the catalog will overwrite the current diagram, be careful not to lose any of your work.
                </em><br><br>
                <!-- Tab navigation -->
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="technical-tab" data-toggle="tab" href="#technical" role="tab" aria-controls="technical" aria-selected="true">Technical dimension</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="social-tab" data-toggle="tab" href="#social" role="tab" aria-controls="social" aria-selected="false">Social dimension</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="environmental-tab" data-toggle="tab" href="#environmental" role="tab" aria-controls="environmental" aria-selected="false">Environmental dimension</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="individual-tab" data-toggle="tab" href="#individual" role="tab" aria-controls="individual" aria-selected="false">Individual dimension</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="economic-tab" data-toggle="tab" href="#economic" role="tab" aria-controls="economic" aria-selected="false">Economic dimension</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="multi-tab" data-toggle="tab" href="#multi" role="tab" aria-controls="multi" aria-selected="false">Multi dimension</a>
                    </li>
                </ul>
                
                <!-- Tab content -->
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="technical" role="tabpanel" aria-labelledby="technical-tab">
                        
                    </div>
                    <div class="tab-pane fade" id="social" role="tabpanel" aria-labelledby="social-tab">
                       
                    </div>
                    <div class="tab-pane fade" id="environmental" role="tabpanel" aria-labelledby="environmental-tab">
                       
                    </div>
                    <div class="tab-pane fade" id="individual" role="tabpanel" aria-labelledby="individual-tab">
                        
                        
                    </div>
                    <div class="tab-pane fade" id="economic" role="tabpanel" aria-labelledby="economic-tab">
                        
                    </div>
                    <div class="tab-pane fade" id="multi" role="tabpanel" aria-labelledby="multi-tab">
                        
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="list-of-refinements" >List of Refinements</button>
                <button type="button" class="btn btn-primary" id="view-relationships" >View Relationships</button>
                <button type="button" class="btn btn-primary" id="view-relationships-by-dim" >View Relationships by dimension</button>
                <button type="button" class="btn btn-primary" id="generate-diagram">Generate Diagram</button>
                <button type="button" class="btn" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>`);

  $("#modals").append(`<div class="modal fade" id="modal-relationships" tabindex="-1" role="dialog" aria-labelledby="label-catalog-modal">
    <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="label-examples-modal">Sustainability relationships</h4>
            </div>
            <div class="modal-body">
                <div id="make-links">
                  <h5 class="modal-title" id="label-examples-modal">Make relationships</h5>
                  <div class="relationship-container">
                  </div>
                </div>

                <div id="help-links">
                  <h5 class="modal-title" id="label-examples-modal">Help relationships</h5>
                  <div class="relationship-container">

                  </div>
                </div>

                <div id="hurt-links">
                  <h5 class="modal-title" id="label-examples-modal">Hurt relationships</h5>
                  <div class="relationship-container">

                  </div>
                  
                </div>

                <div id="break-links">
                <h5 class="modal-title" id="label-examples-modal">Break relationships</h5>
                <div class="relationship-container">

                  </div>
                
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>`);

    $("#modals").append(`<div class="modal fade" id="modal-refinements" tabindex="-1" role="dialog" aria-labelledby="label-catalog-modal">
      <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                          aria-hidden="true">×</span></button>
                  <h4 class="modal-title" id="label-examples-modal">List of refinements</h4>
              </div>
              <div class="modal-body">
                  <div id="refinements-list">
                    <h5 class="modal-title" id="label-examples-modal">Refinements</h5>
                    <div class="refinements-container">

                    </div>
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn" data-dismiss="modal">Close</button>
              </div>
          </div>
      </div>`);

  $("#modals").append(`<div class="modal fade" id="modal-relationships-by-dim" tabindex="-1" role="dialog" aria-labelledby="label-catalog-modal">
    <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="label-relationships-dim-modal">Sustainability relationships</h4>
            </div>
            <div class="modal-body">
                <div id="social-links">
                  <h4 class="modal-title" id="label-examples-modal">Social dimension</h5>
                  <div class="relationship-container">

                  </div>

                </div>

                <div id="technical-links">
                  <h4 class="modal-title" id="label-examples-modal">Technical dimension</h5>
                  <div class="relationship-container">

                  </div>
                </div>

                <div id="individual-links">
                  <h4 class="modal-title" id="label-examples-modal">Individual Dimension</h5>
                  <div class="relationship-container">

                  </div>
                </div>

                <div id="environmental-links">
                <h4 class="modal-title" id="label-examples-modal">Environmental Dimension</h5>
                <div class="relationship-container">

                  </div>                
                </div>

                <div id="economic-links">
                <h4 class="modal-title" id="label-examples-modal">Economic Dimension</h5>
                <div class="relationship-container">

                  </div>
                
                </div>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>`);

  //Adds the button to access the plugin to the plugins section of the pistar app
  $('#menu-plugin').append(`
            <span class="add-button">
                <button type="button" class="btn btn-default add-button buttonHighlight" data-toggle="modal" data-target="#modal-catalog" id="plugin-sustainability" title="Open sustainability menu">
                <span class="glyphicon glyphicon-leaf" aria-hidden="true" style="font-size: 1.8em"></span>
                    <br>Sustainability
                </button>
            </span>
    `);

  //Populates and sets up the checkboxes for the modal that pops up when the plugin button is clicked

  var catalogRelationships = istar.models.sustainabilityCatalog.links;

  //We need to check which of the qualities are connected to the sommerville nodes, so we go through every relationship in the catalog
  for (var i = 0; i < catalogRelationships.length; i++) {
    var currentTarget = catalogRelationships[i].target;
    var currentSource = catalogRelationships[i].source;
    var found = false;

    //We then check if the target of the relationship is in one of the individual dimensions
    for (var key in singleDimensionIds) {
      var val = singleDimensionIds[key];

      //If it is we can then process it and add a checkbox in the corresponding div of the HTML 
      if (val.includes(currentTarget)) {
        var qualityName = getNodeName(currentSource);
        var targetName = getNodeName(currentTarget);
        var processedName = key;
        processedName = processedName.toLowerCase();
        processedName = processedName.split(" ")[0];
        // console.log(processedName);
        addCheckbox('#' + processedName, qualityName);
        found = true;
        break;
      }
    }
    //If we didn't find the target of the relationship in the individual dimensions we then search the multiple dimension qualities and use the same logic as the individuals
    if (!found) {
      for (var key in multiDimensionIds) {
        var val = multiDimensionIds[key];

        if (val.includes(currentTarget)) {
          var qualityName = getNodeName(currentSource);
          var targetName = getNodeName(currentTarget);
          var processedQuality = qualityName + " ( " + key + " )";

          addCheckbox('#multi', processedQuality);
          found = true;
          break;
        }
      }
    }
  }

  $('[data-toggle="tooltip"]').tooltip();

  // Add event listeners to all checkboxes inside elements with the class .tab-pane
  $('.tab-pane input[type="checkbox"]').change(handleCheckboxChange);



  $("#plugin-sustainability").on('click', function () {

  });

  //This loads the sustainability catalog when the generate diagram button is pressed.
  $('#generate-diagram').on('click', function () {

    //If there are no checkboxes on the plugin's window selected, then we default to showing the complete catalog
    if (checkedCheckboxes.length === 0) {
      // console.log(istar.models.sustainabilityCatalog);
      istar.fileManager.loadModel(istar.models.sustainabilityCatalog);
      istar.models.currentCatalog = istar.models.sustainabilityCatalog;
    } else {
      //If we do have checkboxes selected then we have to process what is selected and create a secondary diagram with just those qualities 

      //When creating the secondary diagram we must ensure that we include the ones relating to the categories and the dimensions

      var oldQualities = istar.models.sustainabilityCatalog.actors[0].nodes;

      var oldRelationships = istar.models.sustainabilityCatalog.links;

      var newRelationships = [];

      var newQualities = [];

      var qualityIds = [];

      //Adding the qualities that we need to the secondary diagram first 
      for (var i = 0; i < oldQualities.length; i++) {
        //The nodes that are mandatory are the ones related with the categorization, so any node that includes "requirements", "dimension" or "Sustainability" will be placed
        //This may need a more robust way of checking as it may lead to problems if the catalog is developed with qualities that includes these particular words
        if (oldQualities[i].text.includes("Dimension") || oldQualities[i].text.includes("requirements") || oldQualities[i].text.includes("Sustainability") || oldQualities[i].text.includes("dimension")) {
          newQualities.push(oldQualities[i]);
          qualityIds.push(oldQualities[i].id);
        } else {
          if (checkedCheckboxes.indexOf(oldQualities[i].text) !== -1) {
            //If it's part of the checked qualities we add it to the diagram
            newQualities.push(oldQualities[i]);
            qualityIds.push(oldQualities[i].id);
          } 
        }
      }

      var changed = true;
      //Once we have the base qualities in place we want to ensure that we have all of their children, this should make it so that the catalog can have any depth and still be populated correctly
      while (changed) {
        changed = false;
        for (var l = 0; l < oldRelationships.length; l++) {
          //We also need to check if it's a subcategory of something that is already checked if it is we add it to the diagram

          var targetQuality = oldRelationships[l].target;
          var targetQualityObj = getQualityById(targetQuality);
          var targetQualityName = targetQualityObj.text;
          var sourceQuality = oldRelationships[l].source;

          if (!targetQualityName.includes("Dimension") && !targetQualityName.includes("requirements") && !targetQualityName.includes("Sustainability") && !targetQualityName.includes("dimension")) {
            if(qualityIds.includes(targetQuality) && !qualityIds.includes(sourceQuality)) {
              // console.log("got");
              newQualities.push(getQualityById(sourceQuality));
              qualityIds.push(sourceQuality);
              changed = true;
            }
            
            
          }
        }
      }



      for (var f = 0; f < oldRelationships.length; f++) {
        if (qualityIds.includes(oldRelationships[f].source) && qualityIds.includes(oldRelationships[f].target)) {
          newRelationships.push(oldRelationships[f]);
        }
      }


      var modifiedModel = JSON.parse(JSON.stringify(istar.models.sustainabilityCatalog));
      modifiedModel.links = newRelationships;
      modifiedModel.actors[0].nodes = newQualities;
      istar.fileManager.loadModel(modifiedModel);
      istar.models.currentCatalog = modifiedModel;

    }
  });
  //This is the code that defines what happens when someone presses the view relationships button,
  //it opens the modal with all of the relationships sorted by type (make, help, break, hurt)
  $('#view-relationships').on('click', function () {
    if (!checkCatalogExists()) {
      alert("You have not generated the catalog yet, you must generate the catalog to view relationships.");
    } else {
      console.log("starting relationship list creation");

      generateRelationshipList(false);

      //ensures that showing the new modal only happens after the hiding process is completed
      hideCatalogModal().then(function () {
        // This code will run after the modal is hidden
        return showRelationshipModal();
      }).then(function () {
        // This code will run after the modal is shown
        console.log('All actions completed');
      }).catch(function (error) {
        // Handle errors if any
        console.error('An error occurred:', error);
      });
    }
  });

  $('#list-of-refinements').on('click', function() {
    if (!checkCatalogExists()) {
      alert("You have not generated the catalog yet, you must generate the catalog to view refinements.");
    } else {
      generateRefinementList();
      
      //ensures that showing the new modal only happens after the hiding process is completed
      hideCatalogModal().then(function () {
        // This code will run after the modal is hidden
        return showRefinementModal();
      }).then(function () {
        // This code will run after the modal is shown
        console.log('All actions completed');
      }).catch(function (error) {
        // Handle errors if any
        console.error('An error occurred:', error);
      });
    }
  
  });


  //This is the code that defines what happens when someone clicks the button "view relationships by dimension"
  //shows what each dimension is affected by and how
  $('#view-relationships-by-dim').on('click', function () {
    if (!checkCatalogExists()) {
      alert("You have not generated the catalog yet, you must generate the catalog to view relationships.");
    } else {
      // console.log("starting relationship list creation");
      generateRelationshipList(true);

      //ensures that showing the new modal only happens after the hiding process is completed
      hideCatalogModal().then(function () {
        // This code will run after the modal is hidden
        return showRelationshipByDimModal();
      }).then(function () {
        // This code will run after the modal is shown
        console.log('All actions completed');
      }).catch(function (error) {
        // Handle errors if any
        console.error('An error occurred:', error);
      });
    }
  });
});




//These two functions serve to ensure that the modal works correctly and that they don't interfere with each other, without promises they will remove an essential class and make the modal unusable
function hideCatalogModal() {
  return new Promise(function (resolve, reject) {
    $('#modal-catalog').on('hidden.bs.modal', function () {
      console.log('Modal is now hidden');
      resolve(); // Resolve the promise when modal is hidden
    });
    $('#modal-catalog').modal('hide');
  });
}

function showRelationshipModal() {
  return new Promise(function (resolve, reject) {
    $('#modal-relationships').on('shown.bs.modal', function () {
      console.log('Modal is now shown');
      resolve(); // Resolve the promise when modal is shown
    });
    $('#modal-relationships').modal('show');
  });
}

function showRelationshipByDimModal() {
  return new Promise(function (resolve, reject) {
    $('#modal-relationships-by-dim').on('shown.bs.modal', function () {
      console.log('Modal is now shown');
      resolve(); // Resolve the promise when modal is shown
    });
    $('#modal-relationships-by-dim').modal('show');
  });
}

function showRefinementModal() {
  return new Promise(function (resolve, reject) {
    $('#modal-refinements').on('shown.bs.modal', function () {
      console.log('Modal is now shown');
      resolve(); // Resolve the promise when modal is shown
    });
    $('#modal-refinements').modal('show');
  });
}

//This function populates the relationships list, it goes through the currently generated catalog and lists ALL of the current relationships of all types, could require optimization.
//@mode if true it generates the relationship list for the sustainability dimensions button, else it generates it based on the relationship type;
function generateRefinementList() {
  // console.log("this got called");

  console.log("called");

  var type;

  var relationships = istar.models.currentCatalog.links;

  var entities = istar.models.currentCatalog.actors[0].nodes;

  $(".refinements-container").empty();

    for (var i = 0; i < relationships.length; i++) {
      //We also need to check if it's a subcategory of something that is already checked if it is we add it to the diagram
      var source = relationships[i].source;
      var target = relationships[i].target;
      var targetName = getNodeName(target);
      var sourceName = getNodeName(source);
      var tid = targetName.replace(/\s+/g, '-').toLowerCase();

      if (!targetName.includes("Dimension") && !targetName.includes("requirements") && !targetName.includes("Sustainability") && !targetName.includes("dimension") && !sourceName.includes("Dimension") && !sourceName.includes("requirements") && !sourceName.includes("Sustainability") && !sourceName.includes("dimension")) {

        if ($(`#${tid}`).length) {
          // Element exists, append the new text
          console.log("git");
          $(`#${tid}`).append(`, ${sourceName}`);
        } else {
          
          $(".refinements-container").append(`
            <div class="refinement">
            <p id=${tid} >${targetName} <span class="glyphicon glyphicon-arrow-right"></span> ${sourceName}</p>
            </div>
          `);
        }
        
        
      }
    }


}

//This function populates the relationships list, it goes through the currently generated catalog and lists ALL of the current relationships of all types, could require optimization.
//@mode if true it generates the relationship list for the sustainability dimensions button, else it generates it based on the relationship type;
function generateRelationshipList(mode) {
  // console.log("this got called");
  $(".relationship-container").empty();

  var type;

  var relationships = istar.models.currentCatalog.links;

  var entities = istar.models.currentCatalog.actors[0].nodes;

  for (var i = 0; i < relationships.length; i++) {
    type = relationships[i].label;
    var target = relationships[i].target;
    var source = relationships[i].source;
    var targetName = "target";
    var sourceName = "source";
    var found = 0;

    for (var j = 0; j < entities.length; j++) {
      if (entities[j].id === target) {
        targetName = entities[j].text;
        found++;
      } else if (entities[j].id === source) {
        sourceName = entities[j].text;
        found++;
      }

      if (found > 1) {
        break;
      }
    }

    // console.log(type);


    if (mode == false) {
      if (!sourceName.includes("Dimension") && !sourceName.includes("requirements") && !sourceName.includes("Sustainability") && !sourceName.includes("dimension")) {
        if (targetName.includes("requirements")) {
          targetName = targetName + " ( " + findDimension(target) + " )";
        }

        switch (type) {
          case 'help':
            // console.log("Help detected");
            $("#help-links .relationship-container").append(`
              <div class="relationship">
              <p>${sourceName} <span class="glyphicon glyphicon-arrow-right"></span> ${targetName}</p>
              </div>
            `);
            break;
          case 'make':
            $("#make-links .relationship-container").append(`
            <div class="relationship">
            <p>${sourceName} <span class="glyphicon glyphicon-arrow-right"></span> ${targetName}</p>
            </div>
          `);
            // console.log("Make detected");
            break;
          case 'hurt':
            $("#hurt-links .relationship-container").append(`
              <div class="relationship">
              <p>${sourceName} <span class="glyphicon glyphicon-arrow-right"></span> ${targetName}</p>
              </div>
            `);
            // console.log("Hurt detected");
            break;
          case 'break':
            $("#break-links .relationship-container").append(`
              <div class="relationship">
              <p>${sourceName} <span class="glyphicon glyphicon-arrow-right"></span> ${targetName}</p>
              </div>
            `);
            // console.log("Break detected");
            break;
          default:
            console.log("failed detection");
        }
      }
    } else {
      if (!sourceName.includes("Dimension") && !sourceName.includes("requirements") && !sourceName.includes("Sustainability") && !sourceName.includes("dimension")) {
        // console.log("got past the initial check")
        if (findDimension(target).toLowerCase().includes("social")) {
          $("#social-links .relationship-container").append(`
              <div class="relationship">
              <p>${sourceName} <span class="glyphicon glyphicon-arrow-right"></span> ${type}</p>
              </div>
            `);
        } else if (findDimension(target).toLowerCase().includes("technical")) {
          $("#technical-links .relationship-container").append(`
              <div class="relationship">
              <p>${sourceName} <span class="glyphicon glyphicon-arrow-right"></span> ${type}</p>
              </div>
            `);
        } else if (findDimension(target).toLowerCase().includes("individual")) {
          $("#individual-links .relationship-container").append(`
              <div class="relationship">
              <p>${sourceName} <span class="glyphicon glyphicon-arrow-right"></span> ${type}</p>
              </div>
            `);
        } else if (findDimension(target).toLowerCase().includes("environmental")) {
          $("#environmental-links .relationship-container").append(`
              <div class="relationship">
              <p>${sourceName} <span class="glyphicon glyphicon-arrow-right"></span> ${type}</p>
              </div>
            `);
        } else if (findDimension(target).toLowerCase().includes("economic")) {
          $("#economic-links .relationship-container").append(`
              <div class="relationship">
              <p>${sourceName} <span class="glyphicon glyphicon-arrow-right"></span> ${type}</p>
              </div>
            `);
        }
      }
    }
  }
}


//function that checks the lists of ids of the single dimension and multi dimension lists
//@return gives us the dimension that it belongs to
function findDimension(id) {

  for (var key in singleDimensionIds) {
    if (singleDimensionIds[key].includes(id)) {
      return key;
    }
  }

  for (var key in multiDimensionIds) {
    if (multiDimensionIds[key].includes(id)) {
      return key;
    }
  }

  return "none";

}

// Function to handle checkbox change event
function handleCheckboxChange() {
  var value = $(this).val();

  if (value.includes("(")) {
    var uncutName = value;

    // Find the index of the open bracket
    var indexOfOpenBracket = uncutName.indexOf(' (');

    // Extract the part of the variable before the open bracket
    value = uncutName.substring(0, indexOfOpenBracket);
  }

  if ($(this).prop('checked')) {
    // Add the value of the checked checkbox to the array
    checkedCheckboxes.push(value);
  } else {
    // Remove the value from the array if the checkbox is unchecked
    var index = checkedCheckboxes.indexOf(value);
    if (index !== -1) {
      checkedCheckboxes.splice(index, 1);
    }
  }

  // console.log("Checked checkboxes:", checkedCheckboxes);
}
//This function is used to verify if the catalog has been generated already, the catalog will ALWAYS only have ONE actor with the name "Catalog"
//If it has more or less actors, or if the actor name does not match then the catalog has not been loaded in yet
//This could be changed up to auto-load the catalog but giving the option seems better
function checkCatalogExists() {
  elements = istar.getElements();
  actors = _.filter(elements, function (element) { return element.isKindOfActor(); });
  if (actors[0].attributes.name === 'Catalog' && actors.length == 1) {
    return true;
  }

  return false;
}

//Function that creates the checkboxes for the list of selectable sustainability requirements
//@target: the checkbox div that we want to add the checkbox to
//@name: the name of the requirement to add as a label for the checkbox
function addCheckbox(target, name) {
  var uncutName = name;

  // Find the index of the open bracket
  var indexOfOpenBracket = uncutName.indexOf(' (');

  // Extract the part of the variable before the open bracket
  var cutName = uncutName.substring(0, indexOfOpenBracket);

  // console.log(uncutName);

  if(indexOfOpenBracket > -1) {
    var definition = getDefinition(cutName);
  } else {
    var definition = getDefinition(uncutName);
  }

  

  $(target).append(`
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="${name}" id="multiDim${name} data-toggle="tooltip" data-placement="top" title="${definition}">
    <label class="form-check-label" for="multiDim${name} data-toggle="tooltip" data-placement="top" title="${definition}">
    ${name}
    </label>
  </div>
`);
}

function getQualityById(qualityid) {
  var qualities = istar.models.sustainabilityCatalog.actors[0].nodes;

  for(var x = 0; x < qualities.length; x++) {
    if(qualities[x].id == qualityid) {
      return qualities[x];
    }
  }

}

//This click event handles the collapsing and expansion of qualities, it works globally but was only tested for the catalog.
$(document).on("click", ".joint-type-quality", function (e) {

  //Only trigger the event if shift is held down while clicked
  if (e.shiftKey) {
    //Queue that contains the elements that will have to be collapsed
    var collapsequeue;

    //Cell that the user clicked on
    var selected = ui.selectedCell;

    var sourcedrels = [];


    //We fetch the first set of links that are connected to the originally selected cell so that we can move down the tree
    collapsequeue = istar.graph.getConnectedLinks(selected);
    // console.log(collapsequeue);
    // console.log(selected);

    $(this).toggleClass("collapsed");

    //checks what we're doing, if true we're hiding otherwise we're showing
    var iscollapsed = $(this).hasClass("collapsed");

    for (var index4 = 0; index < collapsequeue.length; index4++) {

      if (collapsequeue[index4].attributes.source.id == selected.attributes.id) {
        collapsequeue.splice(index4, 1);
      }
    }


    //Auxiliary variable to help check if we have processed all links and nodes in the tree
    var changed = true;

    //If we are processing a node then we will have to fetch all links associated with it, this variable stores them.
    var newrels;

    //We keep processing until eventually we no longer find any new nodes or links.
    while (changed == true) {
      //Variables reset each cycle 
      changed = false;
      newrels = [];

      //This loop will fill up the collapsequeue variable with the missing elements from the tree
      for (var index = 0; index < collapsequeue.length; index++) {
        var src = null;

        //There are two possibilities when processing an element, it's either a link or a node, following the naming convention for the types we check for a particular word in the type
        //If we're handling a link we want its source as we're moving down the tree
        //If we're handling a node then all we do is get the links connected with them
        if (collapsequeue[index].attributes.type.includes("Link")) {
          src = istar.graph.getCell(collapsequeue[index].attributes.source);
        } else {
          newrels = istar.graph.getConnectedLinks(collapsequeue[index]);
        }


        //If the source of a link doesn't already exist, and isn't null 
        if (src !== null && !collapsequeue.includes(src)) {

          if (src.attributes.source !== selected.attributes.id) {

            changed = true;
            collapsequeue.push(src);
          }

        }

        //If we have new relations then we want to add them from the array into the collapsequeue
        if (newrels.length > 0) {
          for (var index2 = 0; index2 < newrels.length; index2++) {
            if (!collapsequeue.includes(newrels[index2]) && newrels[index2].attributes.source.id !== selected.attributes.id) {
              collapsequeue.push(newrels[index2]);
            }
          }
        }
      }
    }

    //  console.log(collapsequeue);

    // console.log(xuz.id);

    if (collapsequeue.includes(selected)) {
      var ind = collapsequeue.indexOf(selected);
      collapsequeue.splice(ind, 1);
    }

    for (var index3 = 0; index3 < collapsequeue.length; index3++) {
      // console.log(collapsequeue[index3]);
      var id;

      // console.log(id);
      if (collapsequeue[index3].attributes.type.includes("Link")) {
        if (collapsequeue[index3].attributes.source.id == selected.attributes.id) {
          collapsequeue.splice(index3, 1);
          id = collapsequeue[index3].attributes.id;
        } else {
          id = collapsequeue[index3].attributes.id;
        }
      }
      else {
        id = collapsequeue[index3].attributes.id;
      }

      var iddiv = $("g[model-id=" + id + "]");
      if(iscollapsed) {
        

        if(iddiv.hasClass("collapsed")) {
          iddiv.removeClass("collapsed");
        }
        if(!iddiv.hasClass("hidden")) {
          iddiv.addClass("hidden");
        }
        
      } else {
        if(iddiv.hasClass("collapsed")) {
          iddiv.removeClass("collapsed");
        }
        if(iddiv.hasClass("hidden")) {
          iddiv.removeClass("hidden");
        }
      }

      
    }

  }

});

function linkExists(target, source) {
  var catalogRelationships = istar.models.sustainabilityCatalog.links;

  for (var a = 0; a < catalogRelationships.length; a++) {
    var tmptarget = catalogRelationships[a].target;
    var tmpsource = catalogRelationships[a].source;

    if ((tmptarget == target && tmpsource == source)) {
      return true;
    }
  }

  return false;
}



//fetches the name of a node by its id
function getNodeName(id) {
  var qualityNodes = istar.models.sustainabilityCatalog.actors[0].nodes;

  for (var i = 0; i < qualityNodes.length; i++) {
    if (qualityNodes[i].id == id)
      return qualityNodes[i].text;
  }
}

//fetches the name of a node by its id
function getNodeId(name) {
  var qualityNodes = istar.models.sustainabilityCatalog.actors[0].nodes;

  for (var i = 0; i < qualityNodes.length; i++) {
    if (qualityNodes[i].text == name)
      return qualityNodes[i].id;
  }
}

//gets the definition of a term from the dictionary, if it exists
function getDefinition(term) {
  if (typeof dictionary[term] == "undefined") {
    return "Term definition does not exist";
  } else {
    return dictionary[term];
  }
}

function initDimensionIdLists() {
  var catalogRelationships = istar.models.sustainabilityCatalog.links;
  var catalogQualities = istar.models.sustainabilityCatalog.actors[0].nodes;
  // console.log(catalogRelationships[0].target);

  var targetNode;
  var sourceNode;
  var sourceName;
  var targetName;
  //We do a first run-through to populate the lists of Ids, by doing things this way we make it so that modifications to the catalog are not difficult as long as a similar 
  //structure is kept two run-throughs are necessary
  for (var r = 0; r < catalogRelationships.length; r++) {

    targetNode = catalogRelationships[r].target;
    sourceNode = catalogRelationships[r].source;
    sourceName = getNodeName(sourceNode);
    targetName = getNodeName(targetNode);

    if (targetNode == "371db23b-9353-4639-8354-db223f82b062") {
      //initialize the position if it doesn't exist yet
      if (!singleDimensionIds[sourceName]) {
        singleDimensionIds[sourceName] = [];

      }

    } else if (targetNode == "8936a918-86d4-4ecd-bdb4-b9f6352397fe") {
      if (!multiDimensionIds[sourceName]) {
        multiDimensionIds[sourceName] = [];

      }
    }
  }

  //Then we do a second run-through to place all the Ids that were not caught during the first phase
  for (var s = 0; s < catalogRelationships.length; s++) {

    //name of the node
    targetNode = catalogRelationships[s].target;
    sourceNode = catalogRelationships[s].source;
    sourceName = getNodeName(sourceNode);
    targetName = getNodeName(targetNode);


    if (targetName in singleDimensionIds) {
      singleDimensionIds[targetName].push(sourceNode);
    } else if (targetName in multiDimensionIds) {
      multiDimensionIds[targetName].push(sourceNode);
    }
  }

}

//This dictionary will store all of the definitions of the requirements, they are shown
var dictionary = {
  "Effectiveness": "Complies data quality requirements both in input and output",
  "Efficiency": "Resources expended in relation to the accuracy, completeness and also less cost/time/human resources to conduct the research",
  "Trust": "Stakeholders have confidence that a product or system will behave as intended",
  "Flexibility": "The system can be used in contexts beyond those initially specified in the requirements, such as controlling different assets",
  "Time Behaviour": "Response, processing times and throughput rates of a system, when performing its functions, in real-time",
  "User Error Protection": "System protects users against making errors by being as intuitive as possible",
  "Confidentiality": "The system ensures that data is accessible only to those authorized to have access. Additionally, data should not be used for negative reporting, but only for improving efficiency",
  "Usability": "Degree to which a product or system can be used by specified users to achieve specified goals with effectiveness, efficiency and satisfaction in a specified context of use",
  "Risk mitigation": "System mitigates the potential risk to financial status in the intended contexts of use\n System mitigates the potential risk to property or the environment in the intended contexts of use\n System mitigates the potential risk to people in the intended contexts of use",
  "Recoverability": "In the event of an interruption or a failure, the data can be recovered and the desired state of the system is re-established",
  "Functional appropriateness/suitability": "The functions facilitate the accomplishment of specified tasks and objectives. System provides the correct results with the needed degree of precision.",
  "Functional correctness": "System provides the correct results with the needed degree of precision",
  "Business improvement/growth": "Improvements to the business with a focus on increasing the profitability and efficiency of the company, thereby achieving a greater economic sustainability of the organisation",
  "Maintainability": "System can be effectively and efficiently modified without introducing defects or degrading existing product quality",
  "Replaceability": "Product can be replaced by another specified software product for the same purpose in the same environment.",
  "Compatibility": "Capability of a product to exchange information with other products, and/or to perform its required functions while sharing the same common environment and resources",
  "Reliability": "capability of a product to perform specified functions under specified conditions for a specified period of time without interruptions and failures",
  "Security": "Capability of a product to protect information and data so that persons or other products have the degree of data access appropriate to their types and levels of authorization, and to defend against attack patterns by malicious actors",
  "Portability": "Degree to which a product or system provides the features of adaptable and transferrable with effectively and efficiently to decrease the software investments degree to which a product or system can effectively and efficiently be adapted and transferred from one hardware, software or other operational from one environment to another degree to which a product or system provides the satisfaction to the users with the features of adaptable and transferable actions",
  "Extensibility": "The effort required to implement an extension.",
  "Interoperability": "Capability of a product to exchange information with other products and mutually use the information that has been exchanged",
  "Co-existence": "The product can perform its functions efficiently while sharing its environment and resources with other products",
  "Availability": "Capability of a product to be operational and accessible when required for use”",
  "Usefulness": "User is satisfied with their perceived achievement of pragmatic goals.",
  "Greenability": "The degree to which a product energy and the resources are optimised, and the product can be used over a long period.",
  "Functional suitability": "Capability of a product to provide functions that meet stated and implied needs of intended users when it is used under specified conditions",
  "Impactibility": "Acceptance towards environment impacts with focused on the way of software is created, used, maintained and disposed with minimal impacts on environment acceptance towards economic impacts in developing software with lower cost of development and maintenance to survive acceptance towards social impacts of user and software functions are connectedness to each other to satisfy on using a product or system",
  "Perdurability": "Perdurability is the idea of producing sustainable software security products that have longevity and are adaptable and recyclable, i.e., increasing those aspects that make the software last for long time with the ability to adapt to change without losing its functionality related to its quality",
  "Freedom from risk": "Degree to which a product or system mitigates the potential risk to economic status, human life, health, or the environment",
  "Agency": "The ability to act in an environment",
  "Context coverage": "Degree to which a product or system can be used with effectiveness, efficiency, freedom from risk and satisfaction in both specified contexts of use and in contexts beyond those initially explicitly identified",
  "Effectiveness": "Accuracy and completeness with which users achieve specified goals",
  "Performance efficiency": "Performance relative to the amount of resources used under stated conditions",
  "Resource utilization" : "Degree to which the amounts and types of resources used by a product or system, when performing its functions, meet requirements",
  "Capacity" : "Degree to which the maximum limits of a product or system parameter meet requirements",
  "Economic risk mitigation" : "Degree to which a product or system mitigates the potential risk to financial status, efficient operation, commercial property, reputation or other resources in the intended contexts of use",
  "Health and Safety Risk Mitigation" : "Degree to which a product or system mitigates the potential risk to financial status, efficient operation, commercial property, reputation or other resources in the intended contexts of use",
  "Envinronmental risk mitigation" : "Degree to which a product or system mitigates the potential risk to property or the environment in the intended contexts of use",
  "Satisfaction" : "Degree to which user needs are satisfied when a product or system is used in a specified context of use",
  "Accessibility" : "Degree to which a product or system can be used by people with the widest range of characteristics and capabilities to achieve a specified goal in a specified context of use",

};

istar.models.sustainabilityCatalog = {
  "actors": [
    {
      "id": "dbe6cf9f-877d-4600-bac9-8f7bbde93426",
      "text": "Catalog",
      "type": "istar.Agent",
      "x": 60,
      "y": 86,
      "nodes": [
        {
          "id": "e8184dc3-d178-406a-b57d-772c114ad35e",
          "text": "Sustainability",
          "type": "istar.Quality",
          "x": 3706,
          "y": 119,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "a6eefcb0-1ba7-4034-92c1-4ea02734b207",
          "text": "Economic Dimension",
          "type": "istar.Quality",
          "x": 3022,
          "y": 363,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "03c2b4ce-5e02-43d7-ba11-f1e702fe84b2",
          "text": "Individual Dimension",
          "type": "istar.Quality",
          "x": 407,
          "y": 407,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "612d30c7-da0f-415e-a410-a0235d6b35d5",
          "text": "Environmental Dimension",
          "type": "istar.Quality",
          "x": 2094,
          "y": 347,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "01aed92e-f210-4ff4-adb8-75d145f108d7",
          "text": "Effectiveness",
          "type": "istar.Quality",
          "x": 5734,
          "y": 778,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "4b15afba-82a4-4cf4-abbc-4ea289c0e0ee",
          "text": "Usefulness",
          "type": "istar.Quality",
          "x": 6929,
          "y": 1007,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "4c9087bc-c68f-4ec3-a8ac-061e0bb9d7cb",
          "text": "Trust",
          "type": "istar.Quality",
          "x": 6821,
          "y": 1007,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "64bea084-6f49-4c16-b242-ff48166939fa",
          "text": "Increased productivity",
          "type": "istar.Quality",
          "x": 3266,
          "y": 794,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "691a6b3a-1e2e-4c13-ba0c-ccd38b75abb7",
          "text": "Business growth",
          "type": "istar.Quality",
          "x": 3162,
          "y": 1003,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "cbed3df9-d921-4dca-904e-7af504a39282",
          "text": "User error protection",
          "type": "istar.Quality",
          "x": 7171,
          "y": 1005,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "2d6448e8-45fc-4e5e-8ebc-c59dec8b495c",
          "text": "Resource Utilization",
          "type": "istar.Quality",
          "x": 6162,
          "y": 1009,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "a0940488-2fd8-4212-b5fc-98182d506034",
          "text": "Ecosystem protection",
          "type": "istar.Quality",
          "x": 1695,
          "y": 1007,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "4a282cb4-137b-4fa9-9285-4d5d7331a628",
          "text": "Reduction of waste and disposal",
          "type": "istar.Quality",
          "x": 1982,
          "y": 1007,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "67c1fb69-fcce-4a0d-a207-007176bed655",
          "text": "Environmental footprint reduction",
          "type": "istar.Quality",
          "x": 2176,
          "y": 1006,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "c8649c6a-a902-4a25-8148-9de3fd6973ca",
          "text": "Privacy",
          "type": "istar.Quality",
          "x": 452,
          "y": 782,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "2465802a-69f5-47d5-8340-0c081631e7d8",
          "text": "Fair treatment of the user",
          "type": "istar.Quality",
          "x": 353,
          "y": 784,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "1b3f65c7-7758-415b-aa07-02bac6754a3b",
          "text": "Delivery requirements",
          "type": "istar.Quality",
          "x": 3286,
          "y": 623,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "c190cd69-a2e3-4f08-a15d-cd2a36dac918",
          "text": "Usability requirements",
          "type": "istar.Quality",
          "x": 2205,
          "y": 591,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "eeec819a-08dd-4ce2-982e-f306d8b8be7d",
          "text": "Usability requirements",
          "type": "istar.Quality",
          "x": 2830,
          "y": 614,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "de3dbc5f-71f1-41e8-9302-55d10f4db56e",
          "text": "Ethical requirements",
          "type": "istar.Quality",
          "x": 1239,
          "y": 592,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "a6ad5628-37b9-4d7e-8193-9325cebaf503",
          "text": "Ethical requirements",
          "type": "istar.Quality",
          "x": 352,
          "y": 553,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "7c573472-6b17-407f-9b24-bc7cfb0301ea",
          "text": "Lifelong learning",
          "type": "istar.Quality",
          "x": 64,
          "y": 787,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "8268ecd2-ab18-42ca-9682-3b607ca3ca0f",
          "text": "Health and Safety Risk Mitigation",
          "type": "istar.Quality",
          "x": 6707,
          "y": 1007,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "139d8c8c-bd8d-4075-9b25-e146ba4b54b8",
          "text": "Agency",
          "type": "istar.Quality",
          "x": 647,
          "y": 787,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "2a46a9bb-93b7-447f-97d7-74b219fe993e",
          "text": "Freedom",
          "type": "istar.Quality",
          "x": 747,
          "y": 788,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "c5b39ab4-36d2-425c-8b28-6488e3d6d05f",
          "text": "Personalization",
          "type": "istar.Quality",
          "x": 548,
          "y": 782,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "63b71008-ca82-431f-b36c-e652deb15bbd",
          "text": "Collaboration",
          "type": "istar.Quality",
          "x": 252,
          "y": 787,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "e20c8fdf-2aaf-4dbe-b851-a3a22db140e5",
          "text": "Leadership development",
          "type": "istar.Quality",
          "x": 158,
          "y": 787,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "970d719e-959e-457b-bdf2-b6ba3ac01148",
          "text": "Human dignity",
          "type": "istar.Quality",
          "x": 307,
          "y": 1006,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "d07ee23b-ce40-4f28-9d31-72d4e4b9fe22",
          "text": "Equality of access",
          "type": "istar.Quality",
          "x": 405,
          "y": 1007,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "9ed715b8-3b93-4e25-bf7e-d245ce857e3f",
          "text": "Usability requirements",
          "type": "istar.Quality",
          "x": 625,
          "y": 551,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "0ee2994e-be3a-459f-b273-ebef320919ac",
          "text": "Privacy requirements",
          "type": "istar.Quality",
          "x": 454,
          "y": 551,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "cd1131e7-1045-42b4-967d-eef99cfdcb9a",
          "text": "Co-existence",
          "type": "istar.Quality",
          "x": 5540,
          "y": 1006,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "7d17913b-39e7-4429-8990-b387a2547012",
          "text": "Environmental risk mitigation",
          "type": "istar.Quality",
          "x": 6606,
          "y": 1006,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "29ffb304-791a-4fa0-84cf-36db3507902e",
          "text": "Logistics management",
          "type": "istar.Quality",
          "x": 2309,
          "y": 789,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "55a567f9-f0ec-4aaf-89ac-efeb9a0760f7",
          "text": "Pollution reduction",
          "type": "istar.Quality",
          "x": 2274,
          "y": 1007,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "f358eaff-6224-4d86-9dcc-316b180fd858",
          "text": "Time behavior",
          "type": "istar.Quality",
          "x": 6257,
          "y": 1006,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "711a5f01-8ade-4a55-9591-77982cc3f9a9",
          "text": "Promotion of biodiversity and land use",
          "type": "istar.Quality",
          "x": 1790,
          "y": 1006,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "54080330-ac1d-4e65-8c40-785ba052ad1e",
          "text": "Energy efficiency",
          "type": "istar.Quality",
          "x": 2081,
          "y": 1006,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "3a25ebaa-33f7-40d5-9901-9ae4f3bc8c2b",
          "text": "Greenability",
          "type": "istar.Quality",
          "x": 1887,
          "y": 1007,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "9d3b1228-fed9-4f1c-ac09-ee06306e4568",
          "text": "Infrastructure optimization",
          "type": "istar.Quality",
          "x": 1481,
          "y": 785,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "f7e53ca4-a8b9-436c-9cf8-ae6a1318e609",
          "text": "Functional suitability",
          "type": "istar.Quality",
          "x": 5924,
          "y": 782,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "5760baa5-ec78-4ebd-a39d-2435974abab4",
          "text": "Environmental effects",
          "type": "istar.Quality",
          "x": 1997,
          "y": 786,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "bdafcec0-5501-4295-bcd4-e4f8f4dc0450",
          "text": "Impactibility",
          "type": "istar.Quality",
          "x": 2207,
          "y": 786,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "1f67e6d2-5893-44d5-bb8d-417066a692c2",
          "text": "Supportability",
          "type": "istar.Quality",
          "x": 1680,
          "y": 786,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "8827598f-a772-41a1-a7ab-75161321d298",
          "text": "Perdurability",
          "type": "istar.Quality",
          "x": 1578,
          "y": 786,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "a49a0928-c175-4de8-a265-e454c07ff869",
          "text": "Dematerialization",
          "type": "istar.Quality",
          "x": 1880,
          "y": 788,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "d7d7377e-6d03-49e0-882f-0f643f6f308d",
          "text": "Capacity",
          "type": "istar.Quality",
          "x": 6357,
          "y": 1007,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "a0ab73ee-2f9c-4fc8-bf4c-9ef9da52ec04",
          "text": "Integrity",
          "type": "istar.Quality",
          "x": 5428,
          "y": 1006,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "73570810-c716-409e-9ae1-fbfd40e4fbcd",
          "text": "Accessibility",
          "type": "istar.Quality",
          "x": 7070,
          "y": 1005,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "6259981d-f01a-4807-8142-42198c333040",
          "text": "Evolvability",
          "type": "istar.Quality",
          "x": 1779,
          "y": 788,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "7986c628-5f41-4945-968c-5cba8449a864",
          "text": "User conformity",
          "type": "istar.Quality",
          "x": 1233,
          "y": 785,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "6ec39b7c-5390-454b-bb50-f8e405af7ca8",
          "text": "Distribution of software",
          "type": "istar.Quality",
          "x": 1380,
          "y": 785,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "77543c0e-fbcb-465c-b9bc-faea62f551f0",
          "text": "Process efficiency",
          "type": "istar.Quality",
          "x": 2106,
          "y": 785,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "f97eabd4-2385-4d77-a0ec-494cd1965b2a",
          "text": "Freedom from risk",
          "type": "istar.Quality",
          "x": 6606,
          "y": 789,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
          "text": "Implementation requirements",
          "type": "istar.Quality",
          "x": 1792,
          "y": 591,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "6fa86e32-c1b7-43fb-8f78-74ab4d3b6dd4",
          "text": "Delivery requirements",
          "type": "istar.Quality",
          "x": 1389,
          "y": 597,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "3d0f403f-2fa3-41fc-9d6e-0c2c94f67e86",
          "text": "Completeness",
          "type": "istar.Quality",
          "x": 4512,
          "y": 1006,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "2b03c9af-bcbc-490c-9665-36b1e80b5ced",
          "text": "Value",
          "type": "istar.Quality",
          "x": 3460,
          "y": 794,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "fed1ee43-7d93-434c-a7f8-2ad9d4f6c4aa",
          "text": "Functional completeness",
          "type": "istar.Quality",
          "x": 6044,
          "y": 1008,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "06d4a13e-0ff7-4fb4-8f69-29d1a7019858",
          "text": "Innovation",
          "type": "istar.Quality",
          "x": 2432,
          "y": 791,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "4dbf981e-b6bc-4be5-8723-1ab924c89701",
          "text": "Time to market reduction",
          "type": "istar.Quality",
          "x": 2532,
          "y": 790,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "879dfd8c-d882-4cff-bf40-7c4e216a87a5",
          "text": "Cost minimization",
          "type": "istar.Quality",
          "x": 2629,
          "y": 791,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "bb87c9d7-26ea-4baa-819c-29cd822339bf",
          "text": "Creation of business oportunities",
          "type": "istar.Quality",
          "x": 3268,
          "y": 1006,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "eddbfdd0-45b7-4546-877c-c87a069ac825",
          "text": "Interdisciplinarity",
          "type": "istar.Quality",
          "x": 3026,
          "y": 790,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "4581bc3c-97c4-4611-8202-7d0778d6eb3a",
          "text": "Reliability",
          "type": "istar.Quality",
          "x": 5178,
          "y": 784,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "3c38303c-f93e-4702-849f-0b13867107f4",
          "text": "Security",
          "type": "istar.Quality",
          "x": 5429,
          "y": 781,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "3ec03499-c906-4247-9f46-3360f3253aa7",
          "text": "Supply chain management",
          "type": "istar.Quality",
          "x": 3363,
          "y": 795,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "2db76ff1-7738-4c4b-9760-3b71a725d7d9",
          "text": "Recoverability",
          "type": "istar.Quality",
          "x": 5130,
          "y": 1008,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "0a14ad8d-e348-4d92-ad6e-0af2e3186311",
          "text": "Governance and processes",
          "type": "istar.Quality",
          "x": 2823,
          "y": 793,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "46f94fff-2515-4384-8893-86ea1a2c242c",
          "text": "Business agility",
          "type": "istar.Quality",
          "x": 3057,
          "y": 1004,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "64a0923c-f60d-480b-9d72-179fae567701",
          "text": "Implementation requirements",
          "type": "istar.Quality",
          "x": 2526,
          "y": 602,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "ce5c217c-bf4c-4e59-b6c1-b4cb9180f2d3",
          "text": "Interoperability requirements",
          "type": "istar.Quality",
          "x": 3015,
          "y": 613,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "5eb20c50-7ade-45ef-acb6-41ee1615ff53",
          "text": "Usability",
          "type": "istar.Quality",
          "x": 7131,
          "y": 798,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "3cd29e77-5980-4d3d-8d16-1b1c30ac6f4a",
          "text": "Satisfaction",
          "type": "istar.Quality",
          "x": 6871,
          "y": 792,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "b193c93e-fde4-41ad-849d-dd83ea4be06d",
          "text": "Delivery requirements",
          "type": "istar.Quality",
          "x": 174,
          "y": 549,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "1a004790-7d9b-4b79-997f-50af4b5b7522",
          "text": "Flexibility",
          "type": "istar.Quality",
          "x": 4614,
          "y": 1006,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "fa2f6407-fc02-47ec-91c7-45378444152a",
          "text": "Maintainability",
          "type": "istar.Quality",
          "x": 4744,
          "y": 786,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "fad059d4-0569-4d41-8ef9-1d63cdf99aea",
          "text": "Availability",
          "type": "istar.Quality",
          "x": 5237,
          "y": 1008,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "5a26d3e1-4b37-4aba-8a1b-dc1e44134128",
          "text": "Modifiability",
          "type": "istar.Quality",
          "x": 4715,
          "y": 1005,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "864f5134-0d56-4802-98eb-4fc4474c006c",
          "text": "Performance Efficiency",
          "type": "istar.Quality",
          "x": 6255,
          "y": 791,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "94b25ff7-4b3a-4076-a530-73a4603e55c4",
          "text": "Reusability",
          "type": "istar.Quality",
          "x": 4809,
          "y": 1008,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "845f9680-80f8-4fc4-9ba9-54de03280e3d",
          "text": "Economic risk mitigation",
          "type": "istar.Quality",
          "x": 6505,
          "y": 1007,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "9f7f74cc-ac0e-40a8-b0c0-651b893a367c",
          "text": "Functional appropriateness",
          "type": "istar.Quality",
          "x": 5832,
          "y": 1006,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "24670a09-7749-4557-b529-3aa9bd215a58",
          "text": "Functional correctness",
          "type": "istar.Quality",
          "x": 5939,
          "y": 1007,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "02e3e90c-16ea-4cc0-9c70-3f502e374d53",
          "text": "Replaceability",
          "type": "istar.Quality",
          "x": 4452,
          "y": 788,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "167bec28-6fdf-49d6-83ec-38e5faab2e79",
          "text": "Compatibility",
          "type": "istar.Quality",
          "x": 5590,
          "y": 782,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "b308d564-fbe4-4013-875c-46068cba7305",
          "text": "Portability",
          "type": "istar.Quality",
          "x": 5306,
          "y": 781,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "1bebebfa-5a56-4b79-adff-d79162024e18",
          "text": "Predictability",
          "type": "istar.Quality",
          "x": 4945,
          "y": 786,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "046e3089-0971-4c2f-bdca-8a8e3f3ea6b2",
          "text": "Dependability",
          "type": "istar.Quality",
          "x": 5054,
          "y": 784,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "9a56ac9f-8c9f-4885-b848-e84cc744ac11",
          "text": "Scalability",
          "type": "istar.Quality",
          "x": 4849,
          "y": 787,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "1136341d-8fca-400a-b235-97680a83ee36",
          "text": "Extensibility",
          "type": "istar.Quality",
          "x": 4351,
          "y": 787,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "05da66f4-ba51-4b4a-b2d3-6e2c38bbc89b",
          "text": "Interoperability",
          "type": "istar.Quality",
          "x": 5650,
          "y": 1007,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "dd374c94-76dc-4856-9d96-984b4aaf3b4d",
          "text": "Context coverage",
          "type": "istar.Quality",
          "x": 4559,
          "y": 788,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "5a3e5edf-e0da-4ba1-babf-6fee553a3350",
          "text": "Business effects",
          "type": "istar.Quality",
          "x": 3169,
          "y": 791,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "371db23b-9353-4639-8354-db223f82b062",
          "text": "Single dimension requirements",
          "type": "istar.Quality",
          "x": 2099,
          "y": 179,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "8936a918-86d4-4ecd-bdb4-b9f6352397fe",
          "text": "Multi-dimension requirements",
          "type": "istar.Quality",
          "x": 5110,
          "y": 241,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "6a026868-f913-4598-96db-c7840a02b347",
          "text": "Environmental and economic dimensions",
          "type": "istar.Quality",
          "x": 5112,
          "y": 356,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "b5164407-de4a-433d-84af-1d935743ca39",
          "text": "Environmental, economic and individual dimensions",
          "type": "istar.Quality",
          "x": 6604,
          "y": 417,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "7fb89cce-3973-485d-9874-d35f108c4244",
          "text": "Implementation requirements",
          "type": "istar.Quality",
          "x": 4603,
          "y": 552,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "29296aad-f0e7-44e3-bf4b-ace861749594",
          "text": "Reliability requirements",
          "type": "istar.Quality",
          "x": 5060,
          "y": 574,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "5efc68f1-b1fa-4e0d-94ad-0d6932821214",
          "text": "Usability requirements",
          "type": "istar.Quality",
          "x": 5923,
          "y": 597,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "89b06a7e-2fd6-4d66-a3ab-2a22e284b86f",
          "text": "Portability requirements",
          "type": "istar.Quality",
          "x": 5305,
          "y": 577,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "6700b366-f1ce-41a0-b2d4-6df55fdb98a0",
          "text": "Security requirements",
          "type": "istar.Quality",
          "x": 5431,
          "y": 577,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "fcfeba81-9605-4432-9306-1cac9c672d41",
          "text": "Interoperability requirements",
          "type": "istar.Quality",
          "x": 5584,
          "y": 579,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "ae4d58f0-340c-4332-9fbf-1c8d607c0493",
          "text": "Performance requirements",
          "type": "istar.Quality",
          "x": 5733,
          "y": 587,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "26a6672e-91b3-4a7e-9431-0e51f94a7319",
          "text": "Performance requirements",
          "type": "istar.Quality",
          "x": 6264,
          "y": 591,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "1530d033-22a3-44fe-aad5-7a11d95c00c7",
          "text": "Usability requirements",
          "type": "istar.Quality",
          "x": 6994,
          "y": 608,
          "customProperties": {
            "Description": ""
          }
        },
        {
          "id": "9d76facd-beeb-4238-9212-e6a36ec2afe3",
          "text": "Reliability requirements",
          "type": "istar.Quality",
          "x": 6615,
          "y": 598,
          "customProperties": {
            "Description": ""
          }
        }
      ]
    }
  ],
  "orphans": [],
  "dependencies": [],
  "links": [
    {
      "id": "df808309-080b-410e-88b6-8953921b06bf",
      "type": "istar.ContributionLink",
      "source": "1b3f65c7-7758-415b-aa07-02bac6754a3b",
      "target": "a6eefcb0-1ba7-4034-92c1-4ea02734b207",
      "label": "help"
    },
    {
      "id": "ab66456e-8d44-43f7-bb81-50b60c9f8aef",
      "type": "istar.ContributionLink",
      "source": "c190cd69-a2e3-4f08-a15d-cd2a36dac918",
      "target": "612d30c7-da0f-415e-a410-a0235d6b35d5",
      "label": "help"
    },
    {
      "id": "d60072f5-e51f-4fb9-a7e1-7fd43b93cfe9",
      "type": "istar.ContributionLink",
      "source": "eeec819a-08dd-4ce2-982e-f306d8b8be7d",
      "target": "a6eefcb0-1ba7-4034-92c1-4ea02734b207",
      "label": "help"
    },
    {
      "id": "953d4550-fa87-426a-9828-00c54a43b6a3",
      "type": "istar.ContributionLink",
      "source": "de3dbc5f-71f1-41e8-9302-55d10f4db56e",
      "target": "612d30c7-da0f-415e-a410-a0235d6b35d5",
      "label": "help"
    },
    {
      "id": "6c2d4ab9-2440-4a18-869f-895295746fb6",
      "type": "istar.ContributionLink",
      "source": "a6ad5628-37b9-4d7e-8193-9325cebaf503",
      "target": "03c2b4ce-5e02-43d7-ba11-f1e702fe84b2",
      "label": "help"
    },
    {
      "id": "beed5264-906e-44dc-b5de-62ecdef40edb",
      "type": "istar.ContributionLink",
      "source": "2465802a-69f5-47d5-8340-0c081631e7d8",
      "target": "a6ad5628-37b9-4d7e-8193-9325cebaf503",
      "label": "help"
    },
    {
      "id": "8e0c0ec1-1d2f-4d69-a138-c65059639696",
      "type": "istar.ContributionLink",
      "source": "9ed715b8-3b93-4e25-bf7e-d245ce857e3f",
      "target": "03c2b4ce-5e02-43d7-ba11-f1e702fe84b2",
      "label": "help"
    },
    {
      "id": "c055b5d5-778a-4cc7-a9d0-ec7c25562035",
      "type": "istar.ContributionLink",
      "source": "c5b39ab4-36d2-425c-8b28-6488e3d6d05f",
      "target": "9ed715b8-3b93-4e25-bf7e-d245ce857e3f",
      "label": "help"
    },
    {
      "id": "0d433039-c324-4e1c-a323-00bb6addf7f2",
      "type": "istar.ContributionLink",
      "source": "0ee2994e-be3a-459f-b273-ebef320919ac",
      "target": "03c2b4ce-5e02-43d7-ba11-f1e702fe84b2",
      "label": "help"
    },
    {
      "id": "357dca37-4204-45e2-b82a-f3bae49fe1ae",
      "type": "istar.ContributionLink",
      "source": "c8649c6a-a902-4a25-8148-9de3fd6973ca",
      "target": "0ee2994e-be3a-459f-b273-ebef320919ac",
      "label": "help"
    },
    {
      "id": "df25d1e1-c08f-4afe-bd62-06fcbd99d695",
      "type": "istar.ContributionLink",
      "source": "139d8c8c-bd8d-4075-9b25-e146ba4b54b8",
      "target": "9ed715b8-3b93-4e25-bf7e-d245ce857e3f",
      "label": "help"
    },
    {
      "id": "0675e97c-e106-4052-8a7f-01512d1fb9de",
      "type": "istar.ContributionLink",
      "source": "2a46a9bb-93b7-447f-97d7-74b219fe993e",
      "target": "9ed715b8-3b93-4e25-bf7e-d245ce857e3f",
      "label": "help"
    },
    {
      "id": "96b00a1a-d6ba-4e92-a8c1-6b5f23b35441",
      "type": "istar.ContributionLink",
      "source": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "target": "612d30c7-da0f-415e-a410-a0235d6b35d5",
      "label": "help"
    },
    {
      "id": "f601f0a5-ccae-4d89-bb0a-b1c397182ea0",
      "type": "istar.ContributionLink",
      "source": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "target": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "label": "help"
    },
    {
      "id": "c223eb06-88ed-4af5-89e1-996a8ad08d25",
      "type": "istar.ContributionLink",
      "source": "1f67e6d2-5893-44d5-bb8d-417066a692c2",
      "target": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "label": "help"
    },
    {
      "id": "62a50445-ec18-49d2-b06e-1666af7dea05",
      "type": "istar.ContributionLink",
      "source": "8827598f-a772-41a1-a7ab-75161321d298",
      "target": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "label": "help"
    },
    {
      "id": "268cab33-732c-41cd-bc35-f0e88693fb24",
      "type": "istar.ContributionLink",
      "source": "9d3b1228-fed9-4f1c-ac09-ee06306e4568",
      "target": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "label": "help"
    },
    {
      "id": "91be6092-4741-4cfb-b709-65ff98d5f935",
      "type": "istar.ContributionLink",
      "source": "29ffb304-791a-4fa0-84cf-36db3507902e",
      "target": "c190cd69-a2e3-4f08-a15d-cd2a36dac918",
      "label": "help"
    },
    {
      "id": "9297ed9d-e2d4-41d9-9998-f0a2f20d58a0",
      "type": "istar.ContributionLink",
      "source": "bdafcec0-5501-4295-bcd4-e4f8f4dc0450",
      "target": "c190cd69-a2e3-4f08-a15d-cd2a36dac918",
      "label": "help"
    },
    {
      "id": "319b914e-3da9-461b-a85c-16394c75a540",
      "type": "istar.ContributionLink",
      "source": "a49a0928-c175-4de8-a265-e454c07ff869",
      "target": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "label": "help"
    },
    {
      "id": "dcd2fdfb-7798-499a-bca9-3c71fdf38414",
      "type": "istar.ContributionLink",
      "source": "6fa86e32-c1b7-43fb-8f78-74ab4d3b6dd4",
      "target": "612d30c7-da0f-415e-a410-a0235d6b35d5",
      "label": "help"
    },
    {
      "id": "1e4d6f01-9d4d-4306-ad7f-fd02512f18d3",
      "type": "istar.ContributionLink",
      "source": "6ec39b7c-5390-454b-bb50-f8e405af7ca8",
      "target": "6fa86e32-c1b7-43fb-8f78-74ab4d3b6dd4",
      "label": "help"
    },
    {
      "id": "1a7eae83-9202-4efe-8954-257bfff67879",
      "type": "istar.ContributionLink",
      "source": "6259981d-f01a-4807-8142-42198c333040",
      "target": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "label": "help"
    },
    {
      "id": "b1f86112-2529-4dcb-9ff3-76a95f76f541",
      "type": "istar.ContributionLink",
      "source": "77543c0e-fbcb-465c-b9bc-faea62f551f0",
      "target": "c190cd69-a2e3-4f08-a15d-cd2a36dac918",
      "label": "help"
    },
    {
      "id": "f377062a-2be9-4a0c-8058-0cd4a66c0233",
      "type": "istar.ContributionLink",
      "source": "7986c628-5f41-4945-968c-5cba8449a864",
      "target": "de3dbc5f-71f1-41e8-9302-55d10f4db56e",
      "label": "help"
    },
    {
      "id": "3d2ccb39-8c8e-4292-b42f-3a774d2a026d",
      "type": "istar.ContributionLink",
      "source": "64bea084-6f49-4c16-b242-ff48166939fa",
      "target": "1b3f65c7-7758-415b-aa07-02bac6754a3b",
      "label": "help"
    },
    {
      "id": "4722de73-ed05-4c4b-9283-a961031575db",
      "type": "istar.ContributionLink",
      "source": "64a0923c-f60d-480b-9d72-179fae567701",
      "target": "a6eefcb0-1ba7-4034-92c1-4ea02734b207",
      "label": "help"
    },
    {
      "id": "a01e29b3-53f1-4152-884e-d83ccaa8324e",
      "type": "istar.ContributionLink",
      "source": "06d4a13e-0ff7-4fb4-8f69-29d1a7019858",
      "target": "64a0923c-f60d-480b-9d72-179fae567701",
      "label": "help"
    },
    {
      "id": "fe48adbb-10e1-4db3-be1c-b4d5045a33d9",
      "type": "istar.ContributionLink",
      "source": "ce5c217c-bf4c-4e59-b6c1-b4cb9180f2d3",
      "target": "a6eefcb0-1ba7-4034-92c1-4ea02734b207",
      "label": "help"
    },
    {
      "id": "ca7fb21d-4895-4e4e-b016-91182cafc233",
      "type": "istar.ContributionLink",
      "source": "eddbfdd0-45b7-4546-877c-c87a069ac825",
      "target": "ce5c217c-bf4c-4e59-b6c1-b4cb9180f2d3",
      "label": "help"
    },
    {
      "id": "9ca4e0a3-1bb9-46ee-a6f2-d419df63caef",
      "type": "istar.ContributionLink",
      "source": "2b03c9af-bcbc-490c-9665-36b1e80b5ced",
      "target": "1b3f65c7-7758-415b-aa07-02bac6754a3b",
      "label": "help"
    },
    {
      "id": "1d25cc9a-6a07-4586-91d8-bc9462c75fd5",
      "type": "istar.ContributionLink",
      "source": "879dfd8c-d882-4cff-bf40-7c4e216a87a5",
      "target": "64a0923c-f60d-480b-9d72-179fae567701",
      "label": "help"
    },
    {
      "id": "d58244d1-5ebe-41c1-af6d-c4fc7cc317bf",
      "type": "istar.ContributionLink",
      "source": "4dbf981e-b6bc-4be5-8723-1ab924c89701",
      "target": "64a0923c-f60d-480b-9d72-179fae567701",
      "label": "help"
    },
    {
      "id": "f9c43729-bd3d-42a9-a1f1-74cd7bce41d8",
      "type": "istar.ContributionLink",
      "source": "3ec03499-c906-4247-9f46-3360f3253aa7",
      "target": "1b3f65c7-7758-415b-aa07-02bac6754a3b",
      "label": "help"
    },
    {
      "id": "a7bcce9b-f122-4120-afa0-2674be0f0837",
      "type": "istar.ContributionLink",
      "source": "0a14ad8d-e348-4d92-ad6e-0af2e3186311",
      "target": "eeec819a-08dd-4ce2-982e-f306d8b8be7d",
      "label": "help"
    },
    {
      "id": "ae0e323a-4764-4243-b02e-ddf2a9992818",
      "type": "istar.ContributionLink",
      "source": "b193c93e-fde4-41ad-849d-dd83ea4be06d",
      "target": "03c2b4ce-5e02-43d7-ba11-f1e702fe84b2",
      "label": "help"
    },
    {
      "id": "127f2652-a072-4f27-8e93-2392b1c17337",
      "type": "istar.ContributionLink",
      "source": "e20c8fdf-2aaf-4dbe-b851-a3a22db140e5",
      "target": "b193c93e-fde4-41ad-849d-dd83ea4be06d",
      "label": "help"
    },
    {
      "id": "c72da6c2-c44b-4362-b6cb-753aaf25ac54",
      "type": "istar.ContributionLink",
      "source": "63b71008-ca82-431f-b36c-e652deb15bbd",
      "target": "b193c93e-fde4-41ad-849d-dd83ea4be06d",
      "label": "help"
    },
    {
      "id": "9a3d5600-fc24-476b-b73f-1eccdf165ef7",
      "type": "istar.ContributionLink",
      "source": "7c573472-6b17-407f-9b24-bc7cfb0301ea",
      "target": "b193c93e-fde4-41ad-849d-dd83ea4be06d",
      "label": "help"
    },
    {
      "id": "61d34b68-46a7-4f59-839f-62a95cd08bb4",
      "type": "istar.ContributionLink",
      "source": "fed1ee43-7d93-434c-a7f8-2ad9d4f6c4aa",
      "target": "f7e53ca4-a8b9-436c-9cf8-ae6a1318e609",
      "label": "make"
    },
    {
      "id": "37a6cdc1-f97d-4096-8cbb-0085e32b94c6",
      "type": "istar.ContributionLink",
      "source": "24670a09-7749-4557-b529-3aa9bd215a58",
      "target": "f7e53ca4-a8b9-436c-9cf8-ae6a1318e609",
      "label": "make"
    },
    {
      "id": "efd9f2d3-5952-476b-a499-d9afec4ee30a",
      "type": "istar.ContributionLink",
      "source": "9f7f74cc-ac0e-40a8-b0c0-651b893a367c",
      "target": "f7e53ca4-a8b9-436c-9cf8-ae6a1318e609",
      "label": "make"
    },
    {
      "id": "bb2f06fa-67b8-4f09-8593-b7e9d79c159f",
      "type": "istar.ContributionLink",
      "source": "2d6448e8-45fc-4e5e-8ebc-c59dec8b495c",
      "target": "864f5134-0d56-4802-98eb-4fc4474c006c",
      "label": "make"
    },
    {
      "id": "ea771481-cfca-4d9f-af00-a5d35bb6121a",
      "type": "istar.ContributionLink",
      "source": "f358eaff-6224-4d86-9dcc-316b180fd858",
      "target": "864f5134-0d56-4802-98eb-4fc4474c006c",
      "label": "make"
    },
    {
      "id": "5d37eb76-651f-44d2-9726-8eef12ca50d4",
      "type": "istar.ContributionLink",
      "source": "d7d7377e-6d03-49e0-882f-0f643f6f308d",
      "target": "864f5134-0d56-4802-98eb-4fc4474c006c",
      "label": "make"
    },
    {
      "id": "a395dd77-cea7-4739-a235-5b46073148f5",
      "type": "istar.ContributionLink",
      "source": "cd1131e7-1045-42b4-967d-eef99cfdcb9a",
      "target": "167bec28-6fdf-49d6-83ec-38e5faab2e79",
      "label": "make"
    },
    {
      "id": "988b1139-0607-49d7-b9c1-3e3df64cd7bc",
      "type": "istar.ContributionLink",
      "source": "05da66f4-ba51-4b4a-b2d3-6e2c38bbc89b",
      "target": "167bec28-6fdf-49d6-83ec-38e5faab2e79",
      "label": "make"
    },
    {
      "id": "ab04855b-4c04-4ceb-8180-b52c00082fc3",
      "type": "istar.ContributionLink",
      "source": "cbed3df9-d921-4dca-904e-7af504a39282",
      "target": "5eb20c50-7ade-45ef-acb6-41ee1615ff53",
      "label": "make"
    },
    {
      "id": "6e526590-3008-462a-a960-470103787247",
      "type": "istar.ContributionLink",
      "source": "73570810-c716-409e-9ae1-fbfd40e4fbcd",
      "target": "5eb20c50-7ade-45ef-acb6-41ee1615ff53",
      "label": "make"
    },
    {
      "id": "a09a6fa5-caa3-40ee-a597-fef3a60ccdcc",
      "type": "istar.ContributionLink",
      "source": "fad059d4-0569-4d41-8ef9-1d63cdf99aea",
      "target": "4581bc3c-97c4-4611-8202-7d0778d6eb3a",
      "label": "make"
    },
    {
      "id": "7ab34398-2ca1-48c3-97c1-22a53456f53e",
      "type": "istar.ContributionLink",
      "source": "2db76ff1-7738-4c4b-9760-3b71a725d7d9",
      "target": "4581bc3c-97c4-4611-8202-7d0778d6eb3a",
      "label": "make"
    },
    {
      "id": "73feb818-d559-4a83-acdf-a8f4a7a14dab",
      "type": "istar.ContributionLink",
      "source": "a0ab73ee-2f9c-4fc8-bf4c-9ef9da52ec04",
      "target": "3c38303c-f93e-4702-849f-0b13867107f4",
      "label": "make"
    },
    {
      "id": "33ba0580-233c-4cd1-bf21-a4944bf279b1",
      "type": "istar.ContributionLink",
      "source": "94b25ff7-4b3a-4076-a530-73a4603e55c4",
      "target": "fa2f6407-fc02-47ec-91c7-45378444152a",
      "label": "make"
    },
    {
      "id": "938d894b-1c25-4dcb-822b-e42ca06d93e9",
      "type": "istar.ContributionLink",
      "source": "5a26d3e1-4b37-4aba-8a1b-dc1e44134128",
      "target": "fa2f6407-fc02-47ec-91c7-45378444152a",
      "label": "make"
    },
    {
      "id": "7c500910-c0aa-4065-a30e-197e924a25ca",
      "type": "istar.ContributionLink",
      "source": "4b15afba-82a4-4cf4-abbc-4ea289c0e0ee",
      "target": "3cd29e77-5980-4d3d-8d16-1b1c30ac6f4a",
      "label": "make"
    },
    {
      "id": "64027886-bcea-4c9a-8baa-dde9fe7f2443",
      "type": "istar.ContributionLink",
      "source": "4c9087bc-c68f-4ec3-a8ac-061e0bb9d7cb",
      "target": "3cd29e77-5980-4d3d-8d16-1b1c30ac6f4a",
      "label": "make"
    },
    {
      "id": "e3362984-1f0d-493f-87fd-4bcd57b5bed6",
      "type": "istar.ContributionLink",
      "source": "8268ecd2-ab18-42ca-9682-3b607ca3ca0f",
      "target": "f97eabd4-2385-4d77-a0ec-494cd1965b2a",
      "label": "make"
    },
    {
      "id": "e7b0203c-373e-48bd-883c-ffc65336bf98",
      "type": "istar.ContributionLink",
      "source": "845f9680-80f8-4fc4-9ba9-54de03280e3d",
      "target": "f97eabd4-2385-4d77-a0ec-494cd1965b2a",
      "label": "make"
    },
    {
      "id": "d44062e1-e470-4e72-b933-42e0d2f8bf22",
      "type": "istar.ContributionLink",
      "source": "7d17913b-39e7-4429-8990-b387a2547012",
      "target": "f97eabd4-2385-4d77-a0ec-494cd1965b2a",
      "label": "make"
    },
    {
      "id": "f2575fc9-2e6d-40f7-aa4b-e1e2670f9607",
      "type": "istar.ContributionLink",
      "source": "1a004790-7d9b-4b79-997f-50af4b5b7522",
      "target": "dd374c94-76dc-4856-9d96-984b4aaf3b4d",
      "label": "make"
    },
    {
      "id": "a6c48052-30ae-40f5-9861-5443987eeee8",
      "type": "istar.ContributionLink",
      "source": "3d0f403f-2fa3-41fc-9d6e-0c2c94f67e86",
      "target": "dd374c94-76dc-4856-9d96-984b4aaf3b4d",
      "label": "make"
    },
    {
      "id": "c114a51c-13f1-40de-96ab-eac7c7f0ee4f",
      "type": "istar.ContributionLink",
      "source": "970d719e-959e-457b-bdf2-b6ba3ac01148",
      "target": "2465802a-69f5-47d5-8340-0c081631e7d8",
      "label": "help"
    },
    {
      "id": "6bc7f9f9-bc47-4eff-883f-b3593e9436ee",
      "type": "istar.ContributionLink",
      "source": "d07ee23b-ce40-4f28-9d31-72d4e4b9fe22",
      "target": "2465802a-69f5-47d5-8340-0c081631e7d8",
      "label": "help"
    },
    {
      "id": "0d8f2c7c-e2ac-4fff-b516-5f67e394cf9b",
      "type": "istar.ContributionLink",
      "source": "67c1fb69-fcce-4a0d-a207-007176bed655",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "486db67a-216e-4692-9780-517400c4d40f",
      "type": "istar.ContributionLink",
      "source": "4a282cb4-137b-4fa9-9285-4d5d7331a628",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "68b9c90c-5dd8-4a1e-84cc-c1ac9f3e2ec1",
      "type": "istar.ContributionLink",
      "source": "55a567f9-f0ec-4aaf-89ac-efeb9a0760f7",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "85bb510d-b232-417b-ad73-b38e5b4a9f29",
      "type": "istar.ContributionLink",
      "source": "711a5f01-8ade-4a55-9591-77982cc3f9a9",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "b55d9bcf-a449-496b-bf0b-e122f308a37f",
      "type": "istar.ContributionLink",
      "source": "3a25ebaa-33f7-40d5-9901-9ae4f3bc8c2b",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "96c988ba-7075-42aa-ba4a-e9acd8ddb92c",
      "type": "istar.ContributionLink",
      "source": "54080330-ac1d-4e65-8c40-785ba052ad1e",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "55d8c35c-e464-4118-ae22-4e3f1815b813",
      "type": "istar.ContributionLink",
      "source": "bb87c9d7-26ea-4baa-819c-29cd822339bf",
      "target": "5a3e5edf-e0da-4ba1-babf-6fee553a3350",
      "label": "make"
    },
    {
      "id": "205d4a68-45c5-4ad5-aa26-365902ec1014",
      "type": "istar.ContributionLink",
      "source": "691a6b3a-1e2e-4c13-ba0c-ccd38b75abb7",
      "target": "5a3e5edf-e0da-4ba1-babf-6fee553a3350",
      "label": "make"
    },
    {
      "id": "ff4b1add-15c0-4a04-82d9-b5928cb91a54",
      "type": "istar.ContributionLink",
      "source": "46f94fff-2515-4384-8893-86ea1a2c242c",
      "target": "5a3e5edf-e0da-4ba1-babf-6fee553a3350",
      "label": "make"
    },
    {
      "id": "db7cd75f-11f0-43a4-8a9a-aeae7cfd8ed9",
      "type": "istar.ContributionLink",
      "source": "5a3e5edf-e0da-4ba1-babf-6fee553a3350",
      "target": "1b3f65c7-7758-415b-aa07-02bac6754a3b",
      "label": "help"
    },
    {
      "id": "6193fcca-1e6b-44e9-8556-01d12303127c",
      "type": "istar.ContributionLink",
      "source": "a0940488-2fd8-4212-b5fc-98182d506034",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "b4a39eca-f6ef-4990-ad6b-a2a6791ec0dc",
      "type": "istar.ContributionLink",
      "source": "371db23b-9353-4639-8354-db223f82b062",
      "target": "e8184dc3-d178-406a-b57d-772c114ad35e",
      "label": "make"
    },
    {
      "id": "2b19a888-952f-4cec-b8ff-8fd96a4816fb",
      "type": "istar.ContributionLink",
      "source": "03c2b4ce-5e02-43d7-ba11-f1e702fe84b2",
      "target": "371db23b-9353-4639-8354-db223f82b062",
      "label": "make"
    },
    {
      "id": "fffbded1-7bac-4095-be09-6d64857e8173",
      "type": "istar.ContributionLink",
      "source": "612d30c7-da0f-415e-a410-a0235d6b35d5",
      "target": "371db23b-9353-4639-8354-db223f82b062",
      "label": "make"
    },
    {
      "id": "4dc57388-1004-4f02-a75d-3080cfa85cea",
      "type": "istar.ContributionLink",
      "source": "a6eefcb0-1ba7-4034-92c1-4ea02734b207",
      "target": "371db23b-9353-4639-8354-db223f82b062",
      "label": "make"
    },
    {
      "id": "0cc81405-8d0e-4db5-a073-b5cddd566d3b",
      "type": "istar.ContributionLink",
      "source": "8936a918-86d4-4ecd-bdb4-b9f6352397fe",
      "target": "e8184dc3-d178-406a-b57d-772c114ad35e",
      "label": "make"
    },
    {
      "id": "087bb32c-e3e7-4708-9702-e54d8453c834",
      "type": "istar.ContributionLink",
      "source": "6a026868-f913-4598-96db-c7840a02b347",
      "target": "8936a918-86d4-4ecd-bdb4-b9f6352397fe",
      "label": "make"
    },
    {
      "id": "e2e03f1c-3582-4865-9057-97630ae2328d",
      "type": "istar.ContributionLink",
      "source": "b5164407-de4a-433d-84af-1d935743ca39",
      "target": "8936a918-86d4-4ecd-bdb4-b9f6352397fe",
      "label": "make"
    },
    {
      "id": "db4b99aa-2570-4aec-b6f2-b8f42f5c217c",
      "type": "istar.ContributionLink",
      "source": "7fb89cce-3973-485d-9874-d35f108c4244",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "08468c7d-6091-45ca-b342-e7e1fe9af9b2",
      "type": "istar.ContributionLink",
      "source": "1136341d-8fca-400a-b235-97680a83ee36",
      "target": "7fb89cce-3973-485d-9874-d35f108c4244",
      "label": "help"
    },
    {
      "id": "2f82ce84-5ec4-4701-a38a-8a6f6b204ed5",
      "type": "istar.ContributionLink",
      "source": "02e3e90c-16ea-4cc0-9c70-3f502e374d53",
      "target": "7fb89cce-3973-485d-9874-d35f108c4244",
      "label": "help"
    },
    {
      "id": "66c0338a-54d3-48f6-83f0-5d79507390df",
      "type": "istar.ContributionLink",
      "source": "dd374c94-76dc-4856-9d96-984b4aaf3b4d",
      "target": "7fb89cce-3973-485d-9874-d35f108c4244",
      "label": "help"
    },
    {
      "id": "5013782a-3384-4188-96a1-06c26a7a5865",
      "type": "istar.ContributionLink",
      "source": "fa2f6407-fc02-47ec-91c7-45378444152a",
      "target": "7fb89cce-3973-485d-9874-d35f108c4244",
      "label": "help"
    },
    {
      "id": "c8bc2902-410f-4446-b5e6-09b6cace3ddd",
      "type": "istar.ContributionLink",
      "source": "9a56ac9f-8c9f-4885-b848-e84cc744ac11",
      "target": "7fb89cce-3973-485d-9874-d35f108c4244",
      "label": "help"
    },
    {
      "id": "51235184-fc53-48d4-8fe5-b6823d33de2b",
      "type": "istar.ContributionLink",
      "source": "29296aad-f0e7-44e3-bf4b-ace861749594",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "de1535fe-9003-4b6f-802b-23217ea112e8",
      "type": "istar.ContributionLink",
      "source": "1bebebfa-5a56-4b79-adff-d79162024e18",
      "target": "29296aad-f0e7-44e3-bf4b-ace861749594",
      "label": "help"
    },
    {
      "id": "79f90e89-e8ba-418d-a60e-bffd1900d344",
      "type": "istar.ContributionLink",
      "source": "f7e53ca4-a8b9-436c-9cf8-ae6a1318e609",
      "target": "5efc68f1-b1fa-4e0d-94ad-0d6932821214",
      "label": "help"
    },
    {
      "id": "70c87378-b045-4d49-a0f7-7347c7134395",
      "type": "istar.ContributionLink",
      "source": "5efc68f1-b1fa-4e0d-94ad-0d6932821214",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "6f7b91bc-f2b5-458c-b374-255ea8031882",
      "type": "istar.ContributionLink",
      "source": "89b06a7e-2fd6-4d66-a3ab-2a22e284b86f",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "13831ff5-e1c0-4381-b981-748a369ecb70",
      "type": "istar.ContributionLink",
      "source": "b308d564-fbe4-4013-875c-46068cba7305",
      "target": "89b06a7e-2fd6-4d66-a3ab-2a22e284b86f",
      "label": "help"
    },
    {
      "id": "510e4c9e-7d4a-421c-8234-c98b093fa81e",
      "type": "istar.ContributionLink",
      "source": "046e3089-0971-4c2f-bdca-8a8e3f3ea6b2",
      "target": "29296aad-f0e7-44e3-bf4b-ace861749594",
      "label": "help"
    },
    {
      "id": "65ecd17f-0f3c-4410-a6ee-a8173d403ef2",
      "type": "istar.ContributionLink",
      "source": "3c38303c-f93e-4702-849f-0b13867107f4",
      "target": "6700b366-f1ce-41a0-b2d4-6df55fdb98a0",
      "label": "help"
    },
    {
      "id": "2b43d047-f3ce-4cac-b0f6-5bc2348f4bc6",
      "type": "istar.ContributionLink",
      "source": "167bec28-6fdf-49d6-83ec-38e5faab2e79",
      "target": "fcfeba81-9605-4432-9306-1cac9c672d41",
      "label": "help"
    },
    {
      "id": "18ae0216-0aca-47c3-81a8-22e8141c5b3d",
      "type": "istar.ContributionLink",
      "source": "01aed92e-f210-4ff4-adb8-75d145f108d7",
      "target": "ae4d58f0-340c-4332-9fbf-1c8d607c0493",
      "label": "help"
    },
    {
      "id": "76e98976-f1ca-475d-93f4-e9f67f270bb4",
      "type": "istar.ContributionLink",
      "source": "ae4d58f0-340c-4332-9fbf-1c8d607c0493",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "12ff3b44-4ec4-4c2e-80ec-7838749a7f93",
      "type": "istar.ContributionLink",
      "source": "fcfeba81-9605-4432-9306-1cac9c672d41",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "72e08eee-d2d7-424e-a9a6-9945093fd52e",
      "type": "istar.ContributionLink",
      "source": "6700b366-f1ce-41a0-b2d4-6df55fdb98a0",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "dff1e820-9a46-4e43-8f09-4e3428ec7547",
      "type": "istar.ContributionLink",
      "source": "864f5134-0d56-4802-98eb-4fc4474c006c",
      "target": "26a6672e-91b3-4a7e-9431-0e51f94a7319",
      "label": "help"
    },
    {
      "id": "a9ca4ca7-5f1a-4f4f-8ae5-20dd3fda5426",
      "type": "istar.ContributionLink",
      "source": "26a6672e-91b3-4a7e-9431-0e51f94a7319",
      "target": "b5164407-de4a-433d-84af-1d935743ca39",
      "label": "help"
    },
    {
      "id": "94019b2d-7815-4287-a154-11649cf6c336",
      "type": "istar.ContributionLink",
      "source": "5eb20c50-7ade-45ef-acb6-41ee1615ff53",
      "target": "1530d033-22a3-44fe-aad5-7a11d95c00c7",
      "label": "help"
    },
    {
      "id": "4fbdf0f3-be82-41f8-8aa5-dcc35a1ccc32",
      "type": "istar.ContributionLink",
      "source": "1530d033-22a3-44fe-aad5-7a11d95c00c7",
      "target": "b5164407-de4a-433d-84af-1d935743ca39",
      "label": "help"
    },
    {
      "id": "bc550a20-5268-473b-9013-5e7b6a598bb5",
      "type": "istar.ContributionLink",
      "source": "f97eabd4-2385-4d77-a0ec-494cd1965b2a",
      "target": "9d76facd-beeb-4238-9212-e6a36ec2afe3",
      "label": "help"
    },
    {
      "id": "880920f7-3732-4d81-8be6-f78796c192f4",
      "type": "istar.ContributionLink",
      "source": "9d76facd-beeb-4238-9212-e6a36ec2afe3",
      "target": "b5164407-de4a-433d-84af-1d935743ca39",
      "label": "help"
    },
    {
      "id": "de692a0b-c351-4986-a67a-6fea2692f072",
      "type": "istar.ContributionLink",
      "source": "3cd29e77-5980-4d3d-8d16-1b1c30ac6f4a",
      "target": "1530d033-22a3-44fe-aad5-7a11d95c00c7",
      "label": "help"
    },
    {
      "id": "c258064c-bf5d-4829-b6bc-40480213f656",
      "type": "istar.ContributionLink",
      "source": "4581bc3c-97c4-4611-8202-7d0778d6eb3a",
      "target": "29296aad-f0e7-44e3-bf4b-ace861749594",
      "label": "help"
    }
  ],
  "display": {
    "e8184dc3-d178-406a-b57d-772c114ad35e": {
      "backgroundColor": "#9CFA9A"
    },
    "a6eefcb0-1ba7-4034-92c1-4ea02734b207": {
      "backgroundColor": "#5BA9FA"
    },
    "03c2b4ce-5e02-43d7-ba11-f1e702fe84b2": {
      "backgroundColor": "#FA3D68"
    },
    "612d30c7-da0f-415e-a410-a0235d6b35d5": {
      "backgroundColor": "#4BA745"
    },
    "01aed92e-f210-4ff4-adb8-75d145f108d7": {
      "backgroundColor": "#53A8A0"
    },
    "4b15afba-82a4-4cf4-abbc-4ea289c0e0ee": {
      "backgroundColor": "#8B848D"
    },
    "4c9087bc-c68f-4ec3-a8ac-061e0bb9d7cb": {
      "backgroundColor": "#8b848d"
    },
    "64bea084-6f49-4c16-b242-ff48166939fa": {
      "backgroundColor": "#5BA9FA"
    },
    "691a6b3a-1e2e-4c13-ba0c-ccd38b75abb7": {
      "backgroundColor": "#5BA9FA"
    },
    "cbed3df9-d921-4dca-904e-7af504a39282": {
      "backgroundColor": "#8B848D"
    },
    "2d6448e8-45fc-4e5e-8ebc-c59dec8b495c": {
      "backgroundColor": "#8B848D"
    },
    "a0940488-2fd8-4212-b5fc-98182d506034": {
      "backgroundColor": "#4BA745"
    },
    "4a282cb4-137b-4fa9-9285-4d5d7331a628": {
      "backgroundColor": "#4BA745"
    },
    "67c1fb69-fcce-4a0d-a207-007176bed655": {
      "backgroundColor": "#4BA745"
    },
    "c8649c6a-a902-4a25-8148-9de3fd6973ca": {
      "backgroundColor": "#FA3D68"
    },
    "2465802a-69f5-47d5-8340-0c081631e7d8": {
      "backgroundColor": "#FA3D68"
    },
    "1b3f65c7-7758-415b-aa07-02bac6754a3b": {
      "backgroundColor": "#5BA9FA"
    },
    "c190cd69-a2e3-4f08-a15d-cd2a36dac918": {
      "backgroundColor": "#4BA745"
    },
    "eeec819a-08dd-4ce2-982e-f306d8b8be7d": {
      "backgroundColor": "#5BA9FA"
    },
    "de3dbc5f-71f1-41e8-9302-55d10f4db56e": {
      "backgroundColor": "#4BA745"
    },
    "a6ad5628-37b9-4d7e-8193-9325cebaf503": {
      "backgroundColor": "#FA3D68"
    },
    "7c573472-6b17-407f-9b24-bc7cfb0301ea": {
      "backgroundColor": "#FA3D68"
    },
    "8268ecd2-ab18-42ca-9682-3b607ca3ca0f": {
      "backgroundColor": "#8B848D"
    },
    "139d8c8c-bd8d-4075-9b25-e146ba4b54b8": {
      "backgroundColor": "#FA3D68"
    },
    "2a46a9bb-93b7-447f-97d7-74b219fe993e": {
      "backgroundColor": "#FA3D68"
    },
    "c5b39ab4-36d2-425c-8b28-6488e3d6d05f": {
      "backgroundColor": "#FA3D68",
      "width": 93.63787841796875,
      "height": 60.85003662109375
    },
    "63b71008-ca82-431f-b36c-e652deb15bbd": {
      "backgroundColor": "#FA3D68"
    },
    "e20c8fdf-2aaf-4dbe-b851-a3a22db140e5": {
      "backgroundColor": "#FA3D68"
    },
    "970d719e-959e-457b-bdf2-b6ba3ac01148": {
      "backgroundColor": "#FA3D68"
    },
    "d07ee23b-ce40-4f28-9d31-72d4e4b9fe22": {
      "backgroundColor": "#FA3D68"
    },
    "9ed715b8-3b93-4e25-bf7e-d245ce857e3f": {
      "backgroundColor": "#FA3D68"
    },
    "0ee2994e-be3a-459f-b273-ebef320919ac": {
      "backgroundColor": "#FA3D68"
    },
    "cd1131e7-1045-42b4-967d-eef99cfdcb9a": {
      "backgroundColor": "#53A8A0"
    },
    "7d17913b-39e7-4429-8990-b387a2547012": {
      "backgroundColor": "#8B848D"
    },
    "29ffb304-791a-4fa0-84cf-36db3507902e": {
      "backgroundColor": "#4BA745"
    },
    "55a567f9-f0ec-4aaf-89ac-efeb9a0760f7": {
      "backgroundColor": "#4BA745"
    },
    "f358eaff-6224-4d86-9dcc-316b180fd858": {
      "backgroundColor": "#8B848D"
    },
    "711a5f01-8ade-4a55-9591-77982cc3f9a9": {
      "backgroundColor": "#4BA745"
    },
    "54080330-ac1d-4e65-8c40-785ba052ad1e": {
      "backgroundColor": "#4BA745"
    },
    "3a25ebaa-33f7-40d5-9901-9ae4f3bc8c2b": {
      "backgroundColor": "#4BA745"
    },
    "9d3b1228-fed9-4f1c-ac09-ee06306e4568": {
      "backgroundColor": "#4BA745"
    },
    "f7e53ca4-a8b9-436c-9cf8-ae6a1318e609": {
      "backgroundColor": "#53A8A0"
    },
    "5760baa5-ec78-4ebd-a39d-2435974abab4": {
      "backgroundColor": "#4BA745"
    },
    "bdafcec0-5501-4295-bcd4-e4f8f4dc0450": {
      "backgroundColor": "#4BA745"
    },
    "1f67e6d2-5893-44d5-bb8d-417066a692c2": {
      "backgroundColor": "#4BA745"
    },
    "8827598f-a772-41a1-a7ab-75161321d298": {
      "backgroundColor": "#4BA745"
    },
    "a49a0928-c175-4de8-a265-e454c07ff869": {
      "backgroundColor": "#4BA745",
      "width": 109.64208984375,
      "height": 56.849609375
    },
    "d7d7377e-6d03-49e0-882f-0f643f6f308d": {
      "backgroundColor": "#8B848D"
    },
    "a0ab73ee-2f9c-4fc8-bf4c-9ef9da52ec04": {
      "backgroundColor": "#53A8A0"
    },
    "73570810-c716-409e-9ae1-fbfd40e4fbcd": {
      "backgroundColor": "#8B848D"
    },
    "6259981d-f01a-4807-8142-42198c333040": {
      "backgroundColor": "#4BA745"
    },
    "7986c628-5f41-4945-968c-5cba8449a864": {
      "backgroundColor": "#4BA745"
    },
    "6ec39b7c-5390-454b-bb50-f8e405af7ca8": {
      "backgroundColor": "#4BA745"
    },
    "77543c0e-fbcb-465c-b9bc-faea62f551f0": {
      "backgroundColor": "#4BA745"
    },
    "f97eabd4-2385-4d77-a0ec-494cd1965b2a": {
      "backgroundColor": "#8B848D"
    },
    "70184dcb-6b85-47d1-81d9-3cb390fd4b85": {
      "backgroundColor": "#4BA745",
      "width": 100.639404296875,
      "height": 57.8497314453125
    },
    "6fa86e32-c1b7-43fb-8f78-74ab4d3b6dd4": {
      "backgroundColor": "#4BA745"
    },
    "3d0f403f-2fa3-41fc-9d6e-0c2c94f67e86": {
      "backgroundColor": "#53A8A0"
    },
    "2b03c9af-bcbc-490c-9665-36b1e80b5ced": {
      "backgroundColor": "#5BA9FA"
    },
    "fed1ee43-7d93-434c-a7f8-2ad9d4f6c4aa": {
      "backgroundColor": "#53A8A0"
    },
    "06d4a13e-0ff7-4fb4-8f69-29d1a7019858": {
      "backgroundColor": "#5BA9FA"
    },
    "4dbf981e-b6bc-4be5-8723-1ab924c89701": {
      "backgroundColor": "#5BA9FA"
    },
    "879dfd8c-d882-4cff-bf40-7c4e216a87a5": {
      "backgroundColor": "#5BA9FA"
    },
    "bb87c9d7-26ea-4baa-819c-29cd822339bf": {
      "backgroundColor": "#5BA9FA"
    },
    "eddbfdd0-45b7-4546-877c-c87a069ac825": {
      "backgroundColor": "#5BA9FA"
    },
    "4581bc3c-97c4-4611-8202-7d0778d6eb3a": {
      "backgroundColor": "#53A8A0"
    },
    "3c38303c-f93e-4702-849f-0b13867107f4": {
      "backgroundColor": "#53A8A0"
    },
    "3ec03499-c906-4247-9f46-3360f3253aa7": {
      "backgroundColor": "#5BA9FA"
    },
    "2db76ff1-7738-4c4b-9760-3b71a725d7d9": {
      "backgroundColor": "#53A8A0"
    },
    "0a14ad8d-e348-4d92-ad6e-0af2e3186311": {
      "backgroundColor": "#5BA9FA"
    },
    "46f94fff-2515-4384-8893-86ea1a2c242c": {
      "backgroundColor": "#5BA9FA"
    },
    "64a0923c-f60d-480b-9d72-179fae567701": {
      "backgroundColor": "#5BA9FA",
      "width": 99.63916015625,
      "height": 61.35009765625
    },
    "ce5c217c-bf4c-4e59-b6c1-b4cb9180f2d3": {
      "backgroundColor": "#5BA9FA",
      "width": 106.64111328125,
      "height": 56.349609375
    },
    "5eb20c50-7ade-45ef-acb6-41ee1615ff53": {
      "backgroundColor": "#8B848D"
    },
    "3cd29e77-5980-4d3d-8d16-1b1c30ac6f4a": {
      "backgroundColor": "#8B848D"
    },
    "b193c93e-fde4-41ad-849d-dd83ea4be06d": {
      "backgroundColor": "#FA3D68"
    },
    "1a004790-7d9b-4b79-997f-50af4b5b7522": {
      "backgroundColor": "#53A8A0",
      "width": 93.637939453125,
      "height": 54.849365234375
    },
    "fa2f6407-fc02-47ec-91c7-45378444152a": {
      "backgroundColor": "#53A8A0",
      "width": 98.638671875,
      "height": 58.849853515625
    },
    "fad059d4-0569-4d41-8ef9-1d63cdf99aea": {
      "backgroundColor": "#53A8A0"
    },
    "5a26d3e1-4b37-4aba-8a1b-dc1e44134128": {
      "backgroundColor": "#53A8A0"
    },
    "864f5134-0d56-4802-98eb-4fc4474c006c": {
      "backgroundColor": "#8B848D"
    },
    "94b25ff7-4b3a-4076-a530-73a4603e55c4": {
      "backgroundColor": "#53A8A0"
    },
    "845f9680-80f8-4fc4-9ba9-54de03280e3d": {
      "backgroundColor": "#8B848D"
    },
    "9f7f74cc-ac0e-40a8-b0c0-651b893a367c": {
      "backgroundColor": "#53A8A0"
    },
    "24670a09-7749-4557-b529-3aa9bd215a58": {
      "backgroundColor": "#53A8A0"
    },
    "02e3e90c-16ea-4cc0-9c70-3f502e374d53": {
      "backgroundColor": "#53A8A0"
    },
    "167bec28-6fdf-49d6-83ec-38e5faab2e79": {
      "backgroundColor": "#53A8A0"
    },
    "b308d564-fbe4-4013-875c-46068cba7305": {
      "backgroundColor": "#53A8A0"
    },
    "1bebebfa-5a56-4b79-adff-d79162024e18": {
      "backgroundColor": "#53A8A0"
    },
    "046e3089-0971-4c2f-bdca-8a8e3f3ea6b2": {
      "backgroundColor": "#53A8A0"
    },
    "9a56ac9f-8c9f-4885-b848-e84cc744ac11": {
      "backgroundColor": "#53A8A0"
    },
    "1136341d-8fca-400a-b235-97680a83ee36": {
      "backgroundColor": "#53A8A0"
    },
    "05da66f4-ba51-4b4a-b2d3-6e2c38bbc89b": {
      "backgroundColor": "#53A8A0"
    },
    "dd374c94-76dc-4856-9d96-984b4aaf3b4d": {
      "backgroundColor": "#53A8A0"
    },
    "5a3e5edf-e0da-4ba1-babf-6fee553a3350": {
      "backgroundColor": "#5BA9FA"
    },
    "371db23b-9353-4639-8354-db223f82b062": {
      "backgroundColor": "#FFFFFF"
    },
    "8936a918-86d4-4ecd-bdb4-b9f6352397fe": {
      "backgroundColor": "#FFFFFF",
      "width": 113.6435546875,
      "height": 56.349578857421875
    },
    "6a026868-f913-4598-96db-c7840a02b347": {
      "backgroundColor": "#53A8A0",
      "width": 107.6416015625,
      "height": 58.849853515625
    },
    "b5164407-de4a-433d-84af-1d935743ca39": {
      "backgroundColor": "#8B848D",
      "width": 119.64501953125,
      "height": 62.3502197265625
    },
    "7fb89cce-3973-485d-9874-d35f108c4244": {
      "backgroundColor": "#53A8A0",
      "width": 103.64013671875,
      "height": 60.85003662109375
    },
    "29296aad-f0e7-44e3-bf4b-ace861749594": {
      "backgroundColor": "#53A8A0"
    },
    "5efc68f1-b1fa-4e0d-94ad-0d6932821214": {
      "backgroundColor": "#53A8A0"
    },
    "89b06a7e-2fd6-4d66-a3ab-2a22e284b86f": {
      "backgroundColor": "#53A8A0"
    },
    "6700b366-f1ce-41a0-b2d4-6df55fdb98a0": {
      "backgroundColor": "#53A8A0"
    },
    "fcfeba81-9605-4432-9306-1cac9c672d41": {
      "backgroundColor": "#53A8A0",
      "width": 102.6396484375,
      "height": 61.35009765625
    },
    "ae4d58f0-340c-4332-9fbf-1c8d607c0493": {
      "backgroundColor": "#53A8A0"
    },
    "26a6672e-91b3-4a7e-9431-0e51f94a7319": {
      "backgroundColor": "#8B848D"
    },
    "1530d033-22a3-44fe-aad5-7a11d95c00c7": {
      "backgroundColor": "#8B848D"
    },
    "9d76facd-beeb-4238-9212-e6a36ec2afe3": {
      "backgroundColor": "#8B848D"
    }
  },
  "tool": "pistar.2.0.0",
  "istar": "2.0",
  "saveDate": "Mon, 26 Aug 2024 16:07:52 GMT",
  "diagram": {
    "width": 7300,
    "height": 1100,
    "name": "Sustainability catalog",
    "customProperties": {
      "Description": "Welcome to the pistar sustainability plugin! This model is the sustainability catalog."
    }
  }
}





