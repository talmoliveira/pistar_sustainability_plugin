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

  $("#refinements-list").empty();

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
          
          $("#refinements-list ").append(`
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
  "Confidentiality": "The system ensures that data are accessible only to those authorized to have access. Additionally, data should not be used for negative reporting, but only for improving efficiency",
  "Usability": "Degree to which a product or system provides the features that required to be usable in which the product or system can be reused to protect the environment (Environmental) degree to which a product or system provides the effectiveness and efficiency in a specified context of use to increase productivity and reduces costs (Economic) degree to which a product or system provides the features of software that enable user participation, accessibility and satisfaction in a specified context of use (Social)",
  "Risk mitigation": "System mitigates the potential risk to financial status in the intended contexts of use\n System mitigates the potential risk to property or the environment in the intended contexts of use\n System mitigates the potential risk to people in the intended contexts of use",
  "Recoverability": "In the event of an interruption or a failure, the data can be recovered and the desired state of the system is re-established",
  "Functional appropriateness/suitability": "The functions facilitate the accomplishment of specified tasks and objectives. System provides the correct results with the needed degree of precision.",
  "Functional correctness": "System provides the correct results with the needed degree of precision",
  "Business improvement/growth": "The improvements to the business naturally focus on increasing the profitability and efficiency of the company, thereby achieving a greater economic sustainability of the organisation",
  "Maintainability/longevity/supportability": "System can be effectively and efficiently modified without introducing defects or degrading existing product quality degree to which a product or system provides the features of effectiveness and efficiency in which the tasks/functions support energy efficiency degree to which a product or system can be reused, modified, changed and tested with the lower cost of maintenance",
  "Replaceability": "Product can be replaced by another specified software product for the same purpose in the same environment.",
  "Compatibility": "Degree to which a product or system provides the features of data formats and protocol can exchangeable with two or more systems, products and components which can control the cost of investment degree to which a product or system provides the required functions efficiently while sharing common environment and resources with other product without detrimental impact on any other products degree to which a product or system provides the features of data formats and protocol can exchangeable with two or more systems, products and components which can control the cost of investment",
  "Reliability": "Degree to which a product or system provides the features to perform the specified functions for a specified period of time to avoid waste of unreliable tasks/functions degree to which a product or system provides the features to predict and control the faults that caused of higher investment degree to which a product or system provides the features in which a system, product or component is operational and accessible when required for use capacity of a product to perform specified functions for a specified period of time, under specified conditions.",
  "Security": "Degree to which a product or system provides the features to ensure the information and data have the legal accessibility and authorization degree to which a product or system provides the features in protecting information and data to reduce risk of capital value in long term profit degree to which a product or system provides the features to secure accessibility, participation and trustworthiness when using software",
  "Portability": "Degree to which a product or system provides the features of adaptable and transferrable with effectively and efficiently to decrease the software investments degree to which a product or system can effectively and efficiently be adapted and transferred from one hardware, software or other operational from one environment to another degree to which a product or system provides the satisfaction to the users with the features of adaptable and transferable actions",
  "Extensibility": "The effort required to implement the extension.",
  "Interoperability": "Capability of the system to couple software systems together.",
  "Co-existence": "The product can perform its functions efficiently while sharing its environment and resources with other products",
  "Availability": "The system is able to function during “normal operating times” ability of the user to access resources in a sustainable environment (?)",
  "Usefulness": "User is satisfied with their perceived achievement of pragmatic goals.",
  "Greenability": "The degree to which a product energy and the resources are optimised, and the product can be used over a long period. This main characteristic includes energy efficiency, resource optimisation, capacity optimisation, and perdurability sub-characteristics.",
  "Functional suitability": "Degree to which a product or system provides the minimal impacts, in which the function performed the accurate result to avoid waste due to the un-functional of computing resources degree to which a product or system provides the accurate function or tasks to minimize the cost of development degree to which a product or system provides the accurate functions or tasks to support the reasonable and acceptable outcomes to achieve the specified intended objective",
  "Impactibility": "Acceptance towards environment impacts with focused on the way of software is created, used, maintained and disposed with minimal impacts on environment acceptance towards economic impacts in developing software with lower cost of development and maintenance to survive acceptance towards social impacts of user and software functions are connectedness to each other to satisfy on using a product or system",
  "Perdurability": "Perdurability is the idea of producing sustainable software security products that have longevity and are adaptable and recyclable, i.e., increasing those aspects that make the software last for long time with the ability to adapt to change without losing its functionality related to its quality",
  "Freedom from risk": "Mitigation of the potential risk to people",
  "Agency": "The ability to act in an environment"
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
          "x": 2905,
          "y": 789,
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
          "id": "945614bb-3efc-47d6-b25d-551ebabaa94d",
          "text": "Context coverage",
          "type": "istar.Quality",
          "x": 2770,
          "y": 790,
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
      "id": "a7e6d748-56ed-4701-9232-e7b092df2c31",
      "type": "istar.ContributionLink",
      "source": "1b3f65c7-7758-415b-aa07-02bac6754a3b",
      "target": "a6eefcb0-1ba7-4034-92c1-4ea02734b207",
      "label": "help"
    },
    {
      "id": "6df807f0-df0c-437b-bc76-23a5e797a1d6",
      "type": "istar.ContributionLink",
      "source": "c190cd69-a2e3-4f08-a15d-cd2a36dac918",
      "target": "612d30c7-da0f-415e-a410-a0235d6b35d5",
      "label": "help"
    },
    {
      "id": "b2dde580-2489-4360-beac-278b0dca21e9",
      "type": "istar.ContributionLink",
      "source": "eeec819a-08dd-4ce2-982e-f306d8b8be7d",
      "target": "a6eefcb0-1ba7-4034-92c1-4ea02734b207",
      "label": "help"
    },
    {
      "id": "36438edb-6e7e-45f6-b3f2-b4ed8b889a89",
      "type": "istar.ContributionLink",
      "source": "de3dbc5f-71f1-41e8-9302-55d10f4db56e",
      "target": "612d30c7-da0f-415e-a410-a0235d6b35d5",
      "label": "help"
    },
    {
      "id": "2e46c138-5c0f-45c7-b291-611aa6303af1",
      "type": "istar.ContributionLink",
      "source": "a6ad5628-37b9-4d7e-8193-9325cebaf503",
      "target": "03c2b4ce-5e02-43d7-ba11-f1e702fe84b2",
      "label": "help"
    },
    {
      "id": "8850f5f0-88ed-41be-bc54-faafe5c8e047",
      "type": "istar.ContributionLink",
      "source": "2465802a-69f5-47d5-8340-0c081631e7d8",
      "target": "a6ad5628-37b9-4d7e-8193-9325cebaf503",
      "label": "help"
    },
    {
      "id": "b2359360-4ac5-45ce-b64b-2237a6fc1f0b",
      "type": "istar.ContributionLink",
      "source": "9ed715b8-3b93-4e25-bf7e-d245ce857e3f",
      "target": "03c2b4ce-5e02-43d7-ba11-f1e702fe84b2",
      "label": "help"
    },
    {
      "id": "99a94864-8dc1-4fc0-88f5-0c4d5866db77",
      "type": "istar.ContributionLink",
      "source": "c5b39ab4-36d2-425c-8b28-6488e3d6d05f",
      "target": "9ed715b8-3b93-4e25-bf7e-d245ce857e3f",
      "label": "help"
    },
    {
      "id": "0ce3e839-30fc-4154-9754-d42731814211",
      "type": "istar.ContributionLink",
      "source": "0ee2994e-be3a-459f-b273-ebef320919ac",
      "target": "03c2b4ce-5e02-43d7-ba11-f1e702fe84b2",
      "label": "help"
    },
    {
      "id": "ed3608d8-6cdc-40e6-8659-22e10a0d66aa",
      "type": "istar.ContributionLink",
      "source": "c8649c6a-a902-4a25-8148-9de3fd6973ca",
      "target": "0ee2994e-be3a-459f-b273-ebef320919ac",
      "label": "help"
    },
    {
      "id": "e9ab048e-bbae-4f75-8ba5-6935c5b2022a",
      "type": "istar.ContributionLink",
      "source": "139d8c8c-bd8d-4075-9b25-e146ba4b54b8",
      "target": "9ed715b8-3b93-4e25-bf7e-d245ce857e3f",
      "label": "help"
    },
    {
      "id": "1c2f58db-0d3a-4e6b-afac-5dae6118731e",
      "type": "istar.ContributionLink",
      "source": "2a46a9bb-93b7-447f-97d7-74b219fe993e",
      "target": "9ed715b8-3b93-4e25-bf7e-d245ce857e3f",
      "label": "help"
    },
    {
      "id": "4c61a2a0-e7b5-4b3c-8b3a-f83fbf5a517d",
      "type": "istar.ContributionLink",
      "source": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "target": "612d30c7-da0f-415e-a410-a0235d6b35d5",
      "label": "help"
    },
    {
      "id": "167eb662-d450-4f32-909b-51ffa63e2331",
      "type": "istar.ContributionLink",
      "source": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "target": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "label": "help"
    },
    {
      "id": "f6b3d725-046e-4b8f-be12-7c0f625efc21",
      "type": "istar.ContributionLink",
      "source": "1f67e6d2-5893-44d5-bb8d-417066a692c2",
      "target": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "label": "help"
    },
    {
      "id": "16b91def-1556-4b89-a5d0-560caac3af32",
      "type": "istar.ContributionLink",
      "source": "8827598f-a772-41a1-a7ab-75161321d298",
      "target": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "label": "help"
    },
    {
      "id": "3fe2ab3f-6ad4-4f1a-9dd8-95be799ebb04",
      "type": "istar.ContributionLink",
      "source": "9d3b1228-fed9-4f1c-ac09-ee06306e4568",
      "target": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "label": "help"
    },
    {
      "id": "b3e4f331-49fc-4e23-90a2-7df02f3bfa20",
      "type": "istar.ContributionLink",
      "source": "29ffb304-791a-4fa0-84cf-36db3507902e",
      "target": "c190cd69-a2e3-4f08-a15d-cd2a36dac918",
      "label": "help"
    },
    {
      "id": "28756989-1ae8-4e08-ac3f-ed4d31e256e4",
      "type": "istar.ContributionLink",
      "source": "bdafcec0-5501-4295-bcd4-e4f8f4dc0450",
      "target": "c190cd69-a2e3-4f08-a15d-cd2a36dac918",
      "label": "help"
    },
    {
      "id": "1fe4f49f-1de7-4ac3-8c90-9bfe991bd036",
      "type": "istar.ContributionLink",
      "source": "a49a0928-c175-4de8-a265-e454c07ff869",
      "target": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "label": "help"
    },
    {
      "id": "46d923ff-87ea-4beb-8a59-82a84cfa03c1",
      "type": "istar.ContributionLink",
      "source": "6fa86e32-c1b7-43fb-8f78-74ab4d3b6dd4",
      "target": "612d30c7-da0f-415e-a410-a0235d6b35d5",
      "label": "help"
    },
    {
      "id": "235fae0f-12f9-4314-b65d-fff8711432e8",
      "type": "istar.ContributionLink",
      "source": "6ec39b7c-5390-454b-bb50-f8e405af7ca8",
      "target": "6fa86e32-c1b7-43fb-8f78-74ab4d3b6dd4",
      "label": "help"
    },
    {
      "id": "e2d53ba3-ddd0-4261-9afe-4ea4aecdd793",
      "type": "istar.ContributionLink",
      "source": "6259981d-f01a-4807-8142-42198c333040",
      "target": "70184dcb-6b85-47d1-81d9-3cb390fd4b85",
      "label": "help"
    },
    {
      "id": "b341e297-1892-4b9f-adec-98b31ef8b28a",
      "type": "istar.ContributionLink",
      "source": "77543c0e-fbcb-465c-b9bc-faea62f551f0",
      "target": "c190cd69-a2e3-4f08-a15d-cd2a36dac918",
      "label": "help"
    },
    {
      "id": "fbf6cbf1-908d-49ca-8ca4-b7d6d06d7c31",
      "type": "istar.ContributionLink",
      "source": "7986c628-5f41-4945-968c-5cba8449a864",
      "target": "de3dbc5f-71f1-41e8-9302-55d10f4db56e",
      "label": "help"
    },
    {
      "id": "486bdf55-f56e-4167-b0b1-8d7c2b0e958b",
      "type": "istar.ContributionLink",
      "source": "64bea084-6f49-4c16-b242-ff48166939fa",
      "target": "1b3f65c7-7758-415b-aa07-02bac6754a3b",
      "label": "help"
    },
    {
      "id": "d0d6820d-b3d2-4a90-9279-e220b50ac894",
      "type": "istar.ContributionLink",
      "source": "64a0923c-f60d-480b-9d72-179fae567701",
      "target": "a6eefcb0-1ba7-4034-92c1-4ea02734b207",
      "label": "help"
    },
    {
      "id": "64feae62-4ab7-4a14-be7b-9435379582ec",
      "type": "istar.ContributionLink",
      "source": "06d4a13e-0ff7-4fb4-8f69-29d1a7019858",
      "target": "64a0923c-f60d-480b-9d72-179fae567701",
      "label": "help"
    },
    {
      "id": "71718e15-f7ae-43c5-b28e-7f3ae1908e14",
      "type": "istar.ContributionLink",
      "source": "ce5c217c-bf4c-4e59-b6c1-b4cb9180f2d3",
      "target": "a6eefcb0-1ba7-4034-92c1-4ea02734b207",
      "label": "help"
    },
    {
      "id": "089a00c3-db3c-49c8-86bb-6fda1461e8ce",
      "type": "istar.ContributionLink",
      "source": "eddbfdd0-45b7-4546-877c-c87a069ac825",
      "target": "ce5c217c-bf4c-4e59-b6c1-b4cb9180f2d3",
      "label": "help"
    },
    {
      "id": "d80b765c-d009-48a5-af27-afc085fb53e8",
      "type": "istar.ContributionLink",
      "source": "2b03c9af-bcbc-490c-9665-36b1e80b5ced",
      "target": "1b3f65c7-7758-415b-aa07-02bac6754a3b",
      "label": "help"
    },
    {
      "id": "c6e68f0c-2889-4789-97cf-bd5df3aa65c4",
      "type": "istar.ContributionLink",
      "source": "879dfd8c-d882-4cff-bf40-7c4e216a87a5",
      "target": "64a0923c-f60d-480b-9d72-179fae567701",
      "label": "help"
    },
    {
      "id": "c30a3423-d5e1-48ad-a2f0-33cdf0489fc5",
      "type": "istar.ContributionLink",
      "source": "4dbf981e-b6bc-4be5-8723-1ab924c89701",
      "target": "64a0923c-f60d-480b-9d72-179fae567701",
      "label": "help"
    },
    {
      "id": "8e5f082f-9d16-4da0-9bc6-ed640f86cfb0",
      "type": "istar.ContributionLink",
      "source": "3ec03499-c906-4247-9f46-3360f3253aa7",
      "target": "1b3f65c7-7758-415b-aa07-02bac6754a3b",
      "label": "help"
    },
    {
      "id": "58489176-ab23-4bd6-b1fb-c6123a566591",
      "type": "istar.ContributionLink",
      "source": "0a14ad8d-e348-4d92-ad6e-0af2e3186311",
      "target": "eeec819a-08dd-4ce2-982e-f306d8b8be7d",
      "label": "help"
    },
    {
      "id": "32338a3b-9e60-44ce-a93d-7e72461527bb",
      "type": "istar.ContributionLink",
      "source": "945614bb-3efc-47d6-b25d-551ebabaa94d",
      "target": "eeec819a-08dd-4ce2-982e-f306d8b8be7d",
      "label": "help"
    },
    {
      "id": "681afe9d-ca32-43aa-a3a4-731897c8e116",
      "type": "istar.ContributionLink",
      "source": "b193c93e-fde4-41ad-849d-dd83ea4be06d",
      "target": "03c2b4ce-5e02-43d7-ba11-f1e702fe84b2",
      "label": "help"
    },
    {
      "id": "80099459-c265-4827-8c93-7d67e854219e",
      "type": "istar.ContributionLink",
      "source": "e20c8fdf-2aaf-4dbe-b851-a3a22db140e5",
      "target": "b193c93e-fde4-41ad-849d-dd83ea4be06d",
      "label": "help"
    },
    {
      "id": "0c47c4ef-776d-40af-ac7c-60f5bb123781",
      "type": "istar.ContributionLink",
      "source": "63b71008-ca82-431f-b36c-e652deb15bbd",
      "target": "b193c93e-fde4-41ad-849d-dd83ea4be06d",
      "label": "help"
    },
    {
      "id": "33198820-7dd8-4055-95de-78fa2d367d49",
      "type": "istar.ContributionLink",
      "source": "7c573472-6b17-407f-9b24-bc7cfb0301ea",
      "target": "b193c93e-fde4-41ad-849d-dd83ea4be06d",
      "label": "help"
    },
    {
      "id": "209b8192-28f4-4cbd-a177-1cade2749ce6",
      "type": "istar.ContributionLink",
      "source": "fed1ee43-7d93-434c-a7f8-2ad9d4f6c4aa",
      "target": "f7e53ca4-a8b9-436c-9cf8-ae6a1318e609",
      "label": "make"
    },
    {
      "id": "8ea44469-3347-465f-af69-f85f97c99fab",
      "type": "istar.ContributionLink",
      "source": "24670a09-7749-4557-b529-3aa9bd215a58",
      "target": "f7e53ca4-a8b9-436c-9cf8-ae6a1318e609",
      "label": "make"
    },
    {
      "id": "f215ca96-54b9-4e2f-8b8f-c0d278007a1f",
      "type": "istar.ContributionLink",
      "source": "9f7f74cc-ac0e-40a8-b0c0-651b893a367c",
      "target": "f7e53ca4-a8b9-436c-9cf8-ae6a1318e609",
      "label": "make"
    },
    {
      "id": "cfe2d5b2-a707-4e88-9d42-cc71b6552d9d",
      "type": "istar.ContributionLink",
      "source": "2d6448e8-45fc-4e5e-8ebc-c59dec8b495c",
      "target": "864f5134-0d56-4802-98eb-4fc4474c006c",
      "label": "make"
    },
    {
      "id": "dbf1ea5a-9263-494d-9fb7-0fa0368f219a",
      "type": "istar.ContributionLink",
      "source": "f358eaff-6224-4d86-9dcc-316b180fd858",
      "target": "864f5134-0d56-4802-98eb-4fc4474c006c",
      "label": "make"
    },
    {
      "id": "4650563c-26b8-4b69-975b-3026a8efd5dc",
      "type": "istar.ContributionLink",
      "source": "d7d7377e-6d03-49e0-882f-0f643f6f308d",
      "target": "864f5134-0d56-4802-98eb-4fc4474c006c",
      "label": "make"
    },
    {
      "id": "937588b8-2a59-4839-a8d1-99579f2e2869",
      "type": "istar.ContributionLink",
      "source": "cd1131e7-1045-42b4-967d-eef99cfdcb9a",
      "target": "167bec28-6fdf-49d6-83ec-38e5faab2e79",
      "label": "make"
    },
    {
      "id": "416cb7dd-120f-45b2-9e5e-8d710589f84e",
      "type": "istar.ContributionLink",
      "source": "05da66f4-ba51-4b4a-b2d3-6e2c38bbc89b",
      "target": "167bec28-6fdf-49d6-83ec-38e5faab2e79",
      "label": "make"
    },
    {
      "id": "d6adf138-8899-40ed-acfd-23037ac6c4cc",
      "type": "istar.ContributionLink",
      "source": "cbed3df9-d921-4dca-904e-7af504a39282",
      "target": "5eb20c50-7ade-45ef-acb6-41ee1615ff53",
      "label": "make"
    },
    {
      "id": "b57b7927-e20a-4a77-b729-66993421bda6",
      "type": "istar.ContributionLink",
      "source": "73570810-c716-409e-9ae1-fbfd40e4fbcd",
      "target": "5eb20c50-7ade-45ef-acb6-41ee1615ff53",
      "label": "make"
    },
    {
      "id": "5d8270d9-51f1-4c93-a017-831f654cb2ed",
      "type": "istar.ContributionLink",
      "source": "fad059d4-0569-4d41-8ef9-1d63cdf99aea",
      "target": "4581bc3c-97c4-4611-8202-7d0778d6eb3a",
      "label": "make"
    },
    {
      "id": "44399888-7199-4f3f-9132-c46eed2d7760",
      "type": "istar.ContributionLink",
      "source": "2db76ff1-7738-4c4b-9760-3b71a725d7d9",
      "target": "4581bc3c-97c4-4611-8202-7d0778d6eb3a",
      "label": "make"
    },
    {
      "id": "c7ed0565-acaa-40a3-b673-3f6a1b125a63",
      "type": "istar.ContributionLink",
      "source": "a0ab73ee-2f9c-4fc8-bf4c-9ef9da52ec04",
      "target": "3c38303c-f93e-4702-849f-0b13867107f4",
      "label": "make"
    },
    {
      "id": "a9f5af09-6b18-49b0-8398-36f0969ce563",
      "type": "istar.ContributionLink",
      "source": "94b25ff7-4b3a-4076-a530-73a4603e55c4",
      "target": "fa2f6407-fc02-47ec-91c7-45378444152a",
      "label": "make"
    },
    {
      "id": "86a445a3-f96d-44a5-b76c-66b4492d43e5",
      "type": "istar.ContributionLink",
      "source": "5a26d3e1-4b37-4aba-8a1b-dc1e44134128",
      "target": "fa2f6407-fc02-47ec-91c7-45378444152a",
      "label": "make"
    },
    {
      "id": "8ad908f7-6e05-4945-8e68-9fc9262e30e5",
      "type": "istar.ContributionLink",
      "source": "4b15afba-82a4-4cf4-abbc-4ea289c0e0ee",
      "target": "3cd29e77-5980-4d3d-8d16-1b1c30ac6f4a",
      "label": "make"
    },
    {
      "id": "50d7e9b1-eeb7-48a1-9d8d-f63ca03032c1",
      "type": "istar.ContributionLink",
      "source": "4c9087bc-c68f-4ec3-a8ac-061e0bb9d7cb",
      "target": "3cd29e77-5980-4d3d-8d16-1b1c30ac6f4a",
      "label": "make"
    },
    {
      "id": "b85a911b-0afe-4742-9b87-24b9517f16e1",
      "type": "istar.ContributionLink",
      "source": "8268ecd2-ab18-42ca-9682-3b607ca3ca0f",
      "target": "f97eabd4-2385-4d77-a0ec-494cd1965b2a",
      "label": "make"
    },
    {
      "id": "94907a1e-e7f2-4a1b-9eb4-927216007fe0",
      "type": "istar.ContributionLink",
      "source": "845f9680-80f8-4fc4-9ba9-54de03280e3d",
      "target": "f97eabd4-2385-4d77-a0ec-494cd1965b2a",
      "label": "make"
    },
    {
      "id": "8a924ca8-7ef6-43fc-b810-0bc4d8e944d2",
      "type": "istar.ContributionLink",
      "source": "7d17913b-39e7-4429-8990-b387a2547012",
      "target": "f97eabd4-2385-4d77-a0ec-494cd1965b2a",
      "label": "make"
    },
    {
      "id": "3c89aad9-1527-430e-bdb7-b83c77716f6b",
      "type": "istar.ContributionLink",
      "source": "1a004790-7d9b-4b79-997f-50af4b5b7522",
      "target": "dd374c94-76dc-4856-9d96-984b4aaf3b4d",
      "label": "make"
    },
    {
      "id": "cd15c195-dc3b-4a74-b575-f217c3a9dadd",
      "type": "istar.ContributionLink",
      "source": "3d0f403f-2fa3-41fc-9d6e-0c2c94f67e86",
      "target": "dd374c94-76dc-4856-9d96-984b4aaf3b4d",
      "label": "make"
    },
    {
      "id": "63de633e-bf2b-4662-a030-3af51153747e",
      "type": "istar.ContributionLink",
      "source": "970d719e-959e-457b-bdf2-b6ba3ac01148",
      "target": "2465802a-69f5-47d5-8340-0c081631e7d8",
      "label": "help"
    },
    {
      "id": "cfab99a9-a5a2-4269-b8ef-3d5675861182",
      "type": "istar.ContributionLink",
      "source": "d07ee23b-ce40-4f28-9d31-72d4e4b9fe22",
      "target": "2465802a-69f5-47d5-8340-0c081631e7d8",
      "label": "help"
    },
    {
      "id": "6089cd08-722a-4ce2-9b91-6fa513a8aa62",
      "type": "istar.ContributionLink",
      "source": "67c1fb69-fcce-4a0d-a207-007176bed655",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "3cc0dd9c-9c41-4958-b181-d595ebdc5acc",
      "type": "istar.ContributionLink",
      "source": "4a282cb4-137b-4fa9-9285-4d5d7331a628",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "d0a6d3a7-e1ca-45ba-aceb-1dd7b0896c1a",
      "type": "istar.ContributionLink",
      "source": "55a567f9-f0ec-4aaf-89ac-efeb9a0760f7",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "14b44242-71e3-4e34-be43-e947540f86ed",
      "type": "istar.ContributionLink",
      "source": "711a5f01-8ade-4a55-9591-77982cc3f9a9",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "5553947c-fcab-41b6-ba1b-6c4801c36bd8",
      "type": "istar.ContributionLink",
      "source": "3a25ebaa-33f7-40d5-9901-9ae4f3bc8c2b",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "031368b1-10bb-4efb-b835-ca99405bf364",
      "type": "istar.ContributionLink",
      "source": "54080330-ac1d-4e65-8c40-785ba052ad1e",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "60db3e5a-f857-4ba5-a352-e09498d399c8",
      "type": "istar.ContributionLink",
      "source": "bb87c9d7-26ea-4baa-819c-29cd822339bf",
      "target": "5a3e5edf-e0da-4ba1-babf-6fee553a3350",
      "label": "make"
    },
    {
      "id": "d395b643-82ec-4805-967b-e6aea071acb4",
      "type": "istar.ContributionLink",
      "source": "691a6b3a-1e2e-4c13-ba0c-ccd38b75abb7",
      "target": "5a3e5edf-e0da-4ba1-babf-6fee553a3350",
      "label": "make"
    },
    {
      "id": "2a8ab7c6-e75a-4174-b69c-e1062631beca",
      "type": "istar.ContributionLink",
      "source": "46f94fff-2515-4384-8893-86ea1a2c242c",
      "target": "5a3e5edf-e0da-4ba1-babf-6fee553a3350",
      "label": "make"
    },
    {
      "id": "138910b2-c9cd-471c-bf47-d8c98e6ab65c",
      "type": "istar.ContributionLink",
      "source": "5a3e5edf-e0da-4ba1-babf-6fee553a3350",
      "target": "1b3f65c7-7758-415b-aa07-02bac6754a3b",
      "label": "help"
    },
    {
      "id": "34d3bf29-f9b7-4d87-b9b5-77cb592a3960",
      "type": "istar.ContributionLink",
      "source": "a0940488-2fd8-4212-b5fc-98182d506034",
      "target": "5760baa5-ec78-4ebd-a39d-2435974abab4",
      "label": "make"
    },
    {
      "id": "ad54a425-892a-4e5c-8bd6-531df4c73230",
      "type": "istar.ContributionLink",
      "source": "371db23b-9353-4639-8354-db223f82b062",
      "target": "e8184dc3-d178-406a-b57d-772c114ad35e",
      "label": "make"
    },
    {
      "id": "0cbf5d65-9f0e-4a84-87c4-333277833284",
      "type": "istar.ContributionLink",
      "source": "03c2b4ce-5e02-43d7-ba11-f1e702fe84b2",
      "target": "371db23b-9353-4639-8354-db223f82b062",
      "label": "make"
    },
    {
      "id": "4411df13-acf6-4842-b55f-c33fca9eef71",
      "type": "istar.ContributionLink",
      "source": "612d30c7-da0f-415e-a410-a0235d6b35d5",
      "target": "371db23b-9353-4639-8354-db223f82b062",
      "label": "make"
    },
    {
      "id": "9278c08a-b0b0-4ee0-af9b-c10e71890092",
      "type": "istar.ContributionLink",
      "source": "a6eefcb0-1ba7-4034-92c1-4ea02734b207",
      "target": "371db23b-9353-4639-8354-db223f82b062",
      "label": "make"
    },
    {
      "id": "7684e805-656c-4921-ba9c-0bd25654cec5",
      "type": "istar.ContributionLink",
      "source": "8936a918-86d4-4ecd-bdb4-b9f6352397fe",
      "target": "e8184dc3-d178-406a-b57d-772c114ad35e",
      "label": "make"
    },
    {
      "id": "07abb2ba-19bb-40d5-9a06-bbd6b9afa511",
      "type": "istar.ContributionLink",
      "source": "6a026868-f913-4598-96db-c7840a02b347",
      "target": "8936a918-86d4-4ecd-bdb4-b9f6352397fe",
      "label": "make"
    },
    {
      "id": "8231f862-cb52-4f44-b533-1f9b727f6755",
      "type": "istar.ContributionLink",
      "source": "b5164407-de4a-433d-84af-1d935743ca39",
      "target": "8936a918-86d4-4ecd-bdb4-b9f6352397fe",
      "label": "make"
    },
    {
      "id": "1b0a4b2e-0593-4543-ae7d-9d53cb5bd096",
      "type": "istar.ContributionLink",
      "source": "7fb89cce-3973-485d-9874-d35f108c4244",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "5394b2d2-2605-4fad-9d58-c26dc112a4a3",
      "type": "istar.ContributionLink",
      "source": "1136341d-8fca-400a-b235-97680a83ee36",
      "target": "7fb89cce-3973-485d-9874-d35f108c4244",
      "label": "help"
    },
    {
      "id": "0df00b1d-7a2d-41ff-8e53-2eac3b6a8ceb",
      "type": "istar.ContributionLink",
      "source": "02e3e90c-16ea-4cc0-9c70-3f502e374d53",
      "target": "7fb89cce-3973-485d-9874-d35f108c4244",
      "label": "help"
    },
    {
      "id": "2d0b3007-2e24-4f8c-a45a-69f18243b708",
      "type": "istar.ContributionLink",
      "source": "dd374c94-76dc-4856-9d96-984b4aaf3b4d",
      "target": "7fb89cce-3973-485d-9874-d35f108c4244",
      "label": "help"
    },
    {
      "id": "9c104469-01eb-4fca-85c0-151dd627da8c",
      "type": "istar.ContributionLink",
      "source": "fa2f6407-fc02-47ec-91c7-45378444152a",
      "target": "7fb89cce-3973-485d-9874-d35f108c4244",
      "label": "help"
    },
    {
      "id": "6b1cb88f-667d-4137-9488-3680d6d97d60",
      "type": "istar.ContributionLink",
      "source": "9a56ac9f-8c9f-4885-b848-e84cc744ac11",
      "target": "7fb89cce-3973-485d-9874-d35f108c4244",
      "label": "help"
    },
    {
      "id": "e5e04fbd-4492-405f-aea0-7f3a203d5444",
      "type": "istar.ContributionLink",
      "source": "29296aad-f0e7-44e3-bf4b-ace861749594",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "b7979432-2c9c-441b-9a4b-89062a2e7764",
      "type": "istar.ContributionLink",
      "source": "1bebebfa-5a56-4b79-adff-d79162024e18",
      "target": "29296aad-f0e7-44e3-bf4b-ace861749594",
      "label": "help"
    },
    {
      "id": "9eae3481-5fbb-48ba-b723-1525c74f849e",
      "type": "istar.ContributionLink",
      "source": "f7e53ca4-a8b9-436c-9cf8-ae6a1318e609",
      "target": "5efc68f1-b1fa-4e0d-94ad-0d6932821214",
      "label": "help"
    },
    {
      "id": "38508f89-7de5-4773-9ad6-3ab4e4594e92",
      "type": "istar.ContributionLink",
      "source": "5efc68f1-b1fa-4e0d-94ad-0d6932821214",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "4940211e-a093-4ee8-bd22-c1db24309990",
      "type": "istar.ContributionLink",
      "source": "89b06a7e-2fd6-4d66-a3ab-2a22e284b86f",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "6c43d885-9087-44dc-9c82-5a334a03f53b",
      "type": "istar.ContributionLink",
      "source": "b308d564-fbe4-4013-875c-46068cba7305",
      "target": "89b06a7e-2fd6-4d66-a3ab-2a22e284b86f",
      "label": "help"
    },
    {
      "id": "5a4f69ef-8f33-4672-a5d9-7a0ac2c120a9",
      "type": "istar.ContributionLink",
      "source": "046e3089-0971-4c2f-bdca-8a8e3f3ea6b2",
      "target": "29296aad-f0e7-44e3-bf4b-ace861749594",
      "label": "help"
    },
    {
      "id": "8b998418-71ad-4ec9-b03a-2fb97c69fa8b",
      "type": "istar.ContributionLink",
      "source": "3c38303c-f93e-4702-849f-0b13867107f4",
      "target": "6700b366-f1ce-41a0-b2d4-6df55fdb98a0",
      "label": "help"
    },
    {
      "id": "3f3965ee-1604-4b81-a1cc-781795c993e2",
      "type": "istar.ContributionLink",
      "source": "167bec28-6fdf-49d6-83ec-38e5faab2e79",
      "target": "fcfeba81-9605-4432-9306-1cac9c672d41",
      "label": "help"
    },
    {
      "id": "a9f7da22-6765-4eab-918b-307b2bc020bf",
      "type": "istar.ContributionLink",
      "source": "01aed92e-f210-4ff4-adb8-75d145f108d7",
      "target": "ae4d58f0-340c-4332-9fbf-1c8d607c0493",
      "label": "help"
    },
    {
      "id": "71e10fb8-f5d6-460b-aebd-7f2d441ca9c3",
      "type": "istar.ContributionLink",
      "source": "ae4d58f0-340c-4332-9fbf-1c8d607c0493",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "98c1ea3e-1c83-46dc-a516-d5dd3a3b9601",
      "type": "istar.ContributionLink",
      "source": "fcfeba81-9605-4432-9306-1cac9c672d41",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "dcaf04cd-7f2b-48b5-89e2-73737e04a00f",
      "type": "istar.ContributionLink",
      "source": "6700b366-f1ce-41a0-b2d4-6df55fdb98a0",
      "target": "6a026868-f913-4598-96db-c7840a02b347",
      "label": "help"
    },
    {
      "id": "3e488e1b-c7ca-4440-9ea2-303f23899e67",
      "type": "istar.ContributionLink",
      "source": "864f5134-0d56-4802-98eb-4fc4474c006c",
      "target": "26a6672e-91b3-4a7e-9431-0e51f94a7319",
      "label": "help"
    },
    {
      "id": "819dab70-2b5d-40b6-aabf-5b8e563ef7be",
      "type": "istar.ContributionLink",
      "source": "26a6672e-91b3-4a7e-9431-0e51f94a7319",
      "target": "b5164407-de4a-433d-84af-1d935743ca39",
      "label": "help"
    },
    {
      "id": "e97d2547-1a8f-4ff1-ba1f-bc90c2072eaf",
      "type": "istar.ContributionLink",
      "source": "5eb20c50-7ade-45ef-acb6-41ee1615ff53",
      "target": "1530d033-22a3-44fe-aad5-7a11d95c00c7",
      "label": "help"
    },
    {
      "id": "43d3009e-325c-4c4a-80c7-14fecaaeddac",
      "type": "istar.ContributionLink",
      "source": "1530d033-22a3-44fe-aad5-7a11d95c00c7",
      "target": "b5164407-de4a-433d-84af-1d935743ca39",
      "label": "help"
    },
    {
      "id": "a80fce44-e047-4824-b55c-dcaee5b74481",
      "type": "istar.ContributionLink",
      "source": "f97eabd4-2385-4d77-a0ec-494cd1965b2a",
      "target": "9d76facd-beeb-4238-9212-e6a36ec2afe3",
      "label": "help"
    },
    {
      "id": "e786054b-40c6-4c66-8f46-e3c127faf7e3",
      "type": "istar.ContributionLink",
      "source": "9d76facd-beeb-4238-9212-e6a36ec2afe3",
      "target": "b5164407-de4a-433d-84af-1d935743ca39",
      "label": "help"
    },
    {
      "id": "75d187b6-44bd-4abd-ae90-f98f51ed4908",
      "type": "istar.ContributionLink",
      "source": "3cd29e77-5980-4d3d-8d16-1b1c30ac6f4a",
      "target": "1530d033-22a3-44fe-aad5-7a11d95c00c7",
      "label": "help"
    },
    {
      "id": "12e7f5e8-ff21-4692-b150-568418450792",
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
    "945614bb-3efc-47d6-b25d-551ebabaa94d": {
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
  "saveDate": "Wed, 10 Jul 2024 16:05:19 GMT",
  "diagram": {
    "width": 7300,
    "height": 1100,
    "name": "Sustainability catalog",
    "customProperties": {
      "Description": "Welcome to the pistar sustainability plugin! This model is the sustainability catalog."
    }
  }
}





