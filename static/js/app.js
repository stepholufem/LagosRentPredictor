// --- Your town -> communities mapping (truncate shown) ---
var data = {
  "Lekki": ["Ajiran", "Lekki Phase 1", "Chevron Drive"],
  "Ikoyi": ["Banana Island", "Parkview Estate"],
  "Ajah": ["Thomas Estate", "Badore"]
  // ... paste your full mapping here ...
};

// Helper: capitalize first letter
function capFirst(s){return s.charAt(0).toUpperCase()+s.slice(1);}

// Populate communities when town changes
function populateSecondarySelect(targetId) {
  var town = document.getElementById("townSelect").value;
  var secondary = document.getElementById(targetId);
  var ecoSel = document.getElementById("economicClassSelect");

  secondary.innerHTML = '<option value="">Select Community</option>';

  if (data[town]) {
    data[town].forEach(function(option) {
      var opt = document.createElement("option");
      opt.value = option;
      opt.text = option;
      secondary.add(opt);
    });
  }

  // Auto-set eco class (fixing your names):
  switch (town) {
    case "Shomolu":
    case "Oshodi":
    case "Ketu":
    case "Mushin":
    case "Yaba":
    case "Ikorodu":
      ecoSel.value = "Lower"; break;

    case "Isolo":
    case "Ipaja":
    case "Agege":
    case "Abule Egba":
    case "Egbe-Idimu":
    case "Ojota":
    case "Ogudu":
    case "Gbagada":
    case "Ojodu":
    case "Kosofe":
    case "Ebute Metta":
    case "Lagos Island":
    case "Ikotun/Igando":
    case "Ilupeju":
    case "Ikosi-Ketu":
    case "Magodo":
    case "Alimosho":
    case "Ejigbo":
    case "Ojo":
    case "Amuwo Odofin":
    case "Orile":
    case "Festac":
    case "Ifako Ijaiye":
    case "Apapa":
    case "Badagry":
    case "Epe":
    case "Omole":
      ecoSel.value = "Middle"; break;

    case "Ajah":
    case "Ikeja":
    case "Surulere":
    case "Maryland":
    case "Ogba":
      ecoSel.value = "Lower Upper"; break; // note the space to match option text

    case "Lekki":
    case "Ikoyi":
    case "Victoria Island":
    case "Lekki Lagos Island":
      ecoSel.value = "Upper"; break;

    default:
      ecoSel.value = "";
  }
}

// Predict button
function predict() {
  var payload = {
    bedroom: document.getElementById("bedroom").value,
    bathroom: document.getElementById("bathroom").value,
    toilet: document.getElementById("toilet").value,
    year_added: document.getElementById("year_added").value,
    town: document.getElementById("townSelect").value,
    community: document.getElementById("communitySelect").value,
    eco_class: document.getElementById("economicClassSelect").value
  };

  // Basic validation
  if (!payload.town || !payload.community || !payload.eco_class) {
    document.getElementById("result").innerHTML =
      '<p class="text-danger">Please select Town, Community and Eco class.</p>';
    return;
  }

  fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(r => r.json())
  .then(res => {
    if (res.error) throw new Error(res.error);
    document.getElementById("result").innerHTML =
      '<p class="lead">Predicted House Price: ' + res.prediction + "</p>";
  })
  .catch(err => {
    console.error(err);
    document.getElementById("result").innerHTML =
      '<p class="text-danger">Error predicting house price.</p>';
  });
}

// Keep backward compatibility with your old onclick
function clickToEstimatePrice(){ predict(); }
