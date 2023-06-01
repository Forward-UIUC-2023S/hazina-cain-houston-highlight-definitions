// hilite.js

// List each member of main_sents as its own bullet point
// Break the Django/Python array into a JS array
function breakArr(id_name) {
    // Find the section with the definitions
    var inputText = document.getElementById(id_name)

    var innerHTML = inputText.value

    // Remove the '["' and '"]" at the ends
    var innerHTML2 = innerHTML.substring(2,innerHTML.length-2)

    // Split by ", "
    const arr = innerHTML2.split("', '")

    return arr
}



// Highlight the definition in a given sentence
function highlight(def, sent) {
    // Get the part that corresponds to the def in that sent
    var index = sent.indexOf(def)

    // Highlight by changing it to include the highlight tags
    if (index >= 0) {
        newSent = sent.substring(0,index) + '<span style="background-color: #FFFF00">' + sent.substring(index, index+def.length) + "</span>" + sent.substring(index+def.length, sent.length)
    }

    return newSent
}

// List the fully formatted sentences in bullet list
// sents is a JS array of sentences ready to insert into the HTML page
function listDefs(sents) {
    // Find the part where sentences will go
    var inputText = document.getElementById("defs")
    var innerHTML = inputText.innerHTML
    var index = innerHTML.indexOf("[[DEFS]]")
  
    new_innerHTML = innerHTML.substring(0,index) + innerHTML.substring(index+"[[DEFS]]".length,innerHTML.length)
    innerHTML = new_innerHTML

    // For each item in sents, write <li>, then the sent, then </li>and line break
    for (let i = 0; i < sents.length; i++) {
        // TODO May need to add "</li>\n"
        new_innerHTML = innerHTML.substring(0,index) + "<li>" + sents[i] + "</li>" + innerHTML.substring(index + "<li>".length + sents[i].length + "</li>".length,innerHTML.length)
        innerHTML = new_innerHTML
        index = index + "<li>".length + sents[i].length + "</li>".length //innerHTML.indexOf(sents[i])
    }

    // Update the page
    inputText.innerHTML = innerHTML
    
}

function listAltWords(alts) {
    // Find the part where sentences will go
    var inputText = document.getElementById("defs")
    var innerHTML = inputText.innerHTML
    var index = innerHTML.indexOf("[[ALT_WORDS]]")
    new_innerHTML = innerHTML.substring(0,index) + innerHTML.substring(index+"[[ALT_WORDS]]".length,innerHTML.length)
    innerHTML = new_innerHTML

    // For each item in sents, write <li>, then the sent, then </li>and line break
    for (let i = 0; i < alts.length; i++) {
        new_innerHTML = innerHTML.substring(0,index) + '<a onclick="search_f(' + "'" + alts[i] + "'" + ')">' + alts[i] + "</a>" + innerHTML.substring(index+alts[i].length,innerHTML.length)

        innerHTML = new_innerHTML
        index = index + '<a onclick="search_f('.length + "'".length + alts[i].length + "'".length + ')">'.length + alts[i].length + "</a>".length
    }

    // Update the page
    inputText.innerHTML = innerHTML
}

// List the fully formatted sentences in bullet list
// sents is a JS array of sentences ready to insert into the HTML page
function listAltWordsTab(alts) {
    // Find the part where sentences will go
    var inputText = document.getElementById("alt_words_tab")

    var innerHTML = inputText.innerHTML

    var index = innerHTML.indexOf("[[ALT_WORDS]]")

    new_innerHTML = innerHTML.substring(0,index) + innerHTML.substring(index+"[[ALT_WORDS]]".length,innerHTML.length)
    innerHTML = new_innerHTML

    // For each item in sents, write <li>, then the sent, then </li>and line break
    for (let i = 0; i < alts.length; i++) {
        new_innerHTML = innerHTML.substring(0,index) + "<li>" + '<a onclick="search_f(' + "'" + alts[i] + "'" + ')">' + alts[i] + "</a>" + "</li>" + innerHTML.substring(index + "<li>".length + alts[i].length + "</li>".length,innerHTML.length)
        innerHTML = new_innerHTML
        index = index + "<li>".length + '<a onclick="search_f('.length + "'".length + alts[i].length + "'".length + ')">'.length + alts[i].length + "</a>".length + "</li>".length //innerHTML.indexOf(alts[i])
    }

    // Update the page
    inputText.innerHTML = innerHTML
    
}

// Resubmit the form with word as the new input
function search_f(word) {
    // Get the form's text
    var inputText = document.getElementById("searchterm")

    // Change the form's text
    inputText.value = word

    // Submit the form
    document.getElementById("form").submit()

}

//Open tabs
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function myFilter(elm){
    return (elm != null && elm !== "");
}

// List the source of the definitions
function listSource(source_html) {
    //var inputText = document.getElementById("alt_words_tab")
    var source = document.getElementById(source_html).value

    var source_insert
    if (source == 'corpus') {
        source_insert = 'User-provided corpus'
    } else if (source == 'google') {
        source_insert = 'Google search results'
    } else if (source == 'NA') {
        source_insert = 'No definitions found'
    }

    // Find the part where sentences will go
    var inputText = document.getElementById("defs")
    var innerHTML = inputText.innerHTML
    var index = innerHTML.indexOf("[[SOURCE_DEFS]]")

    new_innerHTML = innerHTML.substring(0,index) + " " + source_insert + innerHTML.substring(index+"[[SOURCE_DEFS]]".length,innerHTML.length)
    innerHTML = new_innerHTML

    // Update the page
    inputText.innerHTML = innerHTML
}

// Run the javascript
window.addEventListener("load", function(){
    // Get defs as JS array
    defs = breakArr("main_defs")

    // Get sents as JS array
    sents = breakArr("main_sents")

    // Get alt words as JS array
    alt_words = breakArr("alt_words")

    // Highlight each entry in the sents arr
    new_sents = []
    for (let i = 0; i < defs.length; i++) {
        // Look ahead and see if this sentence appears again
        for (let j = i + 1; j < defs.length; j++) {
            // If it appears again, compare the defs for these sentences
            if (sents[i] === sents[j] && sents[i] != "") {
                var def1 = defs[i]
                var def2 = defs[j]
                if (def1.includes(def2)) {
                    // Set sent2 to ''
                    sents[j] = ""
                    defs[j] = ""
                } else if (def2.includes(def1)) {
                    // Set sent1 to ''
                    sents[i] = ""
                    defs[i] = ""
                }
            }
            // If one def contains the other completely, skip the sentence with the shorter def
        }
    }

    // Remove all sents and defs that are null
    sents = sents.filter(myFilter)
    defs = defs.filter(myFilter)

    for (let i = 0; i < defs.length; i++) {
        this_sent = highlight(defs[i], sents[i])
        new_sents[i] = this_sent
    }

    // List the source of the sentences
    listSource("source")

    // List each item in new_sents in the bullet list
    listDefs(new_sents)

    // Show the alternative words as a list in another tab
    listAltWordsTab(alt_words)

    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
    
})