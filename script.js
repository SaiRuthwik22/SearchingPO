let IP;
let postOffices=[]
async function getIP() {
    const response = await fetch("https://api.ipify.org?format=json")
    const data = await response.json()
    IP = data.ip
    let dispIP = document.getElementById("dispIP")
    dispIP.innerHTML = `Your Current IP Address is <span>${IP}</span>`
}
getIP()
async function getStarted(){
    let page1 = document.getElementById("page1")
    let page2 = document.getElementById("page2")
    let showIp = document.getElementById("showIp")
    let detailsContainer = document.getElementById("details-container")
    let mapContainer = document.getElementById("map-container")
    let timeDetails = document.getElementById("time-details")

    page1.style.display = "none"
    page2.style.display = "block"
    showIp.textContent = IP 
    let response = await fetch(`https://ipapi.co/${IP}/json/`)
    let data = await response.json()
    detailsContainer.innerHTML = `
                <div class="details">
                <h2>Lat: <span>${data.latitude}</span></h2>
                <h2>Long: <span>${data.longitude}</span></h2>
            </div>
            <div class="details">
                <h2>City: <span>${data.city}</span></h2>
                <h2>Region: <span>${data.region}</span></h2>
            </div>
            <div class="details">
                <h2>Organization: <span>${data.org}</span></h2>
                <h2>Hostname: <span>${data.network}</span></h2>
            </div>`
    
    mapContainer.innerHTML =`            <h1>Your Current Location</h1>
            <iframe src="https://maps.google.com/maps?q=${data.latitude}, ${data.longitude}&z=15&output=embed"   frameborder="0" style="border:0"></iframe>`

    let dateandtime = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });
    const resfromPOAPI = await fetch(`https://api.postalpincode.in/pincode/${data.postal}`)
    const datafromPOAPI = await resfromPOAPI.json()
    postOffices = datafromPOAPI[0].PostOffice
    timeDetails.innerHTML =`
            <p>Time Zone: <span>${data.timezone}</span></p>
            <p>Date And Time: <span>${dateandtime}</span></p>
            <p>Pincode: <span>${data.postal}</span></p>
            <p>Message: <span>${datafromPOAPI[0].Message}</span></p>
    `
    renderCards(postOffices)
}

function renderCards(arr){
    let cardDetails = document.getElementById("card-list")
    cardDetails.innerHTML =""
    arr.map((ele)=>{
    cardDetails.innerHTML += `
                <div class="card">
                    <p>Name: <span>${ele.Name}</span></p>
                    <p>Branch Type: <span>${ele.BranchType}</span></p>
                    <p>Delivery Status: <span>${ele.DeliveryStatus}</span></p>
                    <p>District: <span>${ele.District}</span></p>
                    <p>Division: <span>${ele.Division}</span></p>
                </div>
        `
    })
}

function SearchPO(){
    let inputValue = document.getElementById("input").value
    let sortedarr = postOffices.filter((ele)=>{
        if(ele.Name.toLowerCase().includes(inputValue.toLowerCase()) || ele.Block.toLowerCase().includes(inputValue.toLowerCase())){
            return ele
        }
    })
    renderCards(sortedarr)
}