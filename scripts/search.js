//geeksforgeeks.org used for this code

// This function enables the search bar functionality which is called on keypress
function search() { 

    // Get input from the information entered into the searchbar
    let input = document.getElementById('searchbar').value 
    
    // Make input lower case to ignore case
    input = input.toLowerCase(); 

    // Get list class elements
    let x = document.getElementsByClassName('list'); 
      
    // Loop to iterate through listings
     for (i = 0; i < x.length; i++) {  

        // If the input is not in the listing, don't show it on the page
        if (!x[i].innerHTML.toLowerCase().includes(input)) { 
            x[i].style.display="none"; 
        } 

        // Otherwise show the listing
        else { 
            x[i].style.display="grid";                  
        } 
    } 
} 