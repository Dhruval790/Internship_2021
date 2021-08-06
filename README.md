# Distribution Management System

A multi-tenant system where a distribution company can track a variety of things that they do on a daily basis.

# Structure & Directories

Our App basically have three types of components named **component** which can be defined probably as the smallest reusable components being utilized or used by other two types,**containers** are the components that utilizes the the first type of components and the last one are **Page** components, that *mostly* use the component of other two types.

1. **Components :**
     contains all the components that are being utilized by one or more containers or pages present in the ```src/containers``` and ```src/pages```.

2. **Containers :**
     This has the components which utilizes components and will itself get utilized by the pages' component

3. **Contexts :**
    It currently has only user.js. Many components (for e.g. Navbar component) of the App , need to know whether the user is logged in , is it authorized ?, if yes then whats the access-token of the logged in user. This user context will help the components to get the required information.

    Also, this solves the problem of prop drilling

4. **Data :**
    contains the pseudo data for some of the components. This data gets utilized as an API endpoint, by using **JSON-SERVER**.

    To let the component utilise the the data as an response from pseudo API, we need to run JSON-SERVER on port number ```3001```*.

    ``` 
    json-server --watch ./src/data/inventory.json --port 3001
    ```
    \* 3001: Because by default the react app will run on ```localhost:3000```,if it is not being utilized by some other app and the value ```3001``` is hardcoded in the components which receives JSON-SERVER's response. 


5. **Helper :**
    contains ```/charts```, which have Bar, line and Pie(doughnut) charts. Which is being utilized by 
        ```/src/pages/dashboard```,
        ```/src/pages/Purchase```,
        ```/src/pages/Sale```,
        ```/src/pages/Products```

6. **Pages :**
   These are the main fully visible components of the build version of the app, which utilizes the components & containers.

7. **Routes :**
    contains  ```ProtectedRoute.js```, which protects the required components from unauthenticated users, that means ,unauthenticated users can not access those components. 

<details>
<summary>File Structure</summary>


```
├───build (after build)
├───package.json
├───README.md
├───public
│   └───assets
│       ├───fonts
│       │   └───Poppins
│       ├───icons
│       └───images
│           └───features
└───src
    ├───components
    │   ├───AddForm
    │   ├───Carousels
    │   ├───ChevronLeft
    │   ├───ChevronRight
    │   ├───Dashboard-Card
    │   ├───DownTrend
    │   ├───Dropdown-Custom
    │   ├───FeatureCard
    │   ├───GoogleIcon
    │   ├───PricingCard
    │   ├───Table
    │   ├───ToggleButton
    │   └───UpTrend
    ├───containers
    │   ├───dashboard-cards-container
    │   ├───Features
    │   ├───Footer
    │   ├───LineChartModal
    │   ├───Login
    │   ├───Modal
    │   ├───Navbar
    │   ├───Pricing
    │   └───SignUp
    ├───contexts
    ├───data
    ├───helper
    │   └───charts
    ├───pages
    │   ├───Channels
    │   ├───dashboard
    │   ├───Details
    │   ├───Edit
    │   ├───Expenses
    │   ├───Inventory
    │   ├───LandingPage
    │   ├───Login
    │   ├───Products
    │   ├───Purchase
    │   ├───Sale
    │   ├───SignUp
    │   ├───Suppliers
    │   ├───To-be-purchased
    │   └───Tracking
    └───routes

```
</details>

# Pages

*For unauthorized users*

1.  **Home (Landing Page) :**
Default Page for unauthorized user. Shows ```Carousel```, ```Features``` & ```Pricing```.

2.  **Sign Up :**
Sign Up Page is used to ```register``` as a authorized user. Fill the details asked in the form and login through the Login Page.

3. **Login :**
Provide the ```username``` and ```password``` and start using the services.

*For authorized users*

4. **Dashboard :**
Shows ```Growth of Purchase, Sales and Products``` as well as ```Sales and Product Tracker```.

5. **Inventory :**
Shows ```Inventory Table``` along with a ```search bar```, toggle button to toggle between ```active``` and ```inactive``` inventory and a ```Add Inventory``` button to add a new inventory.

6. **Suppliers :**
Shows ```Suppliers List``` along with ```Add Supplier button``` to add a new supplier.

7. **Purchase :**
Shows a ```Line Chart``` to analyze, track and compare purchases on ```daily```, ```monthly``` and ```yearly``` basis. It also shows a ```Purchase Table```, toggle button to toggle between ```received``` and ```not received``` purchases and a ```Doughnut Chart``` which shows that how many purchases have been received and how many have not been received.

8. **Sales :**
Shows a ```Line Chart``` to analyze, track and compare sales on ```daily```, ```monthly``` and ```yearly``` basis. It also shows a ```Sales Table```, toggle button to toggle between ```delivered``` and ```not delivered``` sales and a ```Doughnut Chart``` which shows that how many sales have been delivered and how many have not been delivered.

9. **Products :**
Shows ```Products Table``` along with a ```search bar```, toggle button to toggle between ```active``` and ```inactive``` products, ```Add New Product``` button to add a new product, ```Add New Supplier``` button to add a new supplier and a ```Bar Chart``` to track products.

## Getting Started
* Install latest version of Node.js stable release
* Install [yarn v1.x *]('https://yarnpkg.com/getting-started/install') globally to your system.
* Add the following Extension to your dev setup( VS Code ) 
    * ESLint
    * GitLens - Git supercharged
    * Better Comments
    * npm Intellisense
    * Path Intellisense
    * Prettier - Code formatter
* Install all the project dependencies of the project by the the command in the terminal ```
yarn``` or ```yarn install``` .
* Now, we are ready to run our project ```yarn run```

\* **Why yarn version 1.x ??** as with the newer version(version 'berry') of yarn you may face some difficulty with eslint.