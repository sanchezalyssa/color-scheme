let inputColor = document.getElementById("input-color")
let selectMode = document.getElementById("select-mode")
let colorContainer = document.querySelector(".color-container")
let btn = document.getElementById("btn-scheme")

function renderColorHtml(data) {
    let colorContainer = document.querySelector(".color-container")
    // Clear the existing content before render new color
    colorContainer.innerHTML = ""
    data.colors
        .map((color) => {
            let div = document.createElement("div")
            let firstP = document.createElement("p")

            div.style.backgroundColor = color.hex.value
            div.classList.add("colors")
            firstP.textContent = color.hex.value
            firstP.classList.add("value")

            div.append(firstP)
            colorContainer.append(div)

            div.addEventListener("click", function () {
                copyToClipboard(firstP.textContent)
            })
        })
        .join("")
}

btn.addEventListener("click", () => {
    let inputColorValue = inputColor.value.slice(1, inputColor.value.length)
    let selectModeValue = selectMode.value

    fetch(`https://www.thecolorapi.com/scheme?hex=${inputColorValue}&mode=${selectModeValue}`)
        .then((res) => res.json())
        .then((data) => {
            renderColorHtml(data)
        })
        .catch((err) => console.error(err))
})
// Function to copy text to the clipboard using the Clipboard API
function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            document.getElementById("copyText").textContent = "Color copied to the clipboard!"
            setTimeout(function () {
                document.getElementById("copyText").textContent = ""
            }, 1500)
        })
        .catch((err) => {
            console.error("Unable to copy text: ", err)
        })
}
//default color display
function displayDefaultColor() {
    fetch(`https://www.thecolorapi.com/scheme?hex=407bf2&&mode=analogic&count=5`)
        .then((res) => res.json())
        .then((data) => {
            renderColorHtml(data)
        })
}
displayDefaultColor()
