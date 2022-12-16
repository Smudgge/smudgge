const tab = document.getElementById("tab")

// Tab 
document.addEventListener("scroll", (event) => {
    var scroll = window.scrollY
    tab.style.opacity = (scroll * 0.005) - 2
})

setSection("music")

function setSection(section) {
    var x = document.getElementsByClassName("section");
    for (var i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }

    var x = document.getElementsByClassName("bt");
    for (var i = 0; i < x.length; i++) {
        x[i].style.borderBottom = "none";
    }

    document.getElementById(section).style.display = "block";
    document.getElementById("bt-" + section).style.borderBottom = "3px solid #ff80a9";
}

function openDropdown(svg, element) {
    if (document.getElementById(element).style.display == "none" || document.getElementById(element).style.display == "") {
        document.getElementById(element).style.display = "block"
        document.getElementById(svg).style.rotate = "-90deg"
    } else {
        document.getElementById(element).style.display = "none"
        document.getElementById(svg).style.rotate = "90deg"
    }
}

function scroll100() {
    let pageHeight = window.innerHeight;
    let scroll = window.scrollY;
    window.scrollBy(0, pageHeight - scroll);
}