const people = [
    {name: 'twilight', href: 'movie pages/twilight.html'},
    {name: 'lord of the ring', href: 'movie pages/lord_of_the_rings.html' },
    {name: 'harry potter', href: 'movie pages/harry_potter.html'},
    {name: 'avengers', href: 'movie pages/avengers.html'}

];



const list = document.getElementById('list');
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

function clearList(){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }

}

function setNoResults(){
        const item = document.createElement('li');
        //item.classList.add('list-group-item');
        const text = document.createTextNode('No results found');
        item.appendChild(text);
        list.appendChild(item);

}

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
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event)=>{
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
});
