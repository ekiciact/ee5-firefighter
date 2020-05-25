  
    var checkSessions = "https://studev.groept.be/api/a19fire4/ee5sessions";
 

    //New User
    function newUserData(newURL){
    fetch(newURL, {
          
          method: 'POST', 
        }).then((response) => {
        return response.json();
      })
      .then((data) => {
    
         navDisplay()
        return data;
      }).catch(function (error){
        console.log(error);
        });
    };
    
    
    
    // Login
    function userData(newURL){
    fetch(newURL, {
          
          method: 'POST', 
        }).then((response) => {
        return response.json();
      })
      .then((data) => {
    
    
        window.localStorage.setItem("isLoggedIn", data[0].codematch);
        window.localStorage.setItem("isAdmin", data[0].admin);
    
      navDisplay()
        return data;
      }).catch(function (error){
        console.log(error);
        });
    };
    
    //Session Collector
    function sessionsData(){
    fetch(checkSessions, {
          
          method: 'POST', 
        }).then((response) => {
        return response.json();
      }).then((data) => {
        var json_obj = data;
    
        return json_obj;
        
    
      }).then((json_obj) => {
        for (i = 0; i < json_obj.length; i++) {
          var sessions = document.getElementById("sessions")                 
          var newLink = document.createElement('a'); 
          var linkDate = document.createElement('p');
          var dateText = json_obj[i].ee5sessions_date.slice(0, 10);;
          linkDate.innerText = dateText;
          var num = i+1;
          var newText = "Session "+num;
          var newId = json_obj[i].ee5sessions_id;
          newLink.setAttribute("class", "allSessions");
          newLink.setAttribute("id", newId);
          newLink.setAttribute("href", "#");
          newLink.innerText = newText;
          document.getElementById("sessions").appendChild(newLink);
          newLink.appendChild(linkDate);
    
        }
    
    
      }).catch(function (error){
            console.log(error);
        });
    };
    
    
    
    // Dynamically create navbar
    function navDisplay(){
    
        if (window.localStorage.getItem("isLoggedIn") == 1) {
            if (window.localStorage.getItem("isAdmin") == 1) {
                document.getElementById("createNewUser").style.float = "right";
                document.getElementById("createNewUser").style.display = "block";
            } else {
                document.getElementById("createNewUser").style.display = "none";
                document.getElementById("userName").style.display = "none";
                document.getElementById("userPassword").style.display = "none";
            }
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.float = "right";
        document.getElementById("logout").style.display = "block";
            
        
    } else {
        document.getElementById("login").style.display = "block";
        document.getElementById("login").style.float = "right";
        document.getElementById("logout").style.display = "none"; 
        document.getElementById("createNewUser").style.display = "none";
        document.getElementById("userName").style.float = "right";
        document.getElementById("userName").style.display = "block";
        document.getElementById("userPassword").style.float = "right";
        document.getElementById("userPassword").style.display = "block";
        
        
    }
        
    }
    
    // Hash creator
    const cyrb53 = function(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ h1>>>16, 2246822507) ^ Math.imul(h2 ^ h2>>>13, 3266489909);
        h2 = Math.imul(h2 ^ h2>>>16, 2246822507) ^ Math.imul(h1 ^ h1>>>13, 3266489909);
    
        return 4294967296 * (2097151 & h2) + (h1>>>0);
    };
    
    
    
    
    
    // Navbar listeners
    document.addEventListener("DOMContentLoaded", function() {
      sessionsData();
        navDisplay();
        var userName;
        var userPassword;
        
        document.getElementById("navbar").addEventListener("click", function(event){
            const target = event.target;
            if (target.id == "userName" || target.id == "userPassword") 
            {
                    var userNameIn = document.getElementById('userName');
                    userNameIn.addEventListener('change', updateUN);
    
                    function updateUN(e) {
                        userName = e.target.value;
            
                    }
                    var userPasswordIn = document.getElementById('userPassword');
                    userPasswordIn.addEventListener('change', updateUP);
    
                    function updateUP(e) {
                        userPassword = e.target.value;
    
    }
                
            } 
          
            else if(target.id == "login")
            {
                
                if(userName && userPassword){
                    
              var hashedPass = cyrb53(userPassword);
              var newURL = "https://studev.groept.be/api/a19fire4/ee5users/"+userName+"/"+hashedPass
    
    
             userData(newURL);
                    
                } else {
                    alert("Please enter user name and password!")
                }
    
            }
            else if(target.id == "logout")
            {
                
                    localStorage.removeItem("isLoggedIn") ;
                    localStorage.removeItem("isAdmin") ;
                    localStorage.removeItem("sessionId") ;
                    target.href = "home.html";
                    location.reload();
    
            } 
            else if(target.id == "createNewUser")
            {
              if(userName && userPassword){
                    
                    var hashedPass = cyrb53(userPassword);
                    var newURL = "https://studev.groept.be/api/a19fire4/newuser/"+userName+"/"+hashedPass
          
          
                    newUserData(newURL);
                          
                      } else {
                          alert("Please enter user name and password!")
                      }
            } 
             
            else
            {
                if (window.localStorage.getItem("isLoggedIn") == 1) {
        
       
    switch(target.id) {
      case "home":
         
      target.href = "home.html";
        break;
    
      case "heatmap":
         
        target.href = "heatmap.html";
        break;
    
      case "everageheat":
         
        target.href = "everageheat.html";
        break;
    
      case "timeheat":
            
        target.href = "timeheat.html";
        break;
    
      case "table":
         
        target.href = "table.html";
        break;
    
      case "sim":
             
        target.href = "sim.html";
        break; 
    
      default:
    
      if (target.className == "allSessions") {
        window.localStorage.setItem("sessionId", target.id);

        location.reload();
        
      }
      
    }
        
    } else
    {
        alert("Plese first login")
    
    }
            }
    
    
    });
    
    });
    