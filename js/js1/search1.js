


const people = [
    {name: 'twilight', href: 'moviePages/twilight.html'},
    {name: 'lord of the ring', href: 'moviePages/lord_of_the_rings.html' },
    {name: 'harry potter', href: 'moviePages/harry_potter.html'},
    {name: 'game of thrones', href: 'tvSeriesPages/game_of_thrones.html'},
    {name: 'big bang theory', href: 'tvSeriesPages/big_bang_thoery.html'},
    {name: 'avengers', href: 'moviePages/avengers.html'}

];


/**
 * select the search result list from html
 */
const list = document.getElementById('list');

/**
 * This function creates the search results as a list of item in html. 
 * Here we take in the array with values that match's with user search query.
 * Then we take array value and create corresponding html element and add them
 * to the global variable list
 * 
 * @param {array} group This is the array containing values that partially or fully match with user query 
 */
function setList(group){
    clearList();
    for(const person of group){
        const item = document.createElement('li');
        //item.classList.add('list-group-item');
        
        const text = document.createTextNode(person.name);
        const a = document.createElement('a');
        a.appendChild(text);
        a.href = person.href;
        item.appendChild(a);
        list.appendChild(item);
    }
    if(group.length === 0){
        setNoResults();
    }
}

/**
 * In case of quarying a new search, we remove the old search results 
 * from the global variable list and make the list empty. So that new searchs are 
 * not affected by old searches
 * 
 */
function clearList(){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }

}

/**
 * if the user input is not matched with any values from our array, then we will show a 
 * "no results found" message
 */
function setNoResults(){
        const item = document.createElement('li');
        //item.classList.add('list-group-item');
        const text = document.createTextNode('No results found');
        item.appendChild(text);
        list.appendChild(item);

}

/**
 * 
 * if we search with the letter t, then there might be multiple movie's containing the letter.
 * But we need to sort which movie title is more relavent and which is not
 * so that we can show the more relavent results on the top of the list
 * 
 * 
 * @param {string} value Movie title from the collection / array
 * @param {string} searchTerm The search query that user inserted into the search box
 */
function getRelevancy(value, searchTerm){
    if(value === searchTerm){
        return 2;
    }
    else if(value.startsWith(searchTerm)){
        return 1;
    }
    else{
        return 0;
    }

}
const searchInput = document.getElementById('search', extract);


searchInput.addEventListener('input', extract);
/**
 * In this function we extract the string inserted by user, we convert them
 * to lowercase so that comparison can be made with our movie collection
 * then we check to see if the query is included in any of the movie title
 * if it is included then we add it to he global variable list
 * then we sort it based on relevancy
 * @param {event} event 
 */
function extract(event){
    let value = event.target.value;
    if(value && value.trim().length>0){
        value = value.trim().toLowerCase();
        setList(people.filter(person =>{
            return person.name.includes(value);
        }).sort((personA, personB) =>{
            return getRelevancy(personB.name, value) - getRelevancy(personA.name, value);
        }));
    }
    else{
        clearList();
    }
}