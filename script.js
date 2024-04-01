const data = require('./src/data/transactions.json');

async function modifyData(){

    // const flat_type_dateRelation = {};
    const array = data;

    // array.sort((a, b) => {
    //     return new Date(b.rent_approval_date) - new Date(a.rent_approval_date);
    // })
    
    const cleanData = mergeSimilarData(array);


    cleanData.sort((a, b) => {
        return new Date(b.rent_approval_date) - new Date(a.rent_approval_date);
    })

    // create a ts file with the flat_type_dateRelation
    const fs = require('fs');
    fs.writeFileSync('transaction.json', JSON.stringify(cleanData));
}
function mergeSimilarData(dataArray) {
    console.log(dataArray.length);

    // Helper function to calculate the average of two numbers
    function calculateAverage(num1, num2) {
      const rent1 =parseInt(num1);
      const rent2 = parseInt(num2);

      const total = rent1 + rent2;
      const average = total / 2;
      return average;
    }
   
    // Create an empty object to store the merged data
    const mergedData = {};
   
    // Iterate over the data array
    dataArray.forEach(item => {
       // Create a key based on the specified fields
       const key = `${item.rent_approval_date}-${item.town}-${item.block}-${item.street_name}-${item.flat_type}`;
   
       // If the key already exists in the mergedData object, merge the data
       if (mergedData[key]) {
         // Calculate the average monthly rent
         const averageRent = calculateAverage(mergedData[key].monthly_rent, item.monthly_rent);
   
         // Update the mergedData object with the new average rent and a new random ID
         mergedData[key] = {
           ...mergedData[key],
           monthly_rent:  averageRent.toString(),
           _id: item._id
         };
       } else {
         // If the key does not exist, add the item to the mergedData object
         mergedData[key] = item;
       }
    });
   
    // Convert the mergedData object back to an array
    const resultArray = Object.values(mergedData);
    console.log(resultArray.length);
    return resultArray;
   }

modifyData();

