
const username = document.getElementById('username');
const pwd = document.getElementById('pwd');


const database1 = firebase.database();

const roofRef = database1.ref('users');

/*function PassCheck()
{
  roofRef.orderByChild().equalTo(pwd.value).on('value', snapshot =>{
    console.log(snapshot.val());
    window.location.href = "homepage.html";

  });  
 };
*/
var gate = true;
submit.addEventListener('click', (e) =>
{
  e.preventDefault();
  if(gate)
  {
  roofRef.orderByKey().equalTo(username.value).on('value', snapshot =>{

    const pass = snapshot.val();

    //roofRef.orderByChild().equalTo(pwd.value).on('value', snapshot =>{
    
    //console.log(snapshot.child("users").child("pwd").val());
    console.log(pass);
    window.location.href = "homepage.html";
  });
  }
  else
  {
    document.getElementById("error").innerHTML = "Wrong keyword entry.";
  }
     
    
  //});
  
/*

  roofRef.child(username.value).on('value', function(snapshot){
      
      if(snapshot.val().username != username.value || snapshot.val().pwd != pwd.value)
      {
        console.log(snapshot.val().username);
        console.log(snapshot.val().pwd);
        document.getElementById("error").innerHTML = "Wrong keyword entry.";
      }
      else
      {
        console.log(snapshot.val().username);
        console.log(snapshot.val().pwd);
        window.location.href = "homepage.html";

      }
      

    });
  */

  });

  
      
      /**Global variable for storing the login credentials */ 
      //var username, pwd;
        /**
         * parsing the data from user input and setting them as the global variable listed above
         * 
         */
        /*
      function Ready(){
        user = document.getElementById('username').value;
        passw = document.getElementById('pwd').value;
       }; 
      /**In this anonimous function we open a connection with the firebase real time database
       * then we compare the user input with the credientials stored in the database
       * if both username and password matches, then we redirect the user to browse page
       */

       /*
       /*
      document.getElementById("submit").onclick = function(){
        Ready();
        firebase.database().ref('users/'+user).on('value', function(snapshot){
          
          if(snapshot.val().Name != user || snapshot.val().Pass != passw){
            document.getElementById("error").innerHTML = "Wrong keyword entry.";
          }
          else{
            console.log(snapshot.val().Name);
            console.log(snapshot.val().Pass);
          }
          

        });
      }
      */