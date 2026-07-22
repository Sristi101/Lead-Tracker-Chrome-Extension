let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads  = leadsFromLocalStorage
    render(myLeads)

}

function render(leads) {
    let listItem = ""
    size = leads.length
    for (let i = 0; i < size; i++) {
        
        // to access html creating list directly from the js, call innerHTML
        //listItem +=  "<li><a target = '_black' href='" + myLeads[i] + "'>" + myLeads[i].slice(4, -4).toUpperCase() + "</a>" + "</li>"
        
        // using template string
        listItem +=  
            `
            <li>
                <a target = '_black' href='${leads[i]}'> 
                    ${leads[i]} 
                </a> 
            </li>
            `
    }
    
    ulEl.innerHTML = listItem
}

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    render(myLeads)
    // clear input text
    inputEl.value = ""

    // in our local storage , it only supports string so our array should be in string
    // use JSON.stringify() and JSON.parse()
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

})

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})



tabBtn.addEventListener("click", function () {
    // to grab url of the current tab directly from chrome

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify("myLeads"))
    render(myLeads)

    })

})
