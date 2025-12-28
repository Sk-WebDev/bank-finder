const sitelink = "https://bank-apis.justinclicks.com/API/V1/STATE/"

//$(".btn-left, .btn-right").on("click", function () {
//    $(this).addClass("active-btn");
//});


$(document).on("change", "#state", async function () {
    const state = this.value;
    const districtDropdown = $("#district");

       $("#city").html('<option value=""> Select City</option>');
    $("#center").html('<option value=""> Select Center</option>');

    if (!state)
        return;

    districtDropdown.prop("disabled", true);

  try {
    const response = await fetch(sitelink + state + "/");
    const districts = await response.json();

    districtDropdown.html('<option value="">Select District</option>');

    districts.forEach(district => {
      districtDropdown.append(
        `<option value="${district}">${district}</option>`
      );
    });

    districtDropdown.prop("disabled", false);

  } catch (err) {
    console.error("Failed to load districts", err);
    districtDropdown.html("<option>Error loading districts</option>");
  }

});

$(document).on("change", "#district", async function () {
    const state = $("#state").val();
    const district = this.value;
    const cityDropdown = $("#city");

     $("#center").html('<option value=""> Select Center</option>');

    if (!state || !district)
        return;

    cityDropdown.prop("disabled", true);

  try {
    const response = await fetch(sitelink + state + "/" + district + "/");
    const citys = await response.json();

    cityDropdown.html('<option value="">Select City</option>');

    citys.forEach(city => {
      cityDropdown.append(
        `<option value="${city}">${city}</option>`
      );
    });

    cityDropdown.prop("disabled", false);

  } catch (err) {
    console.error("Failed to load citys", err);
    cityDropdown.html("<option>Error loading citys</option>");
  }

});

$(document).on("change", "#city", async function () {
    const state = $("#state").val();
    const district = $("#district").val();
    const city = this.value;
    const centerDropdown = $("#center");

    if (!state || !district || !city)
        return;

    centerDropdown.prop("disabled", true);

  try {
    const response = await fetch(sitelink + state + "/" + district + "/" + city + "/");
    const centers = await response.json();

    centerDropdown.html('<option value="">Select Center</option>');

    centers.forEach(center => {
      centerDropdown.append(
        `<option value="${center}">${center}</option>`
      );
    });

    centerDropdown.prop("disabled", false);

  } catch (err) {
    console.error("Failed to load centers", err);
    centerDropdown.html("<option>Error loading centers</option>");
  }

});