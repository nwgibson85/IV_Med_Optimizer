let baseUrl = "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2//";

function formatQueryParams(params) {
    const searchPatient = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return searchPatient.join('&');
}

// Get requests
function getPatientInfo(firstName, lastName) {
    const params = {
        given: firstName,
        family: lastName
    };
    const patientString = formatQueryParams(params);
    const url = baseUrl + 'Patient' + '?' + patientString;
    console.log(url);
    $.getJSON(url, function(data,error) {
        console.log(data);
        getMarInfo(data);
    });
    showHidden();
}

function getMarInfo(data) {
    let patientId = data.entry[0].link[0].url.split("/").pop();
    let allergySearchString = "AllergyIntolerance?patient=" + patientId;
    $.getJSON(baseUrl + allergySearchString, function(data,error) {
		console.log(data);
		});
}

function getDrugInteractions() {}

//printing JSON items
function printSearchResults() {}

// DOM Management
function showHidden() {
    $('#results').show();
}

function hideShown() {
    $('#results').hide();
}

//Event Listeners
function watchResults() {
    $('#allergies').submit(event => {
        event.preventDefault();
        getMarInfo();
    });
}
function watchPatientSelection() {
    $('#results-list').on('click', 'li ID', function(event) {
        event.preventDefault();
        getDrugInteractions();
    });
}

function watchForm() {
    $('form').submit(event => {
    event.preventDefault();
    const firstName = $('#js-firstName').val();
    const lastName = $('#js-lastName').val();
    getPatientInfo(firstName, lastName);
    });
}

function startWatching() {
    watchForm();
    watchPatientSelection();
    hideShown();
}

$(startWatching);



//     fetch(url)
//     .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error(response.statusText);
//       })
//       .then(responseJson => //displayResults(responseJson))
//       console.log(responseJson))
//       .catch(err => {
//         $('#js-error-message').text(`Something went wrong: ${err.message}`);
//       });
// }