        let ip = '';
        let arr = [];
        let api = `https://ipinfo.io/${ip}?token=8578d50ab152e3`;

        let liveip = document.getElementById('liveip');
        $.getJSON("https://jsonip.com", function (data) {
            ip = data.ip;
            liveip.innerText =data.ip;
        });

        async function apicall() {
            try {
                let response = await fetch(api);
                let result = await response.json();
                console.log(result);
                arr.push(result);
                localStorage.setItem('data',JSON.stringify(arr));
            } catch (error) {
                console.error("Error fetching IP info:", error);
                alert("cant get ur live data");
            }
        }

        let getstart = document.getElementById('getstart');
        getstart.addEventListener('click', async () => {
            await apicall(); 
            window.location.href = "./ipfolder/index.html";
        });
