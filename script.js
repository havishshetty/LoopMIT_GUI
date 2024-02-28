const rangeInput = document.getElementById("myRange");
const distanceSpan = document.getElementById("demo");

let animationFrameId;
let distance = 0;

function moveSlider() {
  distance = 0;
  animateSlider();
}

function animateSlider() {
  let printval = 0;
  printval += 1;
  distance += 1;
  rangeInput.value = distance;
  distanceSpan.textContent = distance;
  rangeInput.dispatchEvent(new Event("input"));

  if (distance < 100) {
    animationFrameId = requestAnimationFrame(animateSlider);
  }
}

const customErrorPopup = document.getElementById("customErrorPopup");
const customErrorMessage = document.getElementById("customErrorMessage");

function showCustomError(message) {
  customErrorMessage.innerText = message;
  customErrorPopup.style.display = "block";
}

function hideCustomError() {
  customErrorPopup.style.display = "none";
}

function stopSlider() {
  cancelAnimationFrame(animationFrameId);
  let targetDistance = distance + 15;

  if (targetDistance < 300) {
    showCustomError("Brakes Activated");
    return;
  }

  function animateEStop() {
    distance += 0.55;

    rangeInput.value = distance;
    distanceSpan.textContent = targetDistance;

    rangeInput.dispatchEvent(new Event("input"));

    if (distance < targetDistance) {
      animationFrameId = requestAnimationFrame(animateEStop);
    }
  }

  animateEStop();
}

function estopSlider() {
  cancelAnimationFrame(animationFrameId);

  let targetDistance = distance + 15;

  function animateEStop() {
    distance += 0.55;

    rangeInput.value = distance;
    distanceSpan.textContent = targetDistance;

    rangeInput.dispatchEvent(new Event("input"));

    if (distance < targetDistance) {
      animationFrameId = requestAnimationFrame(animateEStop);
    }
  }

  animateEStop();
}

document.querySelector(".button2").addEventListener("click", moveSlider);
document.querySelector(".button3").addEventListener("click", stopSlider);
document.querySelector(".button1").addEventListener("click", estopSlider);

// Getting Data From Server

document.addEventListener("DOMContentLoaded", function () {
  const limtemp = document.getElementById("lim_temp");
  const acceleration = document.getElementById("acceleration");
  const voltage = document.getElementById("voltage");
  const high_battery_temp = document.getElementById("high_battery_temp");
  const high_battery_voltage = document.getElementById("high_battery_voltage");
  const high_battery_power = document.getElementById("high_battery_power");
  const high_battery_current = document.getElementById("high_battery_current");
  const low_battery_temp = document.getElementById("low_battery_temp");
  const low_battery_voltage = document.getElementById("low_battery_voltage");
  const low_battery_current = document.getElementById("low_battery_current");
  const low_battery_power = document.getElementById("low_battery_power");
  const pressure = document.getElementById("pressure");
  const proximity = document.getElementById("proximity");
  const gap_height = document.getElementById("gap_height");

  function fetchSensorData() {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        limtemp.innerText = `${data.lim_temperature.toFixed(2)}°C`;
        acceleration.innerText = `${data.acceleration.toFixed(2)} ms-2`;
        voltage.innerText = `${data.voltage.toFixed(2)} V`;
        high_battery_temp.innerText = `${data.high_battery_temp.toFixed(2)}°C`;
        high_battery_voltage.innerText = `${data.high_battery_voltage.toFixed(
          2
        )} V`;
        high_battery_power.innerText = `${data.high_battery_power.toFixed(
          2
        )} W`;
        high_battery_current.innerText = `${data.high_battery_current.toFixed(
          2
        )} A`;
        low_battery_temp.innerText = `${data.low_battery_temp.toFixed(2)}°C`;
        low_battery_voltage.innerText = `${data.low_battery_voltage.toFixed(
          2
        )} V`;
        low_battery_current.innerText = `${data.low_battery_current.toFixed(
          2
        )} A`;
        low_battery_power.innerText = `${data.low_battery_power.toFixed(2)} W`;
        pressure.innerText = `${data.pressure.toFixed(2)} Pa`;
        proximity.innerText = `${data.proximity.toFixed(2)} cm`;
        gap_height.innerText = `${data.gap_height.toFixed(2)} mm`;
      })
      .catch((error) => {
        console.error("Error", error);
        limtemp.innerText = `Server Down`;
        acceleration.innerText = `Server Down`;
        voltage.innerText = `Server Down`;
        high_battery_temp.innerText = `Server Down`;
        high_battery_voltage.innerText = `Server Down`;
        high_battery_power.innerText = `Server Down`;
        high_battery_current.innerText = `Server Down`;
        low_battery_temp.innerText = `Server Down`;
        low_battery_voltage.innerText = `Server Down`;
        low_battery_current.innerText = `Server Down`;
        low_battery_power.innerText = `Server Down`;
        pressure.innerText = `Server Down`;
        proximity.innerText = `Server Down`;
        gap_height.innerText = `Server Down`;
      });
  }
  setInterval(fetchSensorData, 500);
  fetchSensorData();
});
