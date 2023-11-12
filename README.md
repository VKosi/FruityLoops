# Fruit Based

fruit information webstite based on the Fruityvice API

## Please note i was not lucky enough to find a full solution for the Cors Error : 
## https://www.fruityvice.com/api/fruit/all from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

 I was able to atleast get the initial list of fruits on the main site and the filter functionality is working,
 however no luck for viewing fruit info and posting a new fruit which should work if a solution is found

10-11-2023 : *another temporary fix for viewfruit.js :

-convert the fetch dependency from fruit.id to fruit.name fix this in fruits.js:
    
    <td>
    Link to={`/fruit/${fruit.name}`} class="action-link">View  /Link
    <td>

-on viewfruit.js change : 
    
    (const { id } = useParams();) into : (const { name } = useParams();)

-finally update the fetch request as such:
    
    useEffect(() => {
        setLoading(true);
        axios
            .get('https://www.fruityvice.com/api/fruit/all')
            .then((response) => {
                console.log(name);
                const fruitIndex = response.data.findIndex((fruit) => fruit.name === name);
                if (fruitIndex !== -1) {
                    const selectedFruit = response.data[fruitIndex];
                    setFruit(selectedFruit);

                } else {
                    setFruit(null);
                    console.log(`Fruit with name ${name} not found.`);
                }

                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching fruit details:', error);
                alert('Error fetching fruit details.');
                setLoading(false);
                setFruit(null);
            });
    }, [name]); 
    // gets the response with all fruits and searches all data entries using name and 
    // gets the index on the overall data to display correct fruit details

# Steps

google chrome extension install : Allow CORS: Access-Control-Allow-Origin

git clone <this repo>

npm install

npm start

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.
