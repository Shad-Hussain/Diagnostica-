document.addEventListener("DOMContentLoaded", () => {
  const tagsDropdown = document.querySelector(".tags-dropdown");
  const tagInput = document.querySelector(".tag-input");
  const selectedTagsContainer = document.querySelector(".selected-tags");
  const submitButton = document.querySelector(".submit-btn");
  const modal = document.querySelector(".modal");
  const modalMessage = document.querySelector(".modal-message");
  const confirmButton = document.querySelector(".confirm-btn");
  const cancelButton = document.querySelector(".cancel-btn");
  const hiddenInput = document.querySelector("#selected-tags-hidden");

  const availableTags = [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions",
    "continuous_sneezing",
    "shivering",
    "chills",
    "joint_pain",
    "stomach_pain",
    "acidity",
    "ulcers_on_tongue",
    "muscle_wasting",
    "vomiting",
    "burning_micturition",
    "spotting_urination",
    "fatigue",
    "weight_gain",
    "anxiety",
    "cold_hands_and_feets",
    "mood_swings",
    "weight_loss",
    "restlessness",
    "lethargy",
    "patches_in_throat",
    "irregular_sugar_level",
    "cough",
    "high_fever",
    "sunken_eyes",
    "breathlessness",
    "sweating",
    "dehydration",
    "indigestion",
    "headache",
    "yellowish_skin",
    "dark_urine",
    "nausea",
    "loss_of_appetite",
    "pain_behind_the_eyes",
    "back_pain",
    "constipation",
    "abdominal_pain",
    "diarrhoea",
    "mild_fever",
    "yellow_urine",
    "yellowing_of_eyes",
    "acute_liver_failure",
    "fluid_overload",
    "swelling_of_stomach",
    "swelled_lymph_nodes",
    "malaise",
    "blurred_and_distorted_vision",
    "phlegm",
    "throat_irritation",
    "redness_of_eyes",
    "sinus_pressure",
    "runny_nose",
    "congestion",
    "chest_pain",
    "weakness_in_limbs",
    "fast_heart_rate",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "bloody_stool",
    "irritation_in_anus",
    "neck_pain",
    "dizziness",
    "cramps",
    "bruising",
    "obesity",
    "swollen_legs",
    "swollen_blood_vessels",
    "puffy_face_and_eyes",
    "enlarged_thyroid",
    "brittle_nails",
    "swollen_extremeties",
    "excessive_hunger",
    "extra_marital_contacts",
    "drying_and_tingling_lips",
    "slurred_speech",
    "knee_pain",
    "hip_joint_pain",
    "muscle_weakness",
    "stiff_neck",
    "swelling_joints",
    "movement_stiffness",
    "spinning_movements",
    "loss_of_balance",
    "unsteadiness",
    "weakness_of_one_body_side",
    "loss_of_smell",
    "bladder_discomfort",
    "foul_smell_of_urine",
    "continuous_feel_of_urine",
    "passage_of_gases",
    "internal_itching",
    "toxic_look_(typhos)",
    "depression",
    "irritability",
    "muscle_pain",
    "altered_sensorium",
    "red_spots_over_body",
    "belly_pain",
    "abnormal_menstruation",
    "dischromic_patches",
    "watering_from_eyes",
    "increased_appetite",
    "polyuria",
    "family_history",
    "mucoid_sputum",
    "rusty_sputum",
    "lack_of_concentration",
    "visual_disturbances",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
    "coma",
    "stomach_bleeding",
    "distention_of_abdomen",
    "history_of_alcohol_consumption",
    "fluid_overload.1",
    "blood_in_sputum",
    "prominent_veins_on_calf",
    "palpitations",
    "painful_walking",
    "pus_filled_pimples",
    "blackheads",
    "scurring",
    "skin_peeling",
    "silver_like_dusting",
    "small_dents_in_nails",
    "inflammatory_nails",
    "blister",
    "red_sore_around_nose",
    "yellow_crust_ooze",
  ];
  let selectedTags = [];
  let highlightedIndex = -1;

  function updateDropdown() {
    const inputValue = tagInput.value.toLowerCase();
    tagsDropdown.innerHTML = "";
    const filteredTags = availableTags.filter(
      (tag) =>
        tag.toLowerCase().includes(inputValue) && !selectedTags.includes(tag)
    );

    filteredTags.forEach((tag, index) => {
      const tagElement = document.createElement("li");
      const matchIndex = tag.toLowerCase().indexOf(inputValue);
      tagElement.innerHTML = `${tag.slice(
        0,
        matchIndex
      )}<span class="match">${tag.slice(
        matchIndex,
        matchIndex + inputValue.length
      )}</span>${tag.slice(matchIndex + inputValue.length)}`;
      tagElement.addEventListener("click", () => addTag(tag));
      if (index === highlightedIndex) {
        tagElement.classList.add("highlighted");
      }
      tagsDropdown.appendChild(tagElement);
    });

    tagsDropdown.style.display = filteredTags.length ? "block" : "none";
  }

  function addTag(tag) {
    selectedTags.push(tag);
    const tagElement = document.createElement("div");
    tagElement.className = "tag";
    tagElement.textContent = tag;

    const removeButton = document.createElement("span");
    removeButton.textContent = "x";
    removeButton.className = "remove-tag";
    removeButton.addEventListener("click", () => removeTag(tag, tagElement));

    tagElement.appendChild(removeButton);
    selectedTagsContainer.appendChild(tagElement);

    tagInput.value = "";
    updateDropdown();
    updatePlaceholder();
    updateHiddenInput(); // Update hidden input
  }

  function removeTag(tag, element) {
    selectedTags = selectedTags.filter((t) => t !== tag);
    selectedTagsContainer.removeChild(element);
    updateDropdown();
    updatePlaceholder();
    updateHiddenInput(); // Update hidden input
  }

  function updatePlaceholder() {
    tagInput.placeholder = "Search or add symptoms";
  }

  function updateHiddenInput() {
    hiddenInput.value = selectedTags.join(",");
  }

  function submitTags() {
    if (selectedTags.length > 0) {
      modalMessage.textContent = `You have selected: ${selectedTags.join(
        ", "
      )}. Confirm submission?`;
      modal.classList.remove("hidden");
    } else {
      // Highlight the input to show that tags are required
      tagInput.focus();
    }
  }

  function confirmSubmission() {
    modal.classList.add("hidden");
    sendTagsToFlask();
  }

  function cancelSubmission() {
    modal.classList.add("hidden");
  }

  function closeModal(event) {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  }

  function handleKeyDown(event) {
    const dropdownItems = tagsDropdown.querySelectorAll("li");
    if (dropdownItems.length > 0) {
      if (event.key === "ArrowDown") {
        highlightedIndex = (highlightedIndex + 1) % dropdownItems.length;
        updateDropdown();
      } else if (event.key === "ArrowUp") {
        highlightedIndex =
          (highlightedIndex - 1 + dropdownItems.length) % dropdownItems.length;
        updateDropdown();
      } else if (event.key === "Enter") {
        if (highlightedIndex > -1) {
          dropdownItems[highlightedIndex].click();
          highlightedIndex = -1;
        }
      }
    }
  }

  function sendTagsToFlask() {
    const data = new URLSearchParams();
    data.append("selected-tags-hidden", selectedTags.join(","));

    fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((response) => response.text())
      .then((data) => {
        document.open();
        document.write(data);
        document.close();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Clear selected tags after submission
    selectedTags = [];
    selectedTagsContainer.innerHTML = "";
    updatePlaceholder();
  }

  tagInput.addEventListener("input", updateDropdown);
  tagInput.addEventListener("focus", updateDropdown);
  tagInput.addEventListener("keydown", handleKeyDown);
  submitButton.addEventListener("click", submitTags);
  confirmButton.addEventListener("click", confirmSubmission);
  cancelButton.addEventListener("click", cancelSubmission);

  document.addEventListener("click", (event) => {
    // Close dropdown if clicking outside
    if (!event.target.closest(".dropdown")) {
      tagsDropdown.style.display = "none";
      highlightedIndex = -1;
    }
  });

  // Close modal if clicking outside of it
  modal.addEventListener("click", closeModal);
});
