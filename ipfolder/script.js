let dates = localStorage.getItem('data');
let data = JSON.parse(dates)[0];
console.log(data);


let lat = document.getElementById('lat');
let city = document.getElementById('city');
let organisation = document.getElementById('organisation');
let long = document.getElementById('long');
let region = document.getElementById('region');
let hostname = document.getElementById('hostname');
let ipadd = document.getElementById('ipadd');



let [latitude, longitude] = data.loc.split(",");
function getUserLocationInfo() {
  ipadd.innerText = `${data.ip}`;
  lat.innerText = `${latitude}`;
  long.innerText = `${longitude}`;
  organisation.innerText = `${data.org}`;
  city.innerText = `${data.city}`;
  region.innerText = `${data.region}`;
  hostname.innerText = `${window.location.hostname}`;

}


function showUserLocationOnMap() {
  
  const mapElement = document.getElementById('map');
  mapElement.innerHTML =
  
  `
  <iframe id="googlemap" src="https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&amp;output=embed"></iframe>
  `
}

getUserLocationInfo();
    showUserLocationOnMap();


    function getCurrentTimeForTimezone() {
      // current datetime string in America/Chicago timezone
        let chicago_datetime_str = new Date().toLocaleString("en-US", { timeZone: data.timeZone });
        console.log(chicago_datetime_str)
        // create new Date object
       let timezone = document.getElementById('timezone');
       let datetime = document.getElementById('datetime');
       let pincode = document.getElementById('pincode');
       let massage = document.getElementById('massage');

       function updateTime() {
        let chicago_datetime_str = new Date().toLocaleString("en-US", { timeZone: data.timeZone });
        datetime.innerText = `${chicago_datetime_str}`;
      }
    
      // Call the updateTime function initially to display the current time
      setInterval(updateTime, 1000);
       timezone.innerText = `${data.timezone}`;
       
       pincode.innerText = `${data.postal}`;

    }
    let postOfficesData = [];
    const pinapi = `https://api.postalpincode.in/pincode/${data.postal}`;
      async function fetchPostOfficesByPincode(){
        try {
          let responce = await fetch(pinapi);
        let result = await responce.json();

        massage.innerText = `${result[0].Message}`
        postOfficesData = result[0].PostOffice;
        showFilteredPostOffices(result[0].PostOffice);
        } catch (error) {
          alert(error);
        }
        

    }
    fetchPostOfficesByPincode();
    getCurrentTimeForTimezone();

    function handleSearch() {
      const searchQuery = document.getElementById('search').value.toLowerCase();
      const filteredPostOffices = postOfficesData.filter(element => { 
        const { Name, BranchType } = element;
        const nameL = Name.toLowerCase();
        const branchType = BranchType.toLowerCase();
        return nameL.includes(searchQuery) || branchType.includes(searchQuery);
      });
    
      showFilteredPostOffices(filteredPostOffices);
    }
    
    function showFilteredPostOffices(filteredPostOffices) {
      const postOfficesContainer = document.getElementById('postoffices');
      postOfficesContainer.innerHTML = '';
    
      filteredPostOffices.forEach(element => {
        const { Name, BranchType, DeliveryStatus, District, Division } = element;


        const div = document.createElement('div');
        div.className = 'card';
    
        div.innerHTML = `
          <p>Name:<span class="add"> ${Name}</span></p>
          <p>Branch Type:<span class="add"> ${BranchType}</span></p>
          <p>Delivery Status:<span class="add"> ${DeliveryStatus}</span></p>
          <p>District: <span class="add">${District}</span></p>
          <p>Division: <span class="add">${Division}</span></p>
        `;
    
        postOfficesContainer.appendChild(div);
      });
    }
    

    
    // Event listener for the search box
    document.getElementById('search').addEventListener('input', function(event) {
      handleSearch();
    });
   
    
    
    
    





   


