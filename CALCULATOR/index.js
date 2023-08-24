const output = document.getElementById("output");
const buttons = document.querySelectorAll("button");
let outputValue = "";
for (item of buttons) {
  item.addEventListener("click", (e) => {
    let buttonText = e.target.innerText;

    if (buttonText == "X") {
      buttonText = "*";
      outputValue = outputValue + buttonText;
      output.value = outputValue;
    } else if (buttonText == "C") {
      outputValue = "";
      output.value = outputValue;
    } else if (buttonText == "=") {
      output.value = eval(outputValue);
    } else {
      outputValue += buttonText;
      output.value = outputValue;
    }
  });
}
