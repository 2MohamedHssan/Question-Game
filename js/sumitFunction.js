let heading = document.querySelector(".qustion")
function handelboulites(c) {
    let spanbulrs = Array.from(document.querySelectorAll(".bolutes span"))
    spanbulrs.forEach((span, index) => {
        if (index === c) {
            span.className="on"
        }
    })
}

export {
    handelboulites,
    heading
}