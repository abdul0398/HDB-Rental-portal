const data = require('./src/data/transactions.json');

async function modifyData(){

    // const flat_type_dateRelation = {};
    const array = data;

    array.sort((a, b) => {
        return new Date(b.rent_approval_date) - new Date(a.rent_approval_date);
    })
    
    // data.forEach((element) => {
    //     let flat_type = element.flat_type;
    //     let date = element.rent_approval_date;
    //     if(flat_type_dateRelation[flat_type]){
    //         if(!flat_type_dateRelation[flat_type].includes(date)){
    //             flat_type_dateRelation[flat_type].push(date);
    //         }
    //     }
    //     else{
    //         flat_type_dateRelation[flat_type] = [date];
    //     }
    //     flat_type_dateRelation[flat_type].sort();
    // })



    // create a ts file with the flat_type_dateRelation
    const fs = require('fs');
    fs.writeFileSync('transaction.json', JSON.stringify(array));
}


modifyData();

