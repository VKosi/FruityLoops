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
        axios.get('https://www.fruityvice.com/api/fruit/all')
          .then((response) => {
            setFruit(response.data[0]);
            setLoading(false); // Set loading state to false once data is fetched
          })
          .catch((error) => {
            console.error('Error fetching fruit details:', error);
            alert('Error fetching fruit details.');
            setLoading(false); // Set loading state to false to display an error message
            setFruit(null); // Set fruit state to null to display an error message
          });
      }, [name]);

# Steps

google chrome extension install : Allow CORS: Access-Control-Allow-Origin

git clone <this repo>

npm install

npm start

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.
