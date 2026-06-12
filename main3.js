let heading = document.getElementById("mainHeading");
let input = document.getElementById("userInput");
let paragraph = document.getElementById("paragraph");

// Change Heading Text
document.getElementById("changeTextBtn").onclick = function () {
  if (input.value.trim() !== "") {
    heading.textContent = input.value;
  } else {
    alert("Please enter some text");
  }
};

// Change Background Color
document.getElementById("bgColorBtn").onclick = function () {
  document.body.style.backgroundColor =
    "#" + Math.floor(Math.random() * 16777215).toString(16);
};

// Increase Font Size
document.getElementById("fontSizeBtn").onclick = function () {
  let currentSize = window.getComputedStyle(heading).fontSize;
  let newSize = parseInt(currentSize) + 5;
  heading.style.fontSize = newSize + "px";
};

// Show/Hide Paragraph
document.getElementById("toggleBtn").onclick = function () {
  if (paragraph.style.display === "none") {
    paragraph.style.display = "block";
  } else {
    paragraph.style.display = "none";
  }
};

// Reset Everything
document.getElementById("resetBtn").onclick = function () {
  heading.textContent = "Welcome to JavaScript Lab";
  heading.style.fontSize = "24px";
  document.body.style.backgroundColor = "#eef2f3";
  paragraph.style.display = "block";
  input.value = "";
};